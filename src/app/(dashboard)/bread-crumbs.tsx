import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export const BreadCrumbItems: React.FC = () => {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean)

  return (
    <>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`
        const isLast = index === paths.length - 1
        const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")

        return isLast ? (
          <BreadcrumbItem key={path}>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={path}>
            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        )
      })}
    </>
  )
}

export default BreadCrumbItems