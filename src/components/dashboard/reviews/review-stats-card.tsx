"use client"

import { useQuery } from "@tanstack/react-query"
import { BarChart3, Star, ThumbsUp, AlertTriangle, Clock, Check, X } from "lucide-react"

import { getDashboardReviewStats } from "@/lib/dashboard-review-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

export function ReviewStatsCard() {
  // Fetch review stats
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardReviewStats"],
    queryFn: () => getDashboardReviewStats(),
    refetchInterval: 300000, // Refetch every 5 minutes
  })

  const stats = data?.data

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Review Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[50px]" />
            </div>
            <Skeleton className="h-2 w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isError || !stats) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Review Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4 text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p>Failed to load review statistics</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Review Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">Average Rating</span>
              </div>
              <span className="font-bold">{stats.averageRating.toFixed(1)}/5</span>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.ratingDistribution[rating as 1 | 2 | 3 | 4 | 5]
                const percentage = stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0

                return (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="text-sm w-2">{rating}</div>
                    <Progress value={percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground w-8">{percentage}%</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <p className="text-2xl font-bold">{stats.pendingReviews}</p>
              <p className="text-xs text-muted-foreground">
                {stats.totalReviews > 0 ? Math.round((stats.pendingReviews / stats.totalReviews) * 100) : 0}% of total
              </p>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Approved</span>
              </div>
              <p className="text-2xl font-bold">{stats.approvedReviews}</p>
              <p className="text-xs text-muted-foreground">
                {stats.totalReviews > 0 ? Math.round((stats.approvedReviews / stats.totalReviews) * 100) : 0}% of total
              </p>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <X className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Rejected</span>
              </div>
              <p className="text-2xl font-bold">{stats.rejectedReviews}</p>
              <p className="text-xs text-muted-foreground">
                {stats.totalReviews > 0 ? Math.round((stats.rejectedReviews / stats.totalReviews) * 100) : 0}% of total
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span className="text-sm">Would Recommend</span>
            </div>
            <span className="font-medium">{Math.round(stats.recommendPercentage)}%</span>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Reviews: {stats.totalReviews}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

