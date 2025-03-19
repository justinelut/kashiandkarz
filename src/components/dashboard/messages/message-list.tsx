"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getMessages } from "@/lib/message-actions"
import type { Message } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Mail, Car, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function MessageList() {
  const [filter, setFilter] = useState<string>("all")
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", filter, page, limit],
    queryFn: () => {
      if (filter === "unread") {
        return getMessages(false, undefined, page, limit)
      } else if (filter === "read") {
        return getMessages(true, undefined, page, limit)
      } else if (filter === "replied") {
        return getMessages(undefined, true, page, limit)
      } else if (filter === "unreplied") {
        return getMessages(undefined, false, page, limit)
      } else {
        return getMessages(undefined, undefined, page, limit)
      }
    },
  })

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading messages...</div>
  }

  if (error) {
    return <div className="text-red-500 p-8">Error loading messages</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter messages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="unreplied">Unreplied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {data?.messages.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">No messages found.</CardContent>
          </Card>
        ) : (
          data?.messages.map((message: Message & { car?: any }) => (
            <Card
              key={message.id}
              className={`overflow-hidden ${!message.isRead ? "border-l-4 border-l-blue-500" : ""}`}
            >
              <div className="flex flex-col md:flex-row">
                {message.car && message.car.images && message.car.images.length > 0 && (
                  <div className="w-full md:w-1/4 relative">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={message.car.images[0] || "/placeholder.svg"}
                        alt={message.car.title || "Car image"}
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
                        <CardTitle>{message.subject}</CardTitle>
                        <CardDescription>From: {message.senderName}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {!message.isRead && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            New
                          </Badge>
                        )}
                        {message.isReplied && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Replied
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{message.senderEmail}</span>
                      </div>
                      {message.car ? (
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Re: {message.car.car_make?.name} {message.car.car_model} {message.car.year}
                          </span>
                        </div>
                      ) : message.carTitle ? (
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>Re: {message.carTitle}</span>
                        </div>
                      ) : null}
                      <div className="md:col-span-2">
                        <p className="text-muted-foreground line-clamp-2">{message.message}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="text-sm text-muted-foreground">
                      {message.createdAt && (
                        <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                      )}
                    </div>
                    <Link href={`/dashboard/messages/${message.id}`}>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        View Message
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

