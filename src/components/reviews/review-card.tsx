"use client"

import { formatDistanceToNow } from "date-fns"
import { ThumbsDown, ThumbsUp, Flag } from "lucide-react"
import { useState } from "react"
import { RatingStars } from "@/components/reviews/rating-stars"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import { markReviewHelpful, reportReview } from "@/lib/review-actions"
import type { Review } from "@/types/review"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful_count || 0)
  const [unhelpfulCount, setUnhelpfulCount] = useState(review.unhelpful_count || 0)
  const [isReported, setIsReported] = useState(review.reported || false)
  const [hasVoted, setHasVoted] = useState(false)

  const handleHelpful = async (helpful: boolean) => {
    if (hasVoted) return

    const result = await markReviewHelpful(review.$id, helpful)

    if (result.success) {
      if (helpful) {
        setHelpfulCount(helpfulCount + 1)
      } else {
        setUnhelpfulCount(unhelpfulCount + 1)
      }
      setHasVoted(true)
    }
  }

  const handleReport = async () => {
    const result = await reportReview(review.$id)

    if (result.success) {
      setIsReported(true)
    }
  }

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

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={review.user?.avatar} alt={review.user?.name || "User"} />
              <AvatarFallback>{(review.user?.name || "U").charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{review.user?.name || "Anonymous"}</div>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(review.$createdAt), { addSuffix: true })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <RatingStars rating={review.rating} />
            {review.verifiedPurchase && (
              <Badge variant="outline" className="mt-1">
                Verified Purchase
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {purchaseLabels[review.purchaseType as keyof typeof purchaseLabels]} • Owned for{" "}
          {ownershipLabels[review.ownershipDuration as keyof typeof ownershipLabels]}
        </p>

        <p className="mb-4">{review.comment}</p>

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

      <Separator />

      <CardFooter className="pt-4 flex justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleHelpful(true)}
            disabled={hasVoted}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{helpfulCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleHelpful(false)}
            disabled={hasVoted}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{unhelpfulCount}</span>
          </Button>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-1" disabled={isReported}>
              <Flag className="h-4 w-4" />
              <span>Report</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Report this review</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to report this review? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReport}>Report</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

