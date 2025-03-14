import { getCallbackRequestById } from "@/lib/callback-actions"
import { CallbackForm } from "@/components/dashboard/callbacks/callback-form"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Edit Callback Request | Dashboard",
  description: "Edit a callback request",
}

export default async function EditCallbackPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const callback = await getCallbackRequestById(params.id)

    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Edit Callback Request</h1>
        <CallbackForm callback={callback} isEdit />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

