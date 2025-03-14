import EnhancedCategoriesPage from "../enhanced-page"

export default function NewCategoriesPage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  return <EnhancedCategoriesPage searchParams={searchParams} />
}

