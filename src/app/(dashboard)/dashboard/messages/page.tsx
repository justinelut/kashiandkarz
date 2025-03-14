import { getMessages } from "@/lib/message-actions"
import { MessageList } from "@/components/dashboard/messages/message-list"

export const metadata = {
  title: "Messages | Dashboard",
  description: "Manage customer messages",
}

export default async function MessagesPage() {
  // Initial data fetch for SSR
  const initialData = await getMessages()

  return (
    <div className="container py-10">
      <MessageList />
    </div>
  )
}

