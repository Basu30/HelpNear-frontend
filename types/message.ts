

export type Message = {
    id: string 
    conversation_id: string
    sender_id: string 
    message_text: string
    is_read: boolean
    created_at: Date
}

export type CreateMessageDTO = {
    message_text: string
}