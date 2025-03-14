interface KeyInformationProps {
  details: {
    year: string
    mileage: string
    engineSize: string
    enginePower: string
    transmission: string
    fuel: string
    doors: string
    seats: string
    colour: string
    registration: string
    previousOwners: string
  }
}

export function KeyInformation({ details }: KeyInformationProps) {
  return (
    <section className="rounded-lg border bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold">Key information</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Year</span>
            <span className="font-medium">{details.year}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Mileage</span>
            <span className="font-medium">{details.mileage}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Engine size</span>
            <span className="font-medium">{details.engineSize}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Engine power</span>
            <span className="font-medium">{details.enginePower}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Transmission</span>
            <span className="font-medium">{details.transmission}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Fuel</span>
            <span className="font-medium">{details.fuel}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Doors</span>
            <span className="font-medium">{details.doors}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Seats</span>
            <span className="font-medium">{details.seats}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Colour</span>
            <span className="font-medium">{details.colour}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Registration number</span>
            <span className="font-medium">{details.registration}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Previous owners</span>
            <span className="font-medium">{details.previousOwners}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

