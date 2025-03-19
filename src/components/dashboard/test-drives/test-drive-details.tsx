"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { updateTestDrive, deleteTestDrive } from "@/lib/test-drive-actions"
import type { TestDrive } from "@/types/dashboard"
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
import {
  Phone,
  Mail,
  Calendar,
  Clock,
  Trash,
  Edit,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  User,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface TestDriveDetailsProps {
  testDrive: TestDrive & { car?: any }
}

export function TestDriveDetails({ testDrive }: TestDriveDetailsProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TestDrive> }) => updateTestDrive(id, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Test drive status updated successfully",
      })
      router.refresh()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update test drive status",
        variant: "destructive",
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTestDrive,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Test drive deleted successfully",
      })
      router.push("/dashboard/test-drives")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete test drive",
        variant: "destructive",
      })
    },
  })

  const handleStatusChange = (newStatus: string) => {
    if (testDrive.id) {
      updateMutation.mutate({
        id: testDrive.id,
        data: { status: newStatus as any },
      })
    }
  }

  const handleDelete = () => {
    if (testDrive.id) {
      deleteMutation.mutate(testDrive.id)
    }
  }

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
            <Link href="/dashboard/test-drives">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Test Drive Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/test-drives/${testDrive.id}/edit`}>
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
                <DialogTitle>Delete Test Drive</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this test drive? This action cannot be undone.
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

      {testDrive.car && (
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {testDrive.car.images && testDrive.car.images.length > 0 && (
              <div className="w-full md:w-1/3">
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
            <div className="flex-1 p-6">
              <h3 className="text-2xl font-bold mb-2">
                {testDrive.car.car_make?.name} {testDrive.car.car_model} {testDrive.car.year}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-muted-foreground">Condition:</span> {testDrive.car.condition}
                </div>
                <div>
                  <span className="text-muted-foreground">Fuel Type:</span>{" "}
                  {testDrive.car.car_specifications?.fuel_type}
                </div>
                <div>
                  <span className="text-muted-foreground">Transmission:</span>{" "}
                  {testDrive.car.car_specifications?.transmission_type}
                </div>
                <div>
                  <span className="text-muted-foreground">Color:</span> {testDrive.car.color?.name}
                </div>
                {testDrive.car.pricing_payments?.selling_price && (
                  <div className="md:col-span-2">
                    <span className="text-muted-foreground">Price:</span>{" "}
                    {formatCurrency(
                      testDrive.car.pricing_payments.selling_price,
                      testDrive.car.pricing_payments.currency,
                    )}
                  </div>
                )}
              </div>
              <Link href={`/car/${testDrive.car.slug}`} target="_blank" className="inline-flex items-center">
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
              <CardTitle className="text-2xl">
                {testDrive.car ? (
                  <>
                    {testDrive.car.car_make?.name} {testDrive.car.car_model} {testDrive.car.year}
                  </>
                ) : (
                  testDrive.carTitle
                )}
              </CardTitle>
              <CardDescription>
                Test drive scheduled for {format(new Date(testDrive.scheduledDate), "MMMM d, yyyy")} at{" "}
                {testDrive.scheduledTime}
              </CardDescription>
            </div>
            {getStatusBadge(testDrive.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Date</div>
                <div>{format(new Date(testDrive.scheduledDate), "MMMM d, yyyy")}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Time</div>
                <div>{testDrive.scheduledTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Customer Name</div>
                <div>{testDrive.customerName}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Customer Email</div>
                <div>{testDrive.customerEmail}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Customer Phone</div>
                <div>{testDrive.customerPhone}</div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Notes</h3>
            <p className="text-muted-foreground">{testDrive.notes || "No notes provided."}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Update Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant={testDrive.status === "scheduled" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleStatusChange("scheduled")}
              >
                <Calendar className="h-4 w-4" />
                Scheduled
              </Button>
              <Button
                variant={testDrive.status === "completed" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleStatusChange("completed")}
              >
                <CheckCircle className="h-4 w-4" />
                Completed
              </Button>
              <Button
                variant={testDrive.status === "cancelled" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleStatusChange("cancelled")}
              >
                <XCircle className="h-4 w-4" />
                Cancelled
              </Button>
              <Button
                variant={testDrive.status === "no-show" ? "default" : "outline"}
                className="flex items-center gap-2"
                onClick={() => handleStatusChange("no-show")}
              >
                <AlertCircle className="h-4 w-4" />
                No Show
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

