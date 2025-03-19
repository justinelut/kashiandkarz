import { getTestDrives } from "@/lib/test-drive-actions"
import { TestDriveList } from "@/components/dashboard/test-drives/test-drive-list"

export const metadata = {
  title: "Test Drive Schedule | Dashboard",
  description: "Manage test drive appointments",
}

export default async function TestDrivesPage() {
  // Initial data fetch for SSR
  const initialData = await getTestDrives()

  return (
    <div className="container py-10">
      <TestDriveList />
    </div>
  )
}

