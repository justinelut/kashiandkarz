"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCallbackRequests } from "@/lib/callback-actions"
import type { CallbackRequest } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Phone, Car, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function CallbackList() {
  const [status, setStatus] = useState<string>("all")
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, error } = useQuery({
    queryKey: ["callbacks", status, page, limit],
    queryFn: () => getCallbackRequests(status, page, limit),
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "contacted":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Contacted
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
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading callbacks...</div>
  }

  if (error) {
    return <div className="text-red-500 p-8">Error loading callbacks</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Callback Requests</h2>
        <div className="flex items-center gap-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/dashboard/callbacks/new">
            <Button>New Callback</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {data?.callbacks.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">No callback requests found.</CardContent>
          </Card>
        ) : (
          data?.callbacks.map((callback: CallbackRequest & { car?: any }) => (
            <Card key={callback.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {callback.car && callback.car.images && callback.car.images.length > 0 && (
                  <div className="w-full md:w-1/4 relative">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={callback.car.images[0] || "/placeholder.svg"}
                        alt={callback.car.title || "Car image"}
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
                        <CardTitle>{callback.customerName}</CardTitle>
                        <CardDescription>{callback.customerEmail}</CardDescription>
                      </div>
                      {getStatusBadge(callback.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{callback.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Preferred time: {callback.preferredTime}</span>
                      </div>
                      {callback.car ? (
                        <div className="flex items-center gap-2 md:col-span-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {callback.car.car_make?.name} {callback.car.car_model} {callback.car.year}
                          </span>
                        </div>
                      ) : callback.carTitle ? (
                        <div className="flex items-center gap-2 md:col-span-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>{callback.carTitle}</span>
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="text-sm text-muted-foreground">
                      {callback.createdAt && (
                        <span>{formatDistanceToNow(new Date(callback.createdAt), { addSuffix: true })}</span>
                      )}
                    </div>
                    <Link href={`/dashboard/callbacks/${callback.id}`}>
                      <Button variant="outline" size="sm">
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

