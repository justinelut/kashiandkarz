import { getTestDriveById } from "@/lib/test-drive-actions"
import { TestDriveForm } from "@/components/dashboard/test-drives/test-drive-form"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Edit Test Drive | Dashboard",
  description: "Edit test drive details",
}

export default async function EditTestDrivePage({ params }: { params: { id: string } }) {
  try {
    const testDrive = await getTestDriveById(params.id)

    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Edit Test Drive</h1>
        <TestDriveForm initialData={testDrive} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

