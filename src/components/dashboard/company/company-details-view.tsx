"use client"

import type { CompanyDetails } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Edit,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CompanyDetailsViewProps {
  companyDetails: CompanyDetails
}

export function CompanyDetailsView({ companyDetails }: CompanyDetailsViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Company Details</h2>
        <Button asChild>
          <Link href="/dashboard/company/edit">
            <Edit className="h-4 w-4 mr-2" />
            Edit Company Details
          </Link>
        </Button>
      </div>

      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        {companyDetails.coverImage ? (
          <Image
            src={companyDetails.coverImage || "/placeholder.svg"}
            alt={companyDetails.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Building className="h-24 w-24 text-muted-foreground" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex items-center gap-4">
            {companyDetails.logo && (
              <div className="relative w-20 h-20 rounded-md overflow-hidden bg-white">
                <Image
                  src={companyDetails.logo || "/placeholder.svg"}
                  alt={companyDetails.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{companyDetails.name}</h1>
              <p className="text-white/80">
                {companyDetails.city}, {companyDetails.state}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact & Location</TabsTrigger>
          <TabsTrigger value="hours">Opening Hours</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>About {companyDetails.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{companyDetails.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companyDetails.socialMedia.facebook && (
                  <a
                    href={companyDetails.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span>Facebook</span>
                  </a>
                )}

                {companyDetails.socialMedia.twitter && (
                  <a
                    href={companyDetails.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <span>Twitter</span>
                  </a>
                )}

                {companyDetails.socialMedia.instagram && (
                  <a
                    href={companyDetails.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                )}

                {companyDetails.socialMedia.linkedin && (
                  <a
                    href={companyDetails.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-blue-700" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {companyDetails.socialMedia.youtube && (
                  <a
                    href={companyDetails.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors"
                  >
                    <Youtube className="h-5 w-5 text-red-600" />
                    <span>YouTube</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p>{companyDetails.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p>{companyDetails.email}</p>
                  </div>
                </div>

                {companyDetails.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <a
                        href={companyDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {companyDetails.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Address</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p>
                      {companyDetails.address}
                      <br />
                      {companyDetails.city}, {companyDetails.state} {companyDetails.postalCode}
                      <br />
                      {companyDetails.country}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80 bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Map integration would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Opening Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companyDetails.openingHours.map((day, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{day.day}</span>
                    </div>
                    {day.open ? (
                      <div className="flex items-center gap-2">
                        <span>
                          {day.openTime} - {day.closeTime}
                        </span>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Open
                        </Badge>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800">
                        Closed
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

