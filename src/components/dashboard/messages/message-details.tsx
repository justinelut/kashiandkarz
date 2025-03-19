"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { markMessageAsRead, markMessageAsReplied, deleteMessage } from "@/lib/message-actions"
import type { Message } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { Mail, Phone, Car, Trash, Reply, ArrowLeft, Check, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface MessageDetailsProps {
  message: Message & { car?: any }
}

export function MessageDetails({ message }: MessageDetailsProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  // Mark as read when viewing
  useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: () => {
      router.refresh()
    },
    onError: (error) => {
      console.error("Error marking message as read:", error)
    },
  }).mutate(message.id!)

  const replyMutation = useMutation({
    mutationFn: markMessageAsReplied,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message marked as replied",
      })
      setIsReplyDialogOpen(false)
      setReplyText("")
      router.refresh()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to mark message as replied",
        variant: "destructive",
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message deleted successfully",
      })
      router.push("/dashboard/messages")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
    },
  })

  const handleReply = () => {
    if (message.id) {
      // In a real app, you would send an email here
      // For now, we'll just mark it as replied
      replyMutation.mutate(message.id)
    }
  }

  const handleDelete = () => {
    if (message.id) {
      deleteMutation.mutate(message.id)
    }
  }

  const formatCurrency = (amount: number, currency = "KES") => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/messages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Message Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Reply to {message.senderName}</DialogTitle>
                <DialogDescription>Your reply will be sent to {message.senderEmail}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <div className="font-medium">Subject</div>
                  <div>Re: {message.subject}</div>
                </div>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleReply} disabled={!replyText.trim()}>
                  Send Reply
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Message</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this message? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {message.car && (
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {message.car.images && message.car.images.length > 0 && (
              <div className="w-full md:w-1/3">
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
            <div className="flex-1 p-6">
              <h3 className="text-2xl font-bold mb-2">
                {message.car.car_make?.name} {message.car.car_model} {message.car.year}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-muted-foreground">Condition:</span> {message.car.condition}
                </div>
                <div>
                  <span className="text-muted-foreground">Fuel Type:</span> {message.car.car_specifications?.fuel_type}
                </div>
                <div>
                  <span className="text-muted-foreground">Transmission:</span>{" "}
                  {message.car.car_specifications?.transmission_type}
                </div>
                <div>
                  <span className="text-muted-foreground">Color:</span> {message.car.color?.name}
                </div>
                {message.car.pricing_payments?.selling_price && (
                  <div className="md:col-span-2">
                    <span className="text-muted-foreground">Price:</span>{" "}
                    {formatCurrency(message.car.pricing_payments.selling_price, message.car.pricing_payments.currency)}
                  </div>
                )}
              </div>
              <Link href={`/car/${message.car.slug}`} target="_blank" className="inline-flex items-center">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Car Details
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{message.subject}</CardTitle>
              <CardDescription>
                From: {message.senderName} ({message.senderEmail})
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {message.isReplied ? (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <Check className="h-3 w-3 mr-1" />
                  Replied
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  Awaiting Reply
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Email</div>
                <div>{message.senderEmail}</div>
              </div>
            </div>
            {message.senderPhone && (
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div>{message.senderPhone}</div>
                </div>
              </div>
            )}
            {(message.car || message.carTitle) && (
              <div className="flex items-center gap-2 md:col-span-2">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Regarding Car</div>
                  <div>
                    {message.car ? (
                      <>
                        {message.car.car_make?.name} {message.car.car_model} {message.car.year}
                      </>
                    ) : (
                      message.carTitle
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Message</h3>
            <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap">{message.message}</div>
          </div>

          <div className="text-sm text-muted-foreground">
            {message.createdAt && <span>Received on {format(new Date(message.createdAt), "PPP 'at' p")}</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

