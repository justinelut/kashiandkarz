import { getCallbackRequests } from "@/lib/callback-actions"
import { CallbackList } from "@/components/dashboard/callbacks/callback-list"

export const metadata = {
  title: "Callback Requests | Dashboard",
  description: "Manage customer callback requests",
}

export default async function CallbacksPage() {
  // Initial data fetch for SSR
  const initialData = await getCallbackRequests()

  return (
    <div className="container py-10">
      <CallbackList />
    </div>
  )
}

