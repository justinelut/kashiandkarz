"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative flex gap-4">
      {/* Thumbnails */}
      <div className="hidden w-24 flex-shrink-0 flex-col gap-2 md:flex">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-lg border-2",
              currentImage === index ? "border-primary" : "border-transparent",
            )}
          >
            <Image src={image || "/placeholder.svg"} alt={`Car image ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt="Car main image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 text-xs text-white">
          {currentImage + 1}/{images.length}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80"
          onClick={previousImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

