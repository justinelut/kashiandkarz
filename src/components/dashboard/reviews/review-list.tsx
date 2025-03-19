"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Filter, Search, AlertTriangle, Clock, Flag } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { getDashboardReviews } from "@/lib/dashboard-review-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { RatingStars } from "@/components/reviews/rating-stars"

import type { Review, ReviewFilterOption, ReviewSortOption } from "@/types/review"

export function ReviewList() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Parse query parameters
  const initialPage = Number.parseInt(searchParams.get("page") || "1")
  const initialFilter = (searchParams.get("filter") || "all") as ReviewFilterOption
  const initialSearch = searchParams.get("search") || ""
  const initialSort = (searchParams.get("sort") || "newest") as ReviewSortOption

  // State
  const [page, setPage] = useState(initialPage)
  const [filter, setFilter] = useState<ReviewFilterOption>(initialFilter)
  const [search, setSearch] = useState(initialSearch)
  const [searchInput, setSearchInput] = useState(initialSearch)
  const [sort, setSort] = useState<ReviewSortOption>(initialSort)

  // Fetch reviews
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboardReviews", page, filter, search, sort],
    queryFn: () => getDashboardReviews(page, 10, filter, search, sort),
  })

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    params.set("page", page.toString())
    params.set("filter", filter)
    if (search) params.set("search", search)
    params.set("sort", sort)

    router.push(`/dashboard/reviews?${params.toString()}`, { scroll: false })
  }, [page, filter, search, sort, router])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilter(value as ReviewFilterOption)
    setPage(1)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSort(value as ReviewSortOption)
    setPage(1)
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Customer Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <form onSubmit={handleSearch} className="flex w-full sm:w-auto gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reviews..."
                  className="pl-8"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </form>

            <div className="flex gap-2">
              <Select value={filter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="highest-rating">Highest rating</SelectItem>
                  <SelectItem value="lowest-rating">Lowest rating</SelectItem>
                  <SelectItem value="most-helpful">Most helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500">
              <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
              <p>Error loading reviews. Please try again.</p>
              <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : data?.data?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No reviews found.</p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Review</TableHead>
                      <TableHead>Car</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data?.map((review: Review & { car?: { title: string; slug: string } }) => (
                      <TableRow key={review.$id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium truncate max-w-[200px]">{review.title}</span>
                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {review.user?.name || "Anonymous"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {review.car ? (
                            <span className="truncate max-w-[150px] block">{review.car.title}</span>
                          ) : (
                            <span className="text-muted-foreground italic">Unknown car</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <RatingStars rating={review.rating} size="sm" />
                            <span className="text-sm ml-1">{review.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(review.status)}
                            {review.reported && (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <Flag className="h-3 w-3 mr-1" />
                                Reported
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(review.$createdAt), { addSuffix: true })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/dashboard/reviews/${review.$id}`)}
                            >
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {data?.pagination && data.pagination.totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <Pagination
                    currentPage={page}
                    totalPages={data.pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

