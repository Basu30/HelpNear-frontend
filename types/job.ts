export interface job{
    id: string
    title: string
    description: string
    budget: number
    status: "open" | "quoted" | "booked" | "completed"
}