import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface PageLayoutProps {
  title: string
  description?: string
  children: ReactNode
  breadcrumbs?: Array<{
    label: string
    href: string
  }>
  lastUpdated?: string
}

export function PageLayout({ title, description, children, breadcrumbs = [], lastUpdated }: PageLayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="border-b">
          <div className="container py-3">
            <nav className="flex text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.href} className="flex items-center">
                  <ChevronRight className="mx-2 h-4 w-4" />
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-foreground">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-primary">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Page Header */}
      <header className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          {description && <p className="mt-4 text-xl text-muted-foreground max-w-3xl">{description}</p>}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="prose prose-lg max-w-none">{children}</div>
      </main>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="container pb-12">
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
      )}
    </div>
  )
}

