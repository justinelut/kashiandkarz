import { CallbackForm } from "@/components/dashboard/callbacks/callback-form"

export const metadata = {
  title: "New Callback Request | Dashboard",
  description: "Create a new callback request",
}

export default function NewCallbackPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">New Callback Request</h1>
      <CallbackForm />
    </div>
  )
}

