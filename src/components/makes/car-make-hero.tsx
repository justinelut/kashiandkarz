import Image from "next/image"

interface CarMakeHeroProps {
  carMake: any
}

export function CarMakeHero({ carMake }: CarMakeHeroProps) {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center p-4 border border-gray-200">
            <Image
              src={carMake.image || "/placeholder.svg"}
              alt={carMake.name}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">{carMake.name}</h1>
            <p className="text-lg text-muted-foreground">
              {carMake.car_info?.length || 0} {(carMake.car_info?.length || 0) === 1 ? "vehicle" : "vehicles"} available
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

