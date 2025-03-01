"use client"

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CarBrand {
  id: string
  name: string
  logoUrl: string
  slug: string
}

interface CarBrandsCarouselProps {
  className?: string
  speed?: number
}

const CAR_BRANDS: CarBrand[] = [
  {
    id: '1',
    name: 'Mercedes-Benz',
    logoUrl: 'https://www.carlogos.org/car-logos/mercedes-benz-logo-1916.png',
    slug: 'mercedes-benz'
  },
  {
    id: '2',
    name: 'BMW',
    logoUrl: 'https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white.png',
    slug: 'bmw'
  },
  {
    id: '3',
    name: 'Audi',
    logoUrl: 'https://www.carlogos.org/logo/Audi-logo-2016-1920x1080.png',
    slug: 'audi'
  },
  {
    id: '4',
    name: 'Toyota',
    logoUrl: 'https://www.carlogos.org/car-logos/toyota-logo-2019-3700x1200.png',
    slug: 'toyota'
  },
  {
    id: '5',
    name: 'Honda',
    logoUrl: 'https://www.carlogos.org/car-logos/honda-logo-2000-2300x1300.png',
    slug: 'honda'
  },
  {
    id: '6',
    name: 'Lexus',
    logoUrl: 'https://www.carlogos.org/car-logos/lexus-logo-2020-1700x1150.png',
    slug: 'lexus'
  },
  {
    id: '7',
    name: 'Porsche',
    logoUrl: 'https://www.carlogos.org/car-logos/porsche-logo-2100x1100.png',
    slug: 'porsche'
  },
  {
    id: '8',
    name: 'Tesla',
    logoUrl: 'https://www.carlogos.org/car-logos/tesla-logo-2200x2800.png',
    slug: 'tesla'
  },
  {
    id: '9',
    name: 'Volvo',
    logoUrl: 'https://www.carlogos.org/car-logos/volvo-logo-2014-1920x1080.png',
    slug: 'volvo'
  },
  {
    id: '10',
    name: 'Land Rover',
    logoUrl: 'https://www.carlogos.org/logo/Land-Rover-logo-2011-1920x1080.png',
    slug: 'land-rover'
  }
]

const CarBrandsCarousel = ({ className, speed = 1 }: CarBrandsCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [duplicatedBrands, setDuplicatedBrands] = useState<CarBrand[]>([])

  useEffect(() => {
    setDuplicatedBrands([...CAR_BRANDS, ...CAR_BRANDS])
  }, [])

  useEffect(() => {
    let animationId: number
    let startTime: number
    let previousTimestamp: number
    let scrollPosition = 0

    const animate = (timestamp: number) => {
      if (!scrollerRef.current) return

      if (!startTime) {
        startTime = timestamp
        previousTimestamp = timestamp
      }

      const elapsed = timestamp - previousTimestamp
      previousTimestamp = timestamp

      if (!isPaused) {
        scrollPosition += speed * elapsed * 0.05
        
        if (scrollPosition >= scrollerRef.current.scrollWidth / 2) {
          scrollPosition = 0
        }
        
        scrollerRef.current.style.transform = `translateX(-${scrollPosition}px)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPaused, speed])

  return (
    <div 
      className={cn("relative overflow-hidden w-full", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      <div 
        ref={scrollerRef}
        className="flex whitespace-nowrap"
      >
        {duplicatedBrands.map((brand, index) => (
          <Link 
            href={`/brands/${brand.slug}`} 
            key={`${brand.id}-${index}`}
            className="inline-flex flex-col items-center justify-center mx-4 min-w-[160px] h-[180px] bg-white rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="relative w-20 h-20 mb-3 overflow-hidden">
              <Image
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium text-gray-950">{brand.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CarBrandsCarousel