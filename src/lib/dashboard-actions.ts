"use server"

import {  Query } from "node-appwrite"
import { formatDistanceToNow } from "date-fns"
import { callbackscollectionid, database } from "./appwrite-config"
import { callbacksCollectionId, carinfocollectionId, databaseId, messagesCollectionId, reviewsCollectionId, testDrivesCollectionId } from "./constants"

// Initialize Appwrite




// Dashboard Overview Stats
export async function getDashboardStats() {
  try {
    // Get total cars
    const totalCars = await database.listDocuments(databaseId, carinfocollectionId, [Query.limit(1)])

    // Get total cars by condition
    const newCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("condition", "New"),
      Query.limit(1),
    ])

    const usedCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("condition", "Used"),
      Query.limit(1),
    ])

    // Get total callbacks
    const totalCallbacks = await database.listDocuments(databaseId, callbacksCollectionId, [Query.limit(1)])

    // Get total messages
    const totalMessages = await database.listDocuments(databaseId, messagesCollectionId, [Query.limit(1)])

    // Get total test drives
    const totalTestDrives = await database.listDocuments(databaseId, testDrivesCollectionId, [Query.limit(1)])

    // Get total reviews
    const totalReviews = await database.listDocuments(databaseId, reviewsCollectionId, [Query.limit(1)])

    return {
      totalCars: totalCars.total,
      newCars: newCars.total,
      usedCars: usedCars.total,
      totalCallbacks: totalCallbacks.total,
      totalMessages: totalMessages.total,
      totalTestDrives: totalTestDrives.total,
      totalReviews: totalReviews.total,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return {
      totalCars: 0,
      newCars: 0,
      usedCars: 0,
      totalCallbacks: 0,
      totalMessages: 0,
      totalTestDrives: 0,
      totalReviews: 0,
    }
  }
}

// Get Inventory Distribution
export async function getInventoryDistribution() {
  try {
    // Get cars by category
    const luxuryCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("category", "luxury"),
      Query.limit(1),
    ])

    const sportsCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("category", "sports"),
      Query.limit(1),
    ])

    const familyCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("category", "family"),
      Query.limit(1),
    ])

    const ecoFriendlyCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("category", "eco-friendly"),
      Query.limit(1),
    ])

    const commercialCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("commercial", true),
      Query.limit(1),
    ])

    const budgetCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("category", "budget"),
      Query.limit(1),
    ])

    return [
      { name: "Luxury", value: luxuryCars.total },
      { name: "Sports", value: sportsCars.total },
      { name: "Family", value: familyCars.total },
      { name: "Eco-Friendly", value: ecoFriendlyCars.total },
      { name: "Commercial", value: commercialCars.total },
      { name: "Budget", value: budgetCars.total },
    ]
  } catch (error) {
    console.error("Error fetching inventory distribution:", error)
    return [
      { name: "Luxury", value: 0 },
      { name: "Sports", value: 0 },
      { name: "Family", value: 0 },
      { name: "Eco-Friendly", value: 0 },
      { name: "Commercial", value: 0 },
      { name: "Budget", value: 0 },
    ]
  }
}

// Get Monthly Inquiries
export async function getMonthlyInquiries() {
  try {
    const currentDate = new Date()
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Generate last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date()
      d.setMonth(currentDate.getMonth() - i)
      return {
        name: monthNames[d.getMonth()],
        month: d.getMonth(),
        year: d.getFullYear(),
      }
    }).reverse()

    // Mock data for now - in a real app you would query by date ranges
    return months.map((month) => ({
      name: month.name,
      callbacks: Math.floor(Math.random() * 30) + 5,
      messages: Math.floor(Math.random() * 50) + 10,
      testDrives: Math.floor(Math.random() * 20) + 3,
    }))
  } catch (error) {
    console.error("Error fetching monthly inquiries:", error)
    return []
  }
}

// Get Recent Activities
export async function getRecentActivities(limit = 5) {
  try {
    // Get recent callbacks
    const recentCallbacks = await database.listDocuments(databaseId, callbackscollectionid, [
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
    ])

    // Get recent messages
    const recentMessages = await database.listDocuments(databaseId,  messagesCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
    ])

    // Get recent test drives
    const recentTestDrives = await database.listDocuments(databaseId, testDrivesCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
    ])

    // Get recent reviews
    const recentReviews = await database.listDocuments(databaseId, reviewsCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
    ])

    // Format callbacks
    const callbacks = recentCallbacks.documents.map((callback) => ({
      id: callback.$id,
      type: "callback",
      title: `Callback request from ${callback.customerName}`,
      description: `For ${callback.carTitle || "a vehicle"}`,
      time: formatDistanceToNow(new Date(callback.$createdAt), { addSuffix: true }),
      status: callback.status,
    }))

    // Format messages
    const messages = recentMessages.documents.map((message) => ({
      id: message.$id,
      type: "message",
      title: `Message from ${message.senderName}`,
      description: message.subject,
      time: formatDistanceToNow(new Date(message.$createdAt), { addSuffix: true }),
      status: message.isRead ? "read" : "unread",
    }))

    // Format test drives
    const testDrives = recentTestDrives.documents.map((testDrive) => ({
      id: testDrive.$id,
      type: "test-drive",
      title: `Test drive by ${testDrive.customerName}`,
      description: `For ${testDrive.carTitle || "a vehicle"}`,
      time: formatDistanceToNow(new Date(testDrive.$createdAt), { addSuffix: true }),
      status: testDrive.status,
    }))

    // Format reviews
    const reviews = recentReviews.documents.map((review) => ({
      id: review.$id,
      type: "review",
      title: `Review by ${review.reviewerName}`,
      description: `${review.rating}/5 stars`,
      time: formatDistanceToNow(new Date(review.$createdAt), { addSuffix: true }),
      status: "published",
    }))

    // Combine and sort by date
    const allActivities = [...callbacks, ...messages, ...testDrives, ...reviews]
      .sort((a, b) => {
        const timeA = new Date(a.time).getTime()
        const timeB = new Date(b.time).getTime()
        return timeB - timeA
      })
      .slice(0, limit)

    return allActivities
  } catch (error) {
    console.error("Error fetching recent activities:", error)
    return []
  }
}

// Get Top Performing Cars
export async function getTopPerformingCars(limit = 5) {
  try {
    // In a real app, you would calculate this based on inquiries, views, etc.
    // For now, we'll just get some featured cars
    const topCars = await database.listDocuments(databaseId, carinfocollectionId, [
      Query.equal("featured", true),
      Query.limit(limit),
    ])

    return topCars.documents.map((car) => ({
      id: car.$id,
      title: car.title || `${car.car_make?.name || ""} ${car.car_model || ""}`,
      image: car.images?.[0] || "/placeholder.svg?height=100&width=200",
      inquiries: Math.floor(Math.random() * 50) + 10, // Mock data
      views: Math.floor(Math.random() * 500) + 100, // Mock data
      testDrives: Math.floor(Math.random() * 20) + 5, // Mock data
    }))
  } catch (error) {
    console.error("Error fetching top performing cars:", error)
    return []
  }
}

// Get Sales Performance
export async function getSalesPerformance() {
  // Mock data for sales performance
  const currentYear = new Date().getFullYear()

  return [
    { name: "Jan", target: 50, actual: 65 },
    { name: "Feb", target: 60, actual: 55 },
    { name: "Mar", target: 70, actual: 80 },
    { name: "Apr", target: 80, actual: 90 },
    { name: "May", target: 90, actual: 85 },
    { name: "Jun", target: 100, actual: 110 },
    { name: "Jul", target: 110, actual: 100 },
    { name: "Aug", target: 120, actual: 130 },
    { name: "Sep", target: 130, actual: 120 },
    { name: "Oct", target: 140, actual: 145 },
    { name: "Nov", target: 150, actual: 140 },
    { name: "Dec", target: 160, actual: 170 },
  ]
}

