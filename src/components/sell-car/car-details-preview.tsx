"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Check, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CarDetailsPreviewProps {
  carDetails: {
    year: number
    type: string
    fuelType: string
    transmission: string
    drivetrain: string
    engine: string
    horsepower: number
    torque: number
    doors?: number
    weight?: number
    combinedMpg?: number
  }
  makeLogo?: string
}

export function CarDetailsPreview({ carDetails, makeLogo }: CarDetailsPreviewProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, []) // Removed unnecessary carDetails dependency

  if (!carDetails) return null

  return (
    <Card className="mt-4 overflow-hidden border bg-muted/10">
      <CardContent className="p-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-[250px]" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-5 w-[100px]" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {makeLogo && (
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image
                      src={makeLogo || "/placeholder.svg"}
                      alt={carDetails.make}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                      }}
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {carDetails.make} {carDetails.model}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {carDetails.year} • {carDetails.type}
                  </p>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Data from API Ninjas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/5">
                {carDetails.fuelType}
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                {carDetails.transmission}
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                {carDetails.drivetrain}
              </Badge>
              {carDetails.doors && (
                <Badge variant="outline" className="bg-primary/5">
                  {carDetails.doors} Doors
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Engine:</span>
                <span className="font-medium">{carDetails.engine}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Horsepower:</span>
                <span className="font-medium">{carDetails.horsepower} HP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Torque:</span>
                <span className="font-medium">{carDetails.torque} Nm</span>
              </div>
              {carDetails.weight && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-medium">{carDetails.weight} kg</span>
                </div>
              )}
              {carDetails.combinedMpg && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Combined MPG:</span>
                  <span className="font-medium">{carDetails.combinedMpg}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-md bg-green-50 p-2 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span>Car details automatically applied to your listing</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
