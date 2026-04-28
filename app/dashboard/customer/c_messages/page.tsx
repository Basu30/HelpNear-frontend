

'use client';

import { useEffect, useState } from 'react';

type Conversation = {
  id: string;
  booking_id: string;
  job_title: string;
  other_user_name: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
};

type Message = {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  created_at: string;
  is_me: boolean;
};

const mockConversations: Conversation[] = [
  {
    id: '1',
    booking_id: 'booking-1',
    job_title: 'House Deep Cleaning',
    other_user_name: 'Sarah Johnson',
    last_message: 'Sounds good! I can start tomorrow.',
    last_message_at: '10:45 AM',
    unread_count: 2,
  },
  {
    id: '2',
    booking_id: 'booking-2',
    job_title: 'Bathroom Repair',
    other_user_name: 'Mike Plumbing',
    last_message: 'Thanks, looking forward to it.',
    last_message_at: 'Yesterday',
    unread_count: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender_id: 'user-1',
    sender_name: 'Sarah Johnson',
    content: "Hi! I'm interested in your job.",
    created_at: '10:30 AM',
    is_me: false,
  },
  {
    id: '2',
    sender_id: 'me',
    sender_name: 'Me',
    content: 'Hi Sarah, thanks for your interest!',
    created_at: '10:31 AM',
    is_me: true,
  },
  {
    id: '3',
    sender_id: 'user-1',
    sender_name: 'Sarah Johnson',
    content: 'I can do it for $120.',
    created_at: '10:32 AM',
    is_me: false,
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // later replace with getConversations(token)
    setConversations(mockConversations);
    setSelectedConversation(mockConversations[0]);
    setMessages(mockMessages);
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);

    // later replace with getMessages(conversation.booking_id, token)
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender_id: 'me',
      sender_name: 'Me',
      content: messageText,
      created_at: 'Now',
      is_me: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');
  };

  return (
    <main className="flex flex-col justify-center p-1 min-h-screen text-black bg-slate-300">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-[360px_1fr]">
        
        {/* Left: conversations */}
        <aside className="border-r border-slate-200 bg-white">
          <div className="p-5 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
            <p className="text-sm text-slate-500 mt-1">
              All your conversations
            </p>
          </div>

          <div className="p-3 space-y-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`w-full text-left rounded-2xl p-4 transition ${
                  selectedConversation?.id === conversation.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {conversation.job_title}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {conversation.other_user_name}
                    </p>
                  </div>

                  <span className="text-xs text-slate-400">
                    {conversation.last_message_at}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-slate-500 truncate max-w-[230px]">
                    {conversation.last_message}
                  </p>

                  {conversation.unread_count > 0 && (
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      {conversation.unread_count}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Right: specific messages */}
        <section className="flex-1">
          {selectedConversation ? (
            <div className='flex'>
                <div className='w-full'>
                    {/* Chat header */}
                    <div className="md:p-5 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                {selectedConversation.job_title}
                            </h2>
                            <p className="text-sm text-slate-500">
                                Chat with {selectedConversation.other_user_name}
                            </p>
                        </div>

                        <button className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-sm font-medium">
                            View Job
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 h-[80vh] p-5 space-y-5 overflow-y-auto bg-slate-200">
                        {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${
                            message.is_me ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div
                            className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                                message.is_me
                                ? 'bg-blue-600 text-white rounded-br-sm'
                                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                            }`}
                            >
                            <p className="text-sm">{message.content}</p>
                            <p
                                className={`text-xs mt-2 ${
                                message.is_me ? 'text-blue-100' : 'text-slate-400'
                                }`}
                            >
                                {message.created_at}
                            </p>
                            </div>
                        </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-slate-200 bg-white">
                        <div className="flex gap-3">
                            <input
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                                }}
                                placeholder="Type a message..."
                                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />

                            <button
                                onClick={handleSendMessage}
                                className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                            >
                                Send
                            </button>
                        </div>
                    </div>

                </div>
               <div className='md:flex hidden w-2/5 h-auto border-l border-slate-200 rounded-r-xl '>
                    <aside className=''>
                        <h1 className='text-center'>Job detail</h1>
                    </aside>
               </div>
                
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              Select a conversation
            </div>
          )}
          
        </section>
        
      </div>
    </main>
  );
}