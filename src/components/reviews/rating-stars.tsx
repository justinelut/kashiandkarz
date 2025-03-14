"use client"

import { cn } from "@/lib/utils"
import { Star, StarHalf } from "lucide-react"

interface RatingStarsProps {
  rating: number
  size?: "sm" | "md" | "lg"
  className?: string
  interactive?: boolean
  onChange?: (rating: number) => void
}

export function RatingStars({ rating, size = "md", className, interactive = false, onChange }: RatingStarsProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const starSize = sizeClasses[size]

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1)
    }
  }

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={index}
              className={cn(starSize, "fill-yellow-400 text-yellow-400", interactive && "cursor-pointer")}
              onClick={() => handleClick(index)}
            />
          )
        } else if (index === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={index}
              className={cn(starSize, "fill-yellow-400 text-yellow-400", interactive && "cursor-pointer")}
              onClick={() => handleClick(index)}
            />
          )
        } else {
          return (
            <Star
              key={index}
              className={cn(starSize, "text-gray-300", interactive && "cursor-pointer")}
              onClick={() => handleClick(index)}
            />
          )
        }
      })}
    </div>
  )
}

