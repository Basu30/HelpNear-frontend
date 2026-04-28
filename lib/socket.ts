// What: creates and manages the Socket.IO client connection
// Why: one place to configure the sokcet - not scattered across components
// When: imported in chat pages

import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:5000'

let socket: Socket | null = null

  /**
   * What: creates socket with token auth
   * Why: server nees token to verify who is connecting
   */
export function getSocket(token: string): Socket {
    
    if (!socket) {
        socket = io(SOCKET_URL, {
            auth: { token },          // send to socket.handshake.auth.token
            autoConnect: true,
            reconnection: true,       // auto reconnect if connection drops
            reconnectionAttempts: 5,
        })
    }
    return socket
}

  /**
   * What: disconnects and clears socket
   * Why: when user logs out - clean up connection
   */
export function disconnectSocket(): void {
    
    if (socket) {
        socket.disconnect()
        socket = null
    }
}