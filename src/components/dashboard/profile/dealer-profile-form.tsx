"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { createDealerProfile, updateDealerProfile } from "@/lib/profile-actions"
import { type DealerProfile, dealerProfileSchema } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { User, Upload, Phone, Mail, Calendar, Linkedin, Twitter, X, Plus } from "lucide-react"
import Image from "next/image"

interface DealerProfileFormProps {
  profile?: DealerProfile
  isEdit?: boolean
}

export function DealerProfileForm({ profile, isEdit = false }: DealerProfileFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar || null)
  const [language, setLanguage] = useState("")
  const [specialty, setSpecialty] = useState("")

  const avatarFileRef = useRef<HTMLInputElement>(null)

  const form = useForm<DealerProfile>({
    resolver: zodResolver(dealerProfileSchema),
    defaultValues: profile || {
      name: "",
      position: "",
      bio: "",
      email: "",
      phone: "",
      languages: [],
      specialties: [],
      yearsOfExperience: 0,
      socialMedia: {
        linkedin: "",
        twitter: "",
      },
    },
  })

  const createMutation = useMutation({
    mutationFn: ({
      data,
      avatarFile,
    }: {
      data: Omit<DealerProfile, "id">
      avatarFile?: File
    }) => createDealerProfile(data, avatarFile),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Dealer profile created successfully",
      })
      router.push("/dashboard/profile")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create dealer profile",
        variant: "destructive",
      })
      setIsSubmitting(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
      avatarFile,
    }: {
      id: string
      data: Partial<DealerProfile>
      avatarFile?: File
    }) => updateDealerProfile(id, data, avatarFile),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Dealer profile updated successfully",
      })
      router.push("/dashboard/profile")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update dealer profile",
        variant: "destructive",
      })
      setIsSubmitting(false)
    },
  })

  const onSubmit = async (data: DealerProfile) => {
    setIsSubmitting(true)

    const avatarFile = avatarFileRef.current?.files?.[0]

    if (isEdit && profile?.id) {
      updateMutation.mutate({
        id: profile.id,
        data,
        avatarFile,
      })
    } else {
      createMutation.mutate({
        data,
        avatarFile,
      })
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addLanguage = () => {
    if (language.trim() && !form.getValues().languages.includes(language.trim())) {
      const currentLanguages = form.getValues().languages
      form.setValue("languages", [...currentLanguages, language.trim()])
      setLanguage("")
    }
  }

  const removeLanguage = (lang: string) => {
    const currentLanguages = form.getValues().languages
    form.setValue(
      "languages",
      currentLanguages.filter((l) => l !== lang),
    )
  }

  const addSpecialty = () => {
    if (specialty.trim() && !form.getValues().specialties.includes(specialty.trim())) {
      const currentSpecialties = form.getValues().specialties
      form.setValue("specialties", [...currentSpecialties, specialty.trim()])
      setSpecialty("")
    }
  }

  const removeSpecialty = (spec: string) => {
    const currentSpecialties = form.getValues().specialties
    form.setValue(
      "specialties",
      currentSpecialties.filter((s) => s !== spec),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Dealer Profile" : "Create Dealer Profile"}</CardTitle>
        <CardDescription>Manage your personal profile information that will be displayed to customers</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <FormLabel>Profile Picture</FormLabel>
                <div className="mt-2 flex flex-col items-center gap-4">
                  {avatarPreview ? (
                    <div className="relative w-40 h-40 rounded-full overflow-hidden">
                      <Image
                        src={avatarPreview || "/placeholder.svg"}
                        alt="Profile Picture"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-full flex items-center justify-center bg-muted">
                      <User className="h-20 w-20 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      ref={avatarFileRef}
                      onChange={handleAvatarChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <Button type="button" variant="outline" onClick={() => avatarFileRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      {avatarPreview ? "Change Picture" : "Upload Picture"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Sales Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell customers about yourself, your experience, and expertise"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief professional description that highlights your strengths and experience.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input placeholder="john.doe@example.com" className="rounded-l-none" {...field} />
                      </div>
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
                      <div className="flex">
                        <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input placeholder="+1 (555) 123-4567" className="rounded-l-none" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          type="number"
                          min="0"
                          placeholder="5"
                          className="rounded-l-none"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.watch("languages").map((lang, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {lang}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(lang)} />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addLanguage()
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={addLanguage}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription>Languages you speak fluently</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialties</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.watch("specialties").map((spec, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {spec}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeSpecialty(spec)} />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSpecialty()
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={addSpecialty}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription>
                      Your areas of expertise (e.g., Luxury Cars, SUVs, Electric Vehicles)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="socialMedia.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input placeholder="https://linkedin.com/in/johndoe" className="rounded-l-none" {...field} />
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
                    <FormLabel>Twitter Profile</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0">
                          <Twitter className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input placeholder="https://twitter.com/johndoe" className="rounded-l-none" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pb-0 pt-6">
              <div className="flex justify-between w-full">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/profile")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : isEdit ? "Update Profile" : "Create Profile"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

