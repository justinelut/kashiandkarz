"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTestDrives } from "@/lib/test-drive-actions"
import type { TestDrive } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar, Clock, User, Phone, Car } from "lucide-react"
import Link from "next/link"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function TestDriveList() {
  const [status, setStatus] = useState<string>("all")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, error } = useQuery({
    queryKey: ["testDrives", status, startDate, endDate, page, limit],
    queryFn: () =>
      getTestDrives(
        status,
        startDate ? format(startDate, "yyyy-MM-dd") : undefined,
        endDate ? format(endDate, "yyyy-MM-dd") : undefined,
        page,
        limit,
      ),
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Cancelled
          </Badge>
        )
      case "no-show":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            No Show
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading test drives...</div>
  }

  if (error) {
    return <div className="text-red-500 p-8">Error loading test drives</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Test Drive Schedule</h2>
        <Link href="/dashboard/test-drives/new">
          <Button>Schedule Test Drive</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter test drives by status and date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Test Drives</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Filter from date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Filter to date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {!data?.testDrives || data.testDrives.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">No test drives found.</CardContent>
          </Card>
        ) : (
          data.testDrives.map((testDrive: TestDrive & { car?: any }) => (
            <Card key={testDrive.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {testDrive.car && testDrive.car.images && testDrive.car.images.length > 0 && (
                  <div className="w-full md:w-1/4 relative">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={testDrive.car.images[0] || "/placeholder.svg"}
                        alt={testDrive.car.title || "Car image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>
                          {testDrive.car ? (
                            <>
                              {testDrive.car.car_make?.name} {testDrive.car.car_model} {testDrive.car.year}
                            </>
                          ) : (
                            testDrive.carTitle
                          )}
                        </CardTitle>
                        <CardDescription>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(testDrive.preferred_date || testDrive.scheduledDate), "MMMM d, yyyy")}
                            <Clock className="h-4 w-4 ml-2" />
                            {testDrive.preferred_time || testDrive.scheduledTime}
                          </div>
                        </CardDescription>
                      </div>
                      {getStatusBadge(testDrive.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{testDrive.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{testDrive.customerPhone}</span>
                      </div>
                      {testDrive.car && (
                        <div className="flex items-center gap-2 md:col-span-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {testDrive.car.condition} | {testDrive.car.car_specifications?.fuel_type} |
                            {testDrive.car.car_specifications?.transmission_type}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link href={`/dashboard/test-drives/${testDrive.$id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {data && data.total > limit && (
        <Pagination currentPage={page} totalPages={Math.ceil(data.total / limit)} onPageChange={setPage} />
      )}
    </div>
  )
}