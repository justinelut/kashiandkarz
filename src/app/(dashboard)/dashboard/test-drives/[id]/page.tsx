import { getTestDriveById } from "@/lib/test-drive-actions"
import { TestDriveDetails } from "@/components/dashboard/test-drives/test-drive-details"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Test Drive Details | Dashboard",
  description: "View and manage test drive details",
}

export default async function TestDriveDetailsPage({ params }: { params: { id: string } }) {
  try {
    const testDrive = await getTestDriveById(params.id)

    return (
      <div className="container py-10">
        <TestDriveDetails testDrive={testDrive} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}

