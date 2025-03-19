"use client"

import type { DealerProfile } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Languages, Award, Calendar, Linkedin, Twitter, Edit, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { deleteDealerProfile } from "@/lib/profile-actions"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface DealerProfileCardProps {
  profile: DealerProfile
}

export function DealerProfileCard({ profile }: DealerProfileCardProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const deleteMutation = useMutation({
    mutationFn: deleteDealerProfile,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile deleted successfully",
      })
      router.refresh()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete profile",
        variant: "destructive",
      })
    },
  })

  const handleDelete = () => {
    if (profile.id) {
      deleteMutation.mutate(profile.id)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
        {profile.avatar && (
          <div className="absolute -bottom-16 left-6">
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <Image src={profile.avatar || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
            </div>
          </div>
        )}
      </div>

      <CardHeader className={profile.avatar ? "pt-20" : "pt-6"}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
            <CardDescription>{profile.position}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/profile/${profile.id}/edit`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Profile</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this profile? This action cannot be undone.
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
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{profile.yearsOfExperience} years of experience</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Bio</h3>
          <p className="text-muted-foreground line-clamp-3">{profile.bio}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((language, index) => (
              <Badge key={index} variant="secondary">
                {language}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Specialties</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-6">
        <div className="flex gap-4 w-full">
          {profile.socialMedia.linkedin && (
            <a
              href={profile.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {profile.socialMedia.twitter && (
            <a
              href={profile.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

