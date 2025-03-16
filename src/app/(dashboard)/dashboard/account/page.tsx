"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Car,
  CreditCard,
  Heart,
  History,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Calendar,
  MapPin,
  Edit,
  Trash,
  ChevronRight,
  Clock,
  AlertCircle,
  Eye,
} from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+44 7700 900123",
    address: "123 Main Street, London, UK",
    avatar: "/placeholder.svg?height=200&width=200",
    memberSince: "March 2023",
    savedCars: 12,
    testDrives: 3,
    messages: 5,
  }

  // Mock saved cars
  const savedCars = [
    {
      id: "1",
      title: "BMW 3 Series",
      image: "/placeholder.svg?height=300&width=500",
      price: "£35,000",
      year: "2023",
      mileage: "5,000 miles",
      location: "London",
      saved: "2 days ago",
    },
    {
      id: "2",
      title: "Audi A4",
      image: "/placeholder.svg?height=300&width=500",
      price: "£32,500",
      year: "2022",
      mileage: "15,000 miles",
      location: "Manchester",
      saved: "1 week ago",
    },
    {
      id: "3",
      title: "Mercedes C-Class",
      image: "/placeholder.svg?height=300&width=500",
      price: "£38,750",
      year: "2023",
      mileage: "3,000 miles",
      location: "Birmingham",
      saved: "3 weeks ago",
    },
  ]

  // Mock recent activity
  const recentActivity = [
    {
      id: "1",
      type: "message",
      title: "New message from BMW Manchester",
      description: "Regarding your inquiry about the BMW 3 Series",
      date: "Today, 10:23 AM",
      icon: MessageSquare,
    },
    {
      id: "2",
      type: "test-drive",
      title: "Test drive scheduled",
      description: "Audi A4 at Audi London on March 18, 2025",
      date: "Yesterday, 3:45 PM",
      icon: Calendar,
    },
    {
      id: "3",
      type: "saved",
      title: "Car saved to favorites",
      description: "Mercedes C-Class (2023)",
      date: "March 15, 2025",
      icon: Heart,
    },
    {
      id: "4",
      type: "viewed",
      title: "Car viewed",
      description: "Volkswagen Golf GTI (2022)",
      date: "March 14, 2025",
      icon: Eye,
    },
  ]

  // Mock upcoming test drives
  const upcomingTestDrives = [
    {
      id: "1",
      car: "Audi A4",
      dealer: "Audi London",
      date: "March 18, 2025",
      time: "10:00 AM",
      address: "123 Audi Drive, London",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "2",
      car: "BMW X5",
      dealer: "BMW Manchester",
      date: "March 25, 2025",
      time: "2:30 PM",
      address: "456 BMW Avenue, Manchester",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  // Mock messages
  const messages = [
    {
      id: "1",
      from: "BMW Manchester",
      subject: "Your inquiry about the BMW 3 Series",
      preview: "Thank you for your interest in the BMW 3 Series. We'd be happy to...",
      date: "Today, 10:23 AM",
      unread: true,
    },
    {
      id: "2",
      from: "Audi London",
      subject: "Test drive confirmation",
      preview: "We're looking forward to seeing you on March 18 for your test drive of the Audi A4...",
      date: "Yesterday, 3:45 PM",
      unread: false,
    },
    {
      id: "3",
      from: "Mercedes Birmingham",
      subject: "Special offer on the C-Class",
      preview: "We noticed you've been looking at the Mercedes C-Class. We currently have a special offer...",
      date: "March 15, 2025",
      unread: true,
    },
  ]

  // Mock search alerts
  const searchAlerts = [
    {
      id: "1",
      name: "BMW 3 Series under £40,000",
      criteria: "Make: BMW, Model: 3 Series, Max Price: £40,000",
      frequency: "Daily",
      created: "March 10, 2025",
    },
    {
      id: "2",
      name: "Electric SUVs in London",
      criteria: "Type: SUV, Fuel: Electric, Location: London",
      frequency: "Weekly",
      created: "February 28, 2025",
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-3xl font-bold">My Account</h1>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-1">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-5 w-5" />
              Profile
            </Button>
            <Button
              variant={activeTab === "saved-cars" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("saved-cars")}
            >
              <Heart className="mr-2 h-5 w-5" />
              Saved Cars
              <Badge className="ml-auto">{user.savedCars}</Badge>
            </Button>
            <Button
              variant={activeTab === "test-drives" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("test-drives")}
            >
              <Car className="mr-2 h-5 w-5" />
              Test Drives
              <Badge className="ml-auto">{user.testDrives}</Badge>
            </Button>
            <Button
              variant={activeTab === "messages" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Messages
              <Badge className="ml-auto">{user.messages}</Badge>
            </Button>
            <Button
              variant={activeTab === "search-alerts" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("search-alerts")}
            >
              <Bell className="mr-2 h-5 w-5" />
              Search Alerts
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("history")}
            >
              <History className="mr-2 h-5 w-5" />
              History
            </Button>
            <Button
              variant={activeTab === "payment" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("payment")}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Payment Methods
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={user.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={user.address} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions on KashiAndKarz</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start space-x-4">
                          <div className="rounded-full bg-muted p-2">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Saved Cars Tab */}
          {activeTab === "saved-cars" && (
            <Card>
              <CardHeader>
                <CardTitle>Saved Cars</CardTitle>
                <CardDescription>Manage your saved vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedCars.map((car) => (
                    <div key={car.id} className="flex flex-col overflow-hidden rounded-lg border sm:flex-row">
                      <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                        <Image src={car.image || "/placeholder.svg"} alt={car.title} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-semibold">{car.title}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash className="h-5 w-5" />
                            </Button>
                          </div>
                          <p className="text-xl font-bold text-primary">{car.price}</p>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {car.year}
                            </div>
                            <div className="flex items-center">
                              <Car className="mr-1 h-4 w-4" />
                              {car.mileage}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              {car.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              Saved {car.saved}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Compare
                          </Button>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Trash className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
                <Button>Find More Cars</Button>
              </CardFooter>
            </Card>
          )}

          {/* Test Drives Tab */}
          {activeTab === "test-drives" && (
            <Card>
              <CardHeader>
                <CardTitle>Test Drives</CardTitle>
                <CardDescription>Manage your scheduled test drives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Upcoming Test Drives</h3>
                  <div className="space-y-4">
                    {upcomingTestDrives.map((testDrive) => (
                      <div key={testDrive.id} className="overflow-hidden rounded-lg border">
                        <div className="grid md:grid-cols-[1fr_2fr]">
                          <div className="relative h-48">
                            <Image
                              src={testDrive.image || "/placeholder.svg"}
                              alt={testDrive.car}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="mb-4 flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-semibold">{testDrive.car}</h4>
                                <p className="text-muted-foreground">{testDrive.dealer}</p>
                              </div>
                              <Badge className="bg-primary">Confirmed</Badge>
                            </div>
                            <div className="grid gap-2 text-sm md:grid-cols-2">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                {testDrive.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                {testDrive.time}
                              </div>
                              <div className="flex items-center md:col-span-2">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                {testDrive.address}
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button variant="destructive" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <h3 className="mb-2 text-lg font-medium">Looking for more cars?</h3>
                    <p className="mb-4 text-muted-foreground">Find your perfect car and schedule a test drive today.</p>
                    <Button>Browse Cars</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Manage your conversations with dealers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-4 rounded-lg border p-4 ${
                        message.unread ? "bg-muted/50" : ""
                      }`}
                    >
                      <Avatar>
                        <AvatarFallback>{message.from.split(" ")[0][0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{message.from}</h4>
                          <span className="text-xs text-muted-foreground">{message.date}</span>
                        </div>
                        <p className="font-medium">{message.subject}</p>
                        <p className="text-sm text-muted-foreground">{message.preview}</p>
                      </div>
                      {message.unread && <div className="flex h-2 w-2 rounded-full bg-primary"></div>}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Messages
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Search Alerts Tab */}
          {activeTab === "search-alerts" && (
            <Card>
              <CardHeader>
                <CardTitle>Search Alerts</CardTitle>
                <CardDescription>Get notified when new cars match your criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    {searchAlerts.map((alert) => (
                      <div key={alert.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-start justify-between">
                          <h4 className="font-medium">{alert.name}</h4>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.criteria}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{alert.frequency} updates</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Created on {alert.created}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <h3 className="mb-2 text-lg font-medium">Create a New Alert</h3>
                    <p className="mb-4 text-muted-foreground">
                      Set up alerts to be notified when new cars match your criteria.
                    </p>
                    <Button>Create Alert</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new features and special offers
                        </p>
                      </div>
                      <Switch id="marketing-emails" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-sharing">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to share your data with trusted partners
                        </p>
                      </div>
                      <Switch id="data-sharing" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="analytics">Analytics</Label>
                        <p className="text-sm text-muted-foreground">Help us improve by allowing analytics cookies</p>
                      </div>
                      <Switch id="analytics" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-destructive/10 bg-destructive/5 p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium text-destructive">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm" className="mt-2">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

