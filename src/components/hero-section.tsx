import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="relative h-[600px] w-full overflow-hidden">
        <Image
          src="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1729773746/evo/2024/10/G90%20BMW%20M5%20saloon-13.jpg"
          alt="BMW M5"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
          <div className="container relative flex h-full flex-col justify-center px-4 md:px-6">
            <div className="max-w-md space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                CAR-CHANGE?
                <br />
                CARWOW.
              </h1>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90">
                  Sell my car
                </Button>
                <Button size="lg" className="bg-[#00e1e1] text-black hover:bg-[#00e1e1]/90">
                  Find a car
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

