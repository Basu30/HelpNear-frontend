
export const MainStatus = {
    JobStatus: {
        open: 'open',
        quoted: 'quoted',
        booked: 'booked',
        completed: 'completed',
        in_progress: 'in_progress',
        cancelled: 'cancelled',
    },
    BookingStatus: {
        confirmed: 'confirmed',
        completed: 'completed',
        in_progress: 'in_progress',
        cancelled: 'cancelled',
        disputed: 'disputed'
    },
    QuoteStatus: {
        pending: 'pending',
        accepted: 'accepted',
        rejected: 'rejected',
        withdrawn: 'withdrawn'
    },
    NotificationType: {
        QUOTE_RECEIVED:   'quote_received',
        QUOTE_ACCEPTED:   'quote_accepted',
        QUOTE_REJECTED:   'quote_rejected',
        BOOKING_CREATED:  'booking_created',
        BOOKING_STARTED:  'booking_started',
        BOOKING_COMPLETED:'booking_completed',
        BOOKING_CANCELLED:'booking_cancelled',
        NEW_MESSAGE:      'new_message',
        NEW_REVIEW:       'new_review',
    }
} as const


export type JobStatus = typeof MainStatus.JobStatus[keyof typeof MainStatus.JobStatus]
export type BookingStatus = typeof MainStatus.BookingStatus[keyof typeof MainStatus.BookingStatus]
export type QuoteStatus = typeof MainStatus.QuoteStatus[keyof typeof MainStatus.QuoteStatus]
export type NotificationType = typeof MainStatus.NotificationType[keyof typeof MainStatus.NotificationType]