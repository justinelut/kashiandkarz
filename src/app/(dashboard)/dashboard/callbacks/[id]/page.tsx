import { getCallbackRequestById } from "@/lib/callback-actions"
import { CallbackDetails } from "@/components/dashboard/callbacks/callback-details"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Callback Details | Dashboard",
  description: "View and manage callback request details",
}

export default async function CallbackDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const callback = await getCallbackRequestById(params.id)

    return (
      <div className="container py-10">
        <CallbackDetails callback={callback} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

