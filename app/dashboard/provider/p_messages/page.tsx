'use client';

import { useEffect, useRef, useState } from 'react';
import { getSocket } from '@/lib/socket';
import { useAuth } from '@/lib/auth-context';
import { Message } from '@/types/message';
import { getMessages, sendMessage } from '@/services/messages';
import { Booking } from '@/types/booking';
import { getProviderBookings } from '@/services/booking.service';


export default function MessagesPage() {
  const { token, isLoading, user } = useAuth();

  // STATE
  const [ messages, setMessages] = useState<Message[]>([])
  const [ bookings, setBookings ] = useState<Booking[]>([])
  const [ selected, setSelected ] = useState<Booking | null>(null)
  const [ messageText, setMessageText] = useState('')
  const [loadingMsgs, setLoadingMsgs] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // FETCH BOOKINGS (conversation list)
  useEffect(() => {
    if (isLoading || !token) return

    getProviderBookings(token)
      .then(data => setBookings(data.bookings))
      .catch(err => console.error(err.message))
  }, [isLoading, token])


  // WHEN BOOKING SELECTED - LOAD MESSAGES + JOIN ROOM 
  useEffect(() => {
    if (!selected || !token) return

    setLoadingMsgs(true)
    setMessages([])

    // Load history first
    getMessages(selected.id, token)
      .then(data => setMessages(data.messages))
      .catch(err => console.error(err.message))



    // Connect socket and join room
    const s = getSocket(token)

    // JOIN THE ROOM
    s.emit('join_booking', selected.id)

    // LISTEN FOR NEW MESSAGE
    s.on('new_message', (message) => {
      setMessages(prev => [...prev, message])
    })

    // CLEANUP WHEN LEAVING PAGE
    return () => {
      s.emit('leave_booking', selected.id)
      s.off('new_message')
    }
  }, [token, selected]);

  // AUTO SCROLL TO BOTTOM WHEN NEW MESSAGE ARRIVES
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
  }, [messages])

  // HANDLE SEND MESSAGE
  const handleSend = () => {
    if (!messageText.trim() || !selected || !token) return

    const s = getSocket(token)
    s.emit('send_message', {
      bookingId: selected.id,
      message_text: messageText
    })

    setMessageText('')
  }
  
return (
    <main className="flex flex-col justify-center p-1 min-h-screen text-black bg-slate-300">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-[360px_1fr]" style={{ height: '95vh' }}>

        {/* ── Left: conversations list ── */}
        <aside className="border-r border-slate-200 bg-white overflow-y-auto">
          <div className="p-5 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
            <p className="text-sm text-slate-500 mt-1">All your conversations</p>
          </div>

          <div className="p-3 space-y-2">
            {bookings.length === 0 && (
              <p className="text-center text-slate-400 py-10">
                No conversations yet
              </p>
            )}
            {bookings.map((booking) => (
              <button
                key={booking.id}
                onClick={() => setSelected(booking)}
                className={`w-full text-left rounded-2xl p-4 transition ${
                  selected?.id === booking.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-slate-900 truncate">
                      {booking.title}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {booking.customer_name}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full h-fit ${
                    booking.status === 'confirmed'  ? 'bg-yellow-100 text-yellow-700' :
                    booking.status === 'in_progress' ? 'bg-green-100 text-green-700'  :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(booking.created_at).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* ── Right: chat window ── */}
        <section className="flex flex-col overflow-hidden">
          {selected ? (
            <>
              {/* Chat header */}
              <div className="p-5 border-b border-slate-200 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selected.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    Chat with {selected.customer_name}
                  </p>
                </div>
                <span className="text-sm text-slate-500">
                  {selected.price} • {selected.estimated_time}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
                {loadingMsgs && (
                  <p className="text-center text-slate-400">Loading messages...</p>
                )}
                {!loadingMsgs && messages.length === 0 && (
                  <p className="text-center text-slate-400 mt-10">
                    No messages yet — say hello! 👋
                  </p>
                )}
                {messages.map((msg) => {
                  const isMe = msg.sender_id === user?.id
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 mr-2 shrink-0">
                          {msg.sender_name?.[0] ?? 'P'}
                        </div>
                      )}
                      <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                      }`}>
                        {!isMe && (
                          <p className="text-xs font-semibold mb-1 text-blue-600">
                            {msg.sender_name}
                          </p>
                        )}
                        <p className="text-sm">{msg.message_text}</p>
                        <p className={`text-xs mt-1 ${isMe ? 'text-blue-100' : 'text-slate-400'}`}>
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  )
                })}
                {/* Auto scroll target */}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-200 bg-white shrink-0">
                <div className="flex gap-3">
                  <input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-black"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!messageText.trim()}
                    className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3">
              <p className="text-4xl">💬</p>
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-sm">Choose a booking from the left to start chatting</p>
            </div>
          )}
        </section>

      </div>
    </main>
  )
}