"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Camera, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { savePhotoVideo, uploadFiles } from "@/lib/actions";
import { useCarStore } from "@/store/car-store";
import Image from "next/image";

// Constants for sizing
const IMAGE_SIZE = 752;
const THUMBNAIL_SIZE = (800 - 64) / 4;

const formSchema = z.object({
  images: z.array(z.string()).min(1, "At least one image is required"),
  video: z.string().url("Please enter a valid video URL").optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

const bounceIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, type: "spring", stiffness: 300 },
};

export default function PhotoVideoUploadForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Zustand store
  const car_id = useCarStore((state) => state.car_id);
  const photos = useCarStore((state) => state.photos);
  const setPhotos = useCarStore((state) => state.setPhotos);

  // Validate that we have a car ID
  useEffect(() => {
    if (!car_id) {
      toast.error("No car information found", {
        description: "Please start from the beginning to add a new car.",
      });
      router.push("/dashboard/cars/new");
    }
  }, [car_id, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: photos?.images || [],
      video: photos?.video || "",
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await uploadFiles(formData);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (urls) => {
      const currentImages = form.getValues("images") || [];
      if (currentImages.length + urls.length > 5) {
        toast.error("Too many photos", {
          description: "You can only upload up to 5 photos.",
        });
        return;
      }
      form.setValue("images", [...currentImages, ...urls]);
    },
    onError: () => {
      toast.error("Upload failed", {
        description: "Failed to upload images. Please try again.",
      });
    },
  });

  const { mutate: saveForm, isPending: isSaving } = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!car_id) {
        throw new Error("No car ID found");
      }

      // Save to store first
      setPhotos(data);

      // Then save to database
      return await savePhotoVideo(data, car_id);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Photos saved", {
          description: "Car photos have been saved successfully.",
        });
        router.push("/dashboard/cars/new/pricing");
      } else {
        toast.error("Error saving photos", {
          description: result.error || "An error occurred while saving photos.",
        });
      }
    },
    onError: (error) => {
      toast.error("Error saving photos", {
        description: "An unexpected error occurred. Please try again.",
      });
      console.error("Error saving car photos:", error);
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    uploadMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Description at the top */}
        <div className="mb-8 text-center">
          <motion.div variants={fadeInDown} initial="initial" animate="animate">
            <h1 className="text-3xl font-bold text-gray-900">Car Photos & Video</h1>
            <p className="mt-2 text-lg text-gray-500">Upload high-quality photos to showcase your car!</p>
          </motion.div>
        </div>

        {/* Main Upload Section */}
        <div className="space-y-6">
          {/* Main Image Preview or Upload Placeholder */}
          <div className="relative">
            {form.watch("images")?.length > 0 ? (
              <motion.div variants={fadeIn} initial="initial" animate="animate" className="overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src={form.watch("images")[selectedImageIndex]}
                  alt="Selected"
                  width={1000}
                  height={1000}
                  className="rounded-3xl w-full object-cover"
                  style={{ height: IMAGE_SIZE * 0.75 }}
                />
                <button
                  onClick={() => {
                    const currentImages = form.getValues("images");
                    form.setValue(
                      "images",
                      currentImages.filter((_, i) => i !== selectedImageIndex)
                    );
                    setSelectedImageIndex(Math.max(0, selectedImageIndex - 1));
                  }}
                  className="absolute right-4 top-4 rounded-full bg-black/30 p-2"
                >
                  <X size={20} color="#fff" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                variants={bounceIn}
                initial="initial"
                animate="animate"
                className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center"
                style={{ height: IMAGE_SIZE * 0.75 }}
              >
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="mb-4 rounded-full bg-gray-100 p-4">
                    <Camera size={32} color="#FF5A5F" />
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
              <div className="flex space-x-4 overflow-x-auto">
                {Array.from({ length: 5 }, (_, index) => (
                  <motion.div
                    key={index}
                    variants={slideInRight}
                    initial="initial"
                    animate="animate"
                    className="mr-4"
                  >
                    {index < (form.watch("images")?.length || 0) ? (
                      <button
                        onClick={() => setSelectedImageIndex(index)}
                        className={cn(
                          "overflow-hidden rounded-xl",
                          selectedImageIndex === index ? "border-2 border-primary" : ""
                        )}
                      >
                        <Image
                          src={form.watch("images")[index]}
                          alt={`Thumbnail ${index}`}
                          width={1000}
                          height={1000}
                          className="rounded-xl object-cover"
                          style={{ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE }}
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="h-20 w-20 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50"
                      >
                        <ImageIcon size={24} color="#FF5A5F" />
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
          <div className="border-t border-gray-200 px-6 py-4" style={{ backdropFilter: "blur(8px)" }}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.push("/dashboard/cars/new/ownership")}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </button>
              <button
                onClick={() => saveForm(form.getValues())}
                disabled={!form.watch("images")?.length || uploadMutation.isPending || isSaving}
                className={cn(
                  "flex items-center justify-center rounded-full px-6 py-3",
                  !form.watch("images")?.length ? "bg-gray-200" : "bg-primary text-white"
                )}
              >
                {uploadMutation.isPending || isSaving ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
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
                    {uploadMutation.isPending ? "Uploading..." : "Saving..."}
                  </div>
                ) : (
                  <span className="text-lg font-semibold">
                    {!form.watch("images")?.length ? "Add at least one photo" : "Next"}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
