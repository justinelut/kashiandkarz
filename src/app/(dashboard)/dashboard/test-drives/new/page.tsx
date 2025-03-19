import { TestDriveForm } from "@/components/dashboard/test-drives/test-drive-form"

export const metadata = {
  title: "Schedule New Test Drive | Dashboard",
  description: "Schedule a new test drive appointment",
}

export default function NewTestDrivePage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Schedule New Test Drive</h1>
      <TestDriveForm />
    </div>
  )
}

