import { Star } from "lucide-react"

interface StatsPerformanceProps {
  stats: {
    co2: string
    emissionsStandard: string
    insuranceGroup: string
    acceleration: string
    topSpeed: string
    avgMpg: string
    bootSeatsUp: string
    bootSeatsDown: string
    safetyRating: number
  }
}

export function StatsPerformance({ stats }: StatsPerformanceProps) {
  return (
    <section className="rounded-lg border bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold">Stats & performance</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">CO2 emissions</span>
            <span className="font-medium">{stats.co2}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Emissions standard</span>
            <span className="font-medium">{stats.emissionsStandard}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Insurance group</span>
            <span className="font-medium">{stats.insuranceGroup}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Acceleration (0-62mph)</span>
            <span className="font-medium">{stats.acceleration}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Top speed</span>
            <span className="font-medium">{stats.topSpeed}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Average MPG</span>
            <span className="font-medium">{stats.avgMpg}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Boot (seats up)</span>
            <span className="font-medium">{stats.bootSeatsUp}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Boot (seats down)</span>
            <span className="font-medium">{stats.bootSeatsDown}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Safety rating</span>
            <div className="flex">
              {Array(stats.safetyRating)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

