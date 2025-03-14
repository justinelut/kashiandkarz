"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { ChevronRight, CloudUpload, Loader2, Trash2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateCarPhotos, deleteCarPhoto } from "@/lib/photo-actions";
import { CarInfo } from "@/types/types";

interface EditPhotosFormProps {
  car: CarInfo & { $id: string; images?: Array<{ $id: string; url: string }> };
}

// Validation schema for file uploads
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z.object({
  files: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Please select at least one image file.")
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      `Max file size is 5MB.`
    )
    .refine(
      (files) => Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png, and .webp files are accepted."
    ),
});

export default function EditPhotosForm({ car }: EditPhotosFormProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);

  // Current car images
  const carImages = car.images || [];

  // Handle file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files) {
      try {
        // Validate files
        fileSchema.parse({ files });
        
        // Set selected files for upload
        setSelectedFiles(files);

        // Create preview images
        const imagePreviews: string[] = [];
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === "string") {
              imagePreviews.push(e.target.result);
              setPreviewImages([...imagePreviews]);
            }
          };
          reader.readAsDataURL(file);
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast.error("File validation error", {
            description: error.errors[0].message,
          });
        } else {
          toast.error("An error occurred while processing files");
        }
        // Clear the file input
        e.target.value = "";
        setSelectedFiles(null);
        setPreviewImages([]);
      }
    }
  };

  // Clear selected files
  const clearSelectedFiles = () => {
    setSelectedFiles(null);
    setPreviewImages([]);
    // Also clear the file input if we can access it
    const fileInput = document.getElementById("photo-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // Handle file upload
  const { mutate: uploadPhotos, isPending: isUploadPending } = useMutation({
    mutationFn: async () => {
      if (!selectedFiles || selectedFiles.length === 0) {
        throw new Error("No files selected");
      }

      setIsUploading(true);

      // Create FormData and append files
      const formData = new FormData();
      formData.append("car_id", car.$id);
      
      Array.from(selectedFiles).forEach((file, index) => {
        formData.append(`photo_${index}`, file);
      });

      // Upload to server
      const result = await updateCarPhotos(formData);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to upload photos");
      }
      
      return result;
    },
    onSuccess: () => {
      setIsDialogOpen(true);
      clearSelectedFiles();
      setIsUploading(false);
    },
    onError: (error: Error) => {
      toast.error("Error uploading photos", {
        description: error.message || "An error occurred while uploading photos.",
      });
      setIsUploading(false);
    },
  });

  // Handle photo deletion
  const { mutate: deletePhoto, isPending: isDeletePending } = useMutation({
    mutationFn: async (photoId: string) => {
      setDeletingPhotoId(photoId);
      
      // Delete photo from server
      const result = await deleteCarPhoto(car.$id, photoId);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to delete photo");
      }
      
      return result;
    },
    onSuccess: () => {
      toast.success("Photo deleted successfully");
      router.refresh();
      setDeletingPhotoId(null);
    },
    onError: (error: Error) => {
      toast.error("Error deleting photo", {
        description: error.message || "An error occurred while deleting the photo.",
      });
      setDeletingPhotoId(null);
    },
  });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Photos & Media</CardTitle>
          <CardDescription>
            Update the photos for this vehicle. You can upload new photos and delete existing ones.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Current Photos Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Photos</h3>
            {carImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {carImages.map((image: { $id: string; url: string }, index: number) => (
                  <div key={image.$id || index} className="relative group aspect-square rounded-md overflow-hidden border">
                    <Image
                      src={image.url}
                      alt={`Car photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deletePhoto(image.$id)}
                        disabled={isDeletePending && deletingPhotoId === image.$id}
                      >
                        {isDeletePending && deletingPhotoId === image.$id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-muted/20">
                <ImageIcon className="w-10 h-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">No photos available for this vehicle.</p>
              </div>
            )}
          </div>

          {/* Upload New Photos Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Upload New Photos</h3>
            <div className="border border-dashed rounded-lg p-10 flex flex-col items-center justify-center">
              <CloudUpload className="h-10 w-10 text-muted-foreground mb-4" />
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, WEBP. Max size: 5MB.
                </p>
              </div>
              <Label
                htmlFor="photo-upload"
                className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2"
              >
                <span>Select Files</span>
                <input
                  id="photo-upload"
                  name="photo-upload"
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="sr-only"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </Label>
            </div>

            {/* Preview Selected Files */}
            {previewImages.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Selected Photos ({previewImages.length})</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSelectedFiles}
                    disabled={isUploading}
                  >
                    Clear Selection
                  </Button>
                </div>
                <ScrollArea className="h-72 rounded-md border">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            type="button" 
            disabled={isUploading || isUploadPending}
            onClick={() => router.push(`/dashboard/cars/${car.$id}`)}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => uploadPhotos()}
            disabled={!selectedFiles || isUploading || isUploadPending}
          >
            {isUploading || isUploadPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                Upload Photos
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Photos Updated</DialogTitle>
            <DialogDescription>
              The car photos have been successfully updated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => {
                setIsDialogOpen(false);
                router.push(`/dashboard/cars/${car.$id}`);
                router.refresh();
              }}
            >
              View Car Details
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                router.push(`/dashboard/cars`);
                router.refresh();
              }}
            >
              Return to Cars List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
