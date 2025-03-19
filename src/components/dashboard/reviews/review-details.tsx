"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Check, X, Trash2, ArrowLeft, Flag, ThumbsUp, ThumbsDown, AlertTriangle, User, Car } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { getDashboardReviewById, updateReviewStatus, deleteReview } from "@/lib/dashboard-review-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RatingStars } from "@/components/reviews/rating-stars"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

import type { ReviewStatus } from "@/types/review"

interface ReviewDetailsProps {
  reviewId: string
}

export function ReviewDetails({ reviewId }: ReviewDetailsProps) {
  const router = useRouter()
  const [moderatorNotes, setModeratorNotes] = useState("")

  // Fetch review details
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboardReview", reviewId],
    queryFn: () => getDashboardReviewById(reviewId),
  })

  // Update review status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ status, notes }: { status: ReviewStatus; notes: string }) =>
      updateReviewStatus(reviewId, status, notes),
    onSuccess: () => {
      toast({
        title: "Review updated",
        description: "The review status has been updated successfully.",
      })
      refetch()
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update review status. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      toast({
        title: "Review deleted",
        description: "The review has been deleted successfully.",
      })
      router.push("/dashboard/reviews")
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Handle approve
  const handleApprove = () => {
    updateStatusMutation.mutate({ status: "approved", notes: moderatorNotes })
  }

  // Handle reject
  const handleReject = () => {
    updateStatusMutation.mutate({ status: "rejected", notes: moderatorNotes })
  }

  // Handle delete
  const handleDelete = () => {
    deleteReviewMutation.mutate()
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending Review
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

  const review = data?.data

  const ownershipLabels = {
    "less-than-month": "Less than a month",
    "1-6-months": "1-6 months",
    "6-12-months": "6-12 months",
    "1-3-years": "1-3 years",
    "3-plus-years": "3+ years",
  }

  const purchaseLabels = {
    new: "Purchased new",
    used: "Purchased used",
    leased: "Leased",
    rented: "Rented",
    "test-drive": "Test drive",
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-8 w-[200px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-[300px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isError || !review) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Error Loading Review</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't load this review. It may have been deleted or there was a server error.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Review Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{review.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(review.$createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <RatingStars rating={review.rating} />
                  <div className="flex gap-2 mt-2">
                    {getStatusBadge(review.status)}
                    {review.reported && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <Flag className="h-3 w-3 mr-1" />
                        Reported
                      </Badge>
                    )}
                    {review.verifiedPurchase && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {purchaseLabels[review.purchaseType as keyof typeof purchaseLabels]} • Owned for{" "}
                {ownershipLabels[review.ownershipDuration as keyof typeof ownershipLabels]}
              </p>

              <p className="mb-6">{review.comment}</p>

              {(review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {review.pros && review.pros.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Pros</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {review.pros.map((pro, index) => (
                          <li key={index} className="text-sm">
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {review.cons && review.cons.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-600 mb-2">Cons</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {review.cons.map((con, index) => (
                          <li key={index} className="text-sm">
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="flex items-center mt-2">
                <Badge variant={review.recommend ? "default" : "destructive"}>
                  {review.recommend ? "Recommends this car" : "Does not recommend"}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{review.helpful_count || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{review.unhelpful_count || 0}</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moderation Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add notes about why this review was approved or rejected..."
                value={moderatorNotes}
                onChange={(e) => setModeratorNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleApprove}
                  disabled={updateStatusMutation.isPending}
                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReject}
                  disabled={updateStatusMutation.isPending}
                  className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Review</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this review? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={review.user?.avatar} alt={review.user?.name || "User"} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.user?.name || "Anonymous"}</p>
                  <p className="text-sm text-muted-foreground">User ID: {review.user_id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Car Information</CardTitle>
            </CardHeader>
            <CardContent>
              {review.car ? (
                <div className="space-y-4">
                  {review.car.images && review.car.images[0] && (
                    <div className="aspect-video rounded-md overflow-hidden">
                      <img
                        src={review.car.images[0] || "/placeholder.svg"}
                        alt={review.car.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{review.car.title}</h3>
                    <p className="text-sm text-muted-foreground">Car ID: {review.car_id}</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-sm"
                      onClick={() => router.push(`/car/${review.car?.slug}`)}
                    >
                      <Car className="h-3 w-3 mr-1" />
                      View Car
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Car information not available</p>
                  <p className="text-xs">Car ID: {review.car_id}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

