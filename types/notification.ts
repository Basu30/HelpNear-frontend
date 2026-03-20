import type { NotificationType } from '@/constant/mainStatus'

export type Notification = {
    id: string
    user_id: string
    type: NotificationType
    content: string
    is_read: boolean
    created_at: Date
}

export type CreateNotificationDTO = {
    type: NotificationType
    content: string
}