"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { updateCallbackRequest, deleteCallbackRequest } from "@/lib/callback-actions"
import type { CallbackRequest } from "@/types/dashboard"
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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { Phone, Mail, Car, Clock, Trash, Edit, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface CallbackDetailsProps {
  callback: CallbackRequest & { car?: any }
}

export function CallbackDetails({ callback }: CallbackDetailsProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CallbackRequest> }) => updateCallbackRequest(id, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Callback status updated successfully",
      })
      router.refresh()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update callback status",
        variant: "destructive",
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCallbackRequest,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Callback request deleted successfully",
      })
      router.push("/dashboard/callbacks")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete callback request",
        variant: "destructive",
      })
    },
  })

  const handleStatusChange = (newStatus: string) => {
    if (callback.id) {
      updateMutation.mutate({
        id: callback.id,
        data: { status: newStatus as any },
      })
    }
  }

  const handleDelete = () => {
    if (callback.id) {
      deleteMutation.mutate(callback.id)
    }
  }

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
            <Link href="/dashboard/callbacks">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Callback Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/callbacks/${callback.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Callback Request</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this callback request? This action cannot be undone.
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

      {callback.car && (
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {callback.car.images && callback.car.images.length > 0 && (
              <div className="w-full md:w-1/3">
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
            <div className="flex-1 p-6">
              <h3 className="text-2xl font-bold mb-2">
                {callback.car.car_make?.name} {callback.car.car_model} {callback.car.year}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-muted-foreground">Condition:</span> {callback.car.condition}
                </div>
                <div>
                  <span className="text-muted-foreground">Fuel Type:</span> {callback.car.car_specifications?.fuel_type}
                </div>
                <div>
                  <span className="text-muted-foreground">Transmission:</span>{" "}
                  {callback.car.car_specifications?.transmission_type}
                </div>
                <div>
                  <span className="text-muted-foreground">Color:</span> {callback.car.color?.name}
                </div>
                {callback.car.pricing_payments?.selling_price && (
                  <div className="md:col-span-2">
                    <span className="text-muted-foreground">Price:</span>{" "}
                    {formatCurrency(
                      callback.car.pricing_payments.selling_price,
                      callback.car.pricing_payments.currency,
                    )}
                  </div>
                )}
              </div>
              <Link href={`/car/${callback.car.slug}`} target="_blank" className="inline-flex items-center">
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
              <CardTitle className="text-2xl">{callback.customerName}</CardTitle>
              <CardDescription>
                {callback.createdAt && <span>Created on {format(new Date(callback.createdAt), "PPP")}</span>}
              </CardDescription>
            </div>
            {getStatusBadge(callback.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Phone</div>
                <div>{callback.customerPhone}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Email</div>
                <div>{callback.customerEmail}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Preferred Time</div>
                <div>{callback.preferredTime}</div>
              </div>
            </div>
            {(callback.car || callback.carTitle) && (
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Car</div>
                  <div>
                    {callback.car ? (
                      <>
                        {callback.car.car_make?.name} {callback.car.car_model} {callback.car.year}
                      </>
                    ) : (
                      callback.carTitle
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Notes</h3>
            <p className="text-muted-foreground">{callback.notes || "No notes provided."}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={callback.status === "pending" ? "default" : "outline"}
                onClick={() => handleStatusChange("pending")}
              >
                Pending
              </Button>
              <Button
                variant={callback.status === "contacted" ? "default" : "outline"}
                onClick={() => handleStatusChange("contacted")}
              >
                Contacted
              </Button>
              <Button
                variant={callback.status === "completed" ? "default" : "outline"}
                onClick={() => handleStatusChange("completed")}
              >
                Completed
              </Button>
              <Button
                variant={callback.status === "cancelled" ? "default" : "outline"}
                onClick={() => handleStatusChange("cancelled")}
              >
                Cancelled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

