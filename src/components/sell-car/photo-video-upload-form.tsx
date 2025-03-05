"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, Camera, X, ImageIcon, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { savePhotoVideo, uploadFiles, getCarInformation } from "@/lib/actions"
import { useCarStore } from "@/store/car-store"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  images: z.array(z.string()).min(1, "At least one image is required"),
  video: z
    .string()
    .url("Please enter a valid video URL")
    .optional()
    .or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

// Animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
}

const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
}

const bounceIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, type: "spring", stiffness: 300 },
}

export default function PhotoVideoUploadForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const id = searchParams.get("id")
  const isEditMode = mode === "edit" && id

  const fileInputRef = useRef<HTMLInputElement>(null)
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Zustand store
  const car_id = useCarStore((state) => state.car_id)
  const photos = useCarStore((state) => state.photos)
  const setPhotos = useCarStore((state) => state.setPhotos)
  const setCarId = useCarStore((state) => state.setCarId)

  // Fetch car data in edit mode and update store
  useEffect(() => {
    const fetchCarData = async () => {
      if (isEditMode && id) {
        const { success, data } = await getCarInformation(id)
        if (success && data) {
          // Assuming the photos data is stored under data.photos
          setPhotos({
            images: data?.images || [],
            video: data?.video || "",
          })
          setCarId(id)
        } else {
          toast.error("Failed to fetch car information")
          router.push("/dashboard/cars")
        }
      }
    }
    fetchCarData()
  }, [isEditMode, id, setPhotos, setCarId, router])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: photos?.images || [],
      video: photos?.video || "",
    },
  })

  // Update form values if store photos change
  useEffect(() => {
    if (photos) {
      form.reset({
        images: photos.images,
        video: photos.video || "",
      })
    }
  }, [photos, form])

  // Validate that we have a car ID
  useEffect(() => {
    if (!car_id) {
      toast.error("No car information found", {
        description: "Please start from the beginning to add a new car.",
      })
      router.push("/sell-car")
    }
  }, [car_id, router])

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const result = await uploadFiles(formData)
        if (!result.success) {
          throw new Error(result.error || "Upload failed")
        }
        return result.data
      } catch (error) {
        console.error("Upload error:", error)
        throw error
      }
    },
    onSuccess: (urls) => {
      const currentImages = form.getValues("images") || []
      if (currentImages.length + urls.length > 5) {
        toast.error("Too many photos", {
          description: "You can only upload up to 5 photos.",
        })
        return
      }
      form.setValue("images", [...currentImages, ...urls])
    },
    onError: (error) => {
      toast.error("Upload failed", {
        description: "Failed to upload images. Please try again.",
      })
      console.error("Upload error:", error)
    },
  })

  const { mutate: saveForm, isPending: isSaving } = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!car_id) {
        throw new Error("No car ID found")
      }
      // Save to database first
      const result = await savePhotoVideo(data, car_id)
      // Only update store if save was successful
      if (result.success) {
        setPhotos(data)
      }
      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        if (isEditMode) {
          setShowSuccessDialog(true)
        } else {
          toast.success("Photos saved", {
            description: "Car photos have been saved successfully.",
          })
          router.push("/dashboard/cars/new/pricing")
        }
      } else {
        toast.error("Error saving photos", {
          description: result.error || "An error occurred while saving photos.",
        })
      }
    },
    onError: (error) => {
      toast.error("Error saving photos", {
        description: "An unexpected error occurred. Please try again.",
      })
      console.error("Error saving car photos:", error)
    },
  })

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files?.length) return

      const formData = new FormData()
      Array.from(files).forEach((file) => {
        formData.append("files", file)
      })

      uploadMutation.mutate(formData)
    },
    [uploadMutation],
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Top Description */}
        <div className="mb-8 text-center">
          <motion.div variants={fadeInDown} initial="initial" animate="animate">
            <h1 className="text-3xl font-bold text-gray-900">Car Photos & Video</h1>
            <p className="mt-2 text-lg text-gray-500">
              Upload high-quality photos to showcase your car!
            </p>
          </motion.div>
        </div>

        {/* Video URL Input */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Video className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Add video URL (YouTube, Vimeo, etc.)"
              className="pl-10 rounded-xl"
              value={form.watch("video") || ""}
              onChange={(e) => form.setValue("video", e.target.value)}
            />
          </div>
        </div>

        {/* Main Upload Section */}
        <div className="space-y-6">
          {/* Image Preview or Placeholder */}
          <div className="relative">
            {form.watch("images")?.length > 0 ? (
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="relative w-full" style={{ height: "350px" }}>
                  <Image
                    src={
                      form.watch("images")[selectedImageIndex] || "/placeholder.svg"
                    }
                    alt="Selected"
                    fill
                    className="rounded-2xl object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <button
                    onClick={() => {
                      const currentImages = form.getValues("images")
                      form.setValue(
                        "images",
                        currentImages.filter((_, i) => i !== selectedImageIndex),
                      )
                      setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))
                    }}
                    className="absolute right-4 top-4 rounded-full bg-black/30 p-2 hover:bg-black/50 transition-colors"
                  >
                    <X size={20} color="#fff" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={bounceIn}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center"
                style={{ height: "300px" }}
              >
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <div className="mb-4 rounded-full bg-gray-100 p-4">
                    <Camera size={32} className="text-primary" />
                  </div>
                  <p className="mb-2 text-lg font-semibold">Add photos of your car</p>
                  <p className="text-gray-500">Upload up to 5 photos</p>
                </button>
              </motion.div>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Thumbnails */}
          {form.watch("images")?.length > 0 && (
            <div className="px-2">
              <div
                ref={horizontalScrollRef}
                className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <motion.div
                    key={index}
                    variants={slideInRight}
                    initial="initial"
                    animate="animate"
                    className="mr-4 flex-shrink-0"
                  >
                    {index < (form.watch("images")?.length || 0) ? (
                      <button
                        onClick={() => setSelectedImageIndex(index)}
                        className={cn(
                          "relative overflow-hidden rounded-xl transition-all",
                          selectedImageIndex === index
                            ? "ring-2 ring-primary ring-offset-2"
                            : "",
                        )}
                      >
                        <div className="relative" style={{ width: "80px", height: "80px" }}>
                          <Image
                            src={form.watch("images")[index] || "/placeholder.svg"}
                            alt={`Thumbnail ${index}`}
                            fill
                            className="rounded-xl object-cover"
                            sizes="80px"
                          />
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="h-20 w-20 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <ImageIcon size={24} className="text-primary" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-semibold">Tips for great car photos</h2>
            <div className="space-y-3">
              {[
                "Use natural lighting for better quality",
                "Clean your car before taking photos",
                "Take photos in landscape orientation",
                "Show all angles of your car",
                "Include interior and engine bay shots",
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={fadeInDown}
                  initial="initial"
                  animate="animate"
                  className="flex items-center"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mr-3 h-2 w-2 rounded-full bg-primary" />
                  <p className="text-gray-600">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.push("/sell-car/step-5")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </button>
              <button
                onClick={() => saveForm(form.getValues())}
                disabled={
                  !form.watch("images")?.length ||
                  uploadMutation.isPending ||
                  isSaving
                }
                className={cn(
                  "flex items-center justify-center rounded-full px-6 py-3 transition-colors",
                  uploadMutation.isPending || isSaving
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : !form.watch("images")?.length
                    ? "bg-gray-200 text-gray-500"
                    : "bg-primary text-white hover:bg-primary/90",
                )}
              >
                {uploadMutation.isPending || isSaving ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    <span className="text-current">
                      {uploadMutation.isPending ? "Uploading..." : "Saving..."}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-semibold">
                    {!form.watch("images")?.length
                      ? "Add at least one photo"
                      : isEditMode
                      ? "Update Photos"
                      : "Next"}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog for Edit Mode */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Photos &amp; Video Updated Successfully</DialogTitle>
            <DialogDescription>
              Your car photos and video have been updated successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => router.push(`/dashboard/cars/${car_id}`)}
              className="bg-primary text-white rounded px-4 py-2"
            >
              Go to Car Details
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
