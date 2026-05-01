

export type Message = {
    id: string 
    conversation_id: string
    sender_id: string 
    message_text: string
    is_read: boolean
    created_at: Date

    sender_name: string
}

export type CreateMessageDTO = {
    message_text: string
}