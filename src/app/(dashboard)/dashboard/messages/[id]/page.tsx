import { getMessageById, markMessageAsRead } from "@/lib/message-actions"
import { MessageDetails } from "@/components/dashboard/messages/message-details"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Message Details | Dashboard",
  description: "View and manage message details",
}

export default async function MessageDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const message = await getMessageById(params.id)

    // Mark as read on server side
    if (!message.isRead) {
      await markMessageAsRead(params.id)
    }

    return (
      <div className="container py-10">
        <MessageDetails message={message} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

