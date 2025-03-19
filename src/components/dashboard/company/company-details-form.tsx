"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { updateCompanyDetails, createCompanyDetails } from "@/lib/company-actions"
import { type CompanyDetails, companyDetailsSchema } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Building, Upload, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import Image from "next/image"

interface CompanyDetailsFormProps {
  companyDetails?: CompanyDetails
  isEdit?: boolean
}

export function CompanyDetailsForm({ companyDetails, isEdit = false }: CompanyDetailsFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(companyDetails?.logo || null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(companyDetails?.coverImage || null)

  const logoFileRef = useRef<HTMLInputElement>(null)
  const coverImageFileRef = useRef<HTMLInputElement>(null)

  const form = useForm<CompanyDetails>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: companyDetails || {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      website: "",
      openingHours: [
        { day: "Monday", open: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Tuesday", open: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Wednesday", open: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Thursday", open: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Friday", open: true, openTime: "09:00", closeTime: "18:00" },
        { day: "Saturday", open: true, openTime: "10:00", closeTime: "16:00" },
        { day: "Sunday", open: false, openTime: "", closeTime: "" },
      ],
      socialMedia: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
      },
    },
  })

  const createMutation = useMutation({
    mutationFn: ({
      data,
      logoFile,
      coverImageFile,
    }: {
      data: Omit<CompanyDetails, "id">
      logoFile?: File
      coverImageFile?: File
    }) => createCompanyDetails(data, logoFile, coverImageFile),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Company details created successfully",
      })
      router.push("/dashboard/company")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create company details",
        variant: "destructive",
      })
      setIsSubmitting(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
      logoFile,
      coverImageFile,
    }: {
      id: string
      data: Partial<CompanyDetails>
      logoFile?: File
      coverImageFile?: File
    }) => updateCompanyDetails(id, data, logoFile, coverImageFile),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Company details updated successfully",
      })
      router.push("/dashboard/company")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update company details",
        variant: "destructive",
      })
      setIsSubmitting(false)
    },
  })

  const onSubmit = async (data: CompanyDetails) => {
    setIsSubmitting(true)

    const logoFile = logoFileRef.current?.files?.[0]
    const coverImageFile = coverImageFileRef.current?.files?.[0]

    if (isEdit && companyDetails?.id) {
      updateMutation.mutate({
        id: companyDetails.id,
        data,
        logoFile,
        coverImageFile,
      })
    } else {
      createMutation.mutate({
        data,
        logoFile,
        coverImageFile,
      })
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Company Details" : "Create Company Profile"}</CardTitle>
        <CardDescription>Manage your dealership information that will be displayed to customers</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="contact">Contact & Location</TabsTrigger>
            <TabsTrigger value="hours">Opening Hours</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="basic" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Dealership Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell customers about your dealership"
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a detailed description of your dealership, services, and unique selling points.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormLabel>Company Logo</FormLabel>
                    <div className="mt-2 flex flex-col items-center gap-4">
                      {logoPreview ? (
                        <div className="relative w-40 h-40 border rounded-md overflow-hidden">
                          <Image
                            src={logoPreview || "/placeholder.svg"}
                            alt="Company Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-40 h-40 border rounded-md flex items-center justify-center bg-muted">
                          <Building className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          ref={logoFileRef}
                          onChange={handleLogoChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <Button type="button" variant="outline" onClick={() => logoFileRef.current?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          {logoPreview ? "Change Logo" : "Upload Logo"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <FormLabel>Cover Image</FormLabel>
                    <div className="mt-2 flex flex-col items-center gap-4">
                      {coverImagePreview ? (
                        <div className="relative w-full h-40 border rounded-md overflow-hidden">
                          <Image
                            src={coverImagePreview || "/placeholder.svg"}
                            alt="Cover Image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-40 border rounded-md flex items-center justify-center bg-muted">
                          <Building className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          ref={coverImageFileRef}
                          onChange={handleCoverImageChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <Button type="button" variant="outline" onClick={() => coverImageFileRef.current?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          {coverImagePreview ? "Change Cover Image" : "Upload Cover Image"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@yourdealership.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.yourdealership.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="hours" className="space-y-6 pt-4">
                <div className="space-y-4">
                  <Accordion
                    type="multiple"
                    defaultValue={["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]}
                  >
                    {form.watch("openingHours")?.map((_, index) => (
                      <AccordionItem key={index} value={form.watch(`openingHours.${index}.day`).toLowerCase()}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{form.watch(`openingHours.${index}.day`)}</span>
                            {form.watch(`openingHours.${index}.open`) ? (
                              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800">
                                Open
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="ml-2 bg-red-100 text-red-800">
                                Closed
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <FormField
                              control={form.control}
                              name={`openingHours.${index}.open`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel>Open on {form.watch(`openingHours.${index}.day`)}</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            {form.watch(`openingHours.${index}.open`) && (
                              <>
                                <FormField
                                  control={form.control}
                                  name={`openingHours.${index}.openTime`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Opening Time</FormLabel>
                                      <FormControl>
                                        <Input type="time" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`openingHours.${index}.closeTime`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Closing Time</FormLabel>
                                      <FormControl>
                                        <Input type="time" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="socialMedia.facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                              <Facebook className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              placeholder="https://facebook.com/yourdealership"
                              className="rounded-l-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialMedia.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                              <Twitter className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              placeholder="https://twitter.com/yourdealership"
                              className="rounded-l-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialMedia.instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                              <Instagram className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              placeholder="https://instagram.com/yourdealership"
                              className="rounded-l-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialMedia.linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                              <Linkedin className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              placeholder="https://linkedin.com/company/yourdealership"
                              className="rounded-l-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialMedia.youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                              <Youtube className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              placeholder="https://youtube.com/c/yourdealership"
                              className="rounded-l-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <CardFooter className="px-0 pt-6">
                <div className="flex justify-between w-full">
                  <Button type="button" variant="outline" onClick={() => router.push("/dashboard/company")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : isEdit ? "Update Company Details" : "Create Company Profile"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

