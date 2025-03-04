"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { savePhotoVideo } from "@/lib/actions"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime"]

const formSchema = z.object({
  "front-view": z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .png, and .webp formats are supported."),
  "rear-view": z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .png, and .webp formats are supported."),
  "left-side-view": z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .png, and .webp formats are supported."),
  "right-side-view": z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .png, and .webp formats are supported."),
  "interior-photos": z
    .array(z.any())
    .refine((files) => files.every((file) => file?.size <= MAX_FILE_SIZE), `Max image size is 5MB.`)
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
      "Only .jpg, .png, and .webp formats are supported.",
    ),
  "engine-bay-photo": z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .png, and .webp formats are supported."),
  video: z
    .any()
    .optional()
    .refine((file) => !file || file?.size <= 50 * 1024 * 1024, `Max video size is 50MB.`)
    .refine((file) => !file || ACCEPTED_VIDEO_TYPES.includes(file?.type), "Only .mp4 and .mov formats are supported."),
})

type FormValues = z.infer<typeof formSchema>

export default function PhotoVideoUploadForm() {
  const router = useRouter()
  const [previews, setPreviews] = useState<{ [key: string]: string }>({})

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "front-view": null,
      "rear-view": null,
      "left-side-view": null,
      "right-side-view": null,
      "interior-photos": [],
      "engine-bay-photo": null,
      video: null,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      await savePhotoVideo(data as any) // Type assertion needed due to File type
    },
    onSuccess: () => {
      router.push("/sell-car/step-7")
    },
  })

  const onDrop = useCallback(
    (acceptedFiles: File[], fieldName: string) => {
      if (fieldName === "interior-photos") {
        form.setValue(fieldName, acceptedFiles)
        const newPreviews = acceptedFiles.reduce(
          (acc, file) => {
            acc[`${fieldName}-${file.name}`] = URL.createObjectURL(file)
            return acc
          },
          {} as { [key: string]: string },
        )
        setPreviews((prev) => ({ ...prev, ...newPreviews }))
      } else {
        form.setValue(fieldName as keyof FormValues, acceptedFiles[0])
        setPreviews((prev) => ({ ...prev, [fieldName]: URL.createObjectURL(acceptedFiles[0]) }))
      }
    },
    [form],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "interior-photos"),
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    multiple: true,
  })

  function onSubmit(data: FormValues) {
    mutate(data)
  }

  const removeFile = (fieldName: keyof FormValues, fileName?: string) => {
    if (fieldName === "interior-photos" && fileName) {
      const updatedFiles = (form.getValues("interior-photos") as File[]).filter((file: File) => file.name !== fileName)
      form.setValue("interior-photos", updatedFiles)
      setPreviews((prev) => {
        const { [`${fieldName}-${fileName}`]: removed, ...rest } = prev
        return rest
      })
    } else {
      form.setValue(fieldName, null)
      setPreviews((prev) => {
        const { [fieldName]: removed, ...rest } = prev
        return rest
      })
    }
  }

  const singleImageFields: (keyof FormValues)[] = [
    "front-view",
    "rear-view",
    "left-side-view",
    "right-side-view",
    "engine-bay-photo",
  ]

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-background to-muted/50 shadow-lg">
      <CardHeader className="space-y-1 bg-muted/30 px-6 py-5">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-primary/10 p-1.5">
            <ImageIcon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Upload Photos & Video</CardTitle>
        </div>
        <CardDescription>Add photos and an optional video of your vehicle to attract potential buyers</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {singleImageFields.map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="text-base capitalize">{field.replace(/-/g, " ")} Photo</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor={field}
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70"
                          >
                            {previews[field] ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={previews[field] || "/placeholder.svg"}
                                  alt={field}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                  onClick={() => removeFile(field)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <ImageIcon className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB)</p>
                              </div>
                            )}
                            <input
                              id={field}
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  onChange(file)
                                  setPreviews((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }))
                                }
                              }}
                              accept="image/jpeg,image/png,image/webp"
                              {...rest}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <FormField
              control={form.control}
              name="interior-photos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Interior Photos</FormLabel>
                  <FormDescription>
                    Upload multiple photos of the interior (dashboard, seats, boot, etc.)
                  </FormDescription>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70"
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 5MB each)</p>
                      </div>
                    </div>
                  </FormControl>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {field.value.map((file: File, index: number) => (
                      <div key={index} className="relative">
                        <img
                          src={previews[`interior-photos-${file.name || "/placeholder.svg"}`] || "/placeholder.svg"}
                          alt={`Interior ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeFile("interior-photos", file.name)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="video"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel className="text-base">Video (Optional)</FormLabel>
                  <FormDescription>Upload a video showcasing your vehicle (max 50MB)</FormDescription>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="video"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70"
                      >
                        {previews.video ? (
                          <div className="relative w-full h-full">
                            <video src={previews.video} controls className="w-full h-full object-cover rounded-lg" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => removeFile("video")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">MP4 or MOV (MAX. 50MB)</p>
                          </div>
                        )}
                        <input
                          id="video"
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              onChange(file)
                              setPreviews((prev) => ({ ...prev, video: URL.createObjectURL(file) }))
                            }
                          }}
                          accept="video/mp4,video/quicktime"
                          {...rest}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/20 px-6 py-4">
        <Button variant="outline" onClick={() => router.push("/sell-car/step-5")} className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        >
          {isPending ? "Saving..." : "Continue"}
          {!isPending && <ChevronRight className="h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}

