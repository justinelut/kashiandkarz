"use server"

import { Query } from "appwrite"
import { database } from "./appwrite-config"

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!
const CARS_COLLECTION_ID = "67cf10af003268a33d9f"
const CALLBACK_COLLECTION_ID = "67d15fd400083417092d"
const MESSAGE_COLLECTION_ID = "67d15fc7003e6140fb31"
const TEST_DRIVE_COLLECTION_ID = "67d15fbb00268b54fd35"
const REVIEW_COLLECTION_ID = "67d2e79d003b3d7bf86d"

export type DashboardStats = {
  totalCars: number
  activeCars: number
  featuredCars: number
  totalCallbacks: number
  pendingCallbacks: number
  totalMessages: number
  unreadMessages: number
  totalTestDrives: number
  upcomingTestDrives: number
  totalReviews: number
  pendingReviews: number
  averageRating: number
}

export type ChartData = {
  label: string
  value: number
}

export type DashboardCharts = {
  carsByCategory: ChartData[]
  carsByMake: ChartData[]
  inquiriesByDay: ChartData[]
  testDrivesByDay: ChartData[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get cars stats
    const carsResponse = await database.listDocuments(DATABASE_ID, CARS_COLLECTION_ID, [Query.limit(0)])
    const activeCarsResponse = await database.listDocuments(DATABASE_ID, CARS_COLLECTION_ID, [
      Query.equal("availability", true),
      Query.limit(0),
    ])
    const featuredCarsResponse = await database.listDocuments(DATABASE_ID, CARS_COLLECTION_ID, [
      Query.equal("featured", true),
      Query.limit(0),
    ])

    // Get callbacks stats
    const callbacksResponse = await database.listDocuments(DATABASE_ID, CALLBACK_COLLECTION_ID, [Query.limit(0)])
    const pendingCallbacksResponse = await database.listDocuments(DATABASE_ID, CALLBACK_COLLECTION_ID, [
      Query.equal("status", "pending"),
      Query.limit(0),
    ])

    // Get messages stats
    const messagesResponse = await database.listDocuments(DATABASE_ID, MESSAGE_COLLECTION_ID, [Query.limit(0)])
    const unreadMessagesResponse = await database.listDocuments(DATABASE_ID, MESSAGE_COLLECTION_ID, [
      Query.equal("isRead", false),
      Query.limit(0),
    ])

    // Get test drives stats
    const testDrivesResponse = await database.listDocuments(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, [Query.limit(0)])
    const upcomingTestDrivesResponse = await database.listDocuments(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, [
      Query.equal("status", "scheduled"),
      Query.greaterThan("scheduledDate", new Date().toISOString().split("T")[0]),
      Query.limit(0),
    ])

    // Get reviews stats
    const reviewsResponse = await database.listDocuments(DATABASE_ID, REVIEW_COLLECTION_ID, [Query.limit(0)])
    const pendingReviewsResponse = await database.listDocuments(DATABASE_ID, REVIEW_COLLECTION_ID, [
      Query.equal("status", "pending"),
      Query.limit(0),
    ])

    // Calculate average rating
    const reviewsWithRating = await database.listDocuments(DATABASE_ID, REVIEW_COLLECTION_ID, [
      Query.isNotNull("rating"),
      Query.limit(1000),
    ])

    let averageRating = 0
    if (reviewsWithRating.documents.length > 0) {
      const totalRating = reviewsWithRating.documents.reduce((sum, review) => sum + (review.rating || 0), 0)
      averageRating = totalRating / reviewsWithRating.documents.length
    }

    return {
      totalCars: carsResponse.total,
      activeCars: activeCarsResponse.total,
      featuredCars: featuredCarsResponse.total,
      totalCallbacks: callbacksResponse.total,
      pendingCallbacks: pendingCallbacksResponse.total,
      totalMessages: messagesResponse.total,
      unreadMessages: unreadMessagesResponse.total,
      totalTestDrives: testDrivesResponse.total,
      upcomingTestDrives: upcomingTestDrivesResponse.total,
      totalReviews: reviewsResponse.total,
      pendingReviews: pendingReviewsResponse.total,
      averageRating,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw new Error("Failed to fetch dashboard statistics")
  }
}

export async function getDashboardCharts(): Promise<DashboardCharts> {
  try {
    // Get cars by category
    const categories = await database.listDocuments(DATABASE_ID, "67cee30c001fd65329ac", [Query.limit(100)])

    const carsByCategory: ChartData[] = await Promise.all(
      categories.documents.map(async (category) => {
        const carsInCategory = await database.listDocuments(DATABASE_ID, CARS_COLLECTION_ID, [
          Query.equal("car_type.$id", category.$id),
          Query.limit(0),
        ])

        return {
          label: category.name,
          value: carsInCategory.total,
        }
      }),
    )

    // Get cars by make (top 10)
    const makes = await database.listDocuments(DATABASE_ID, "67c72fe00000db170b7b", [Query.limit(10)])

    const carsByMake: ChartData[] = await Promise.all(
      makes.documents.map(async (make) => {
        const carsWithMake = await database.listDocuments(DATABASE_ID, CARS_COLLECTION_ID, [
          Query.equal("car_make.$id", make.$id),
          Query.limit(0),
        ])

        return {
          label: make.name,
          value: carsWithMake.total,
        }
      }),
    )

    // Get inquiries by day (last 7 days)
    const inquiriesByDay: ChartData[] = []
    const testDrivesByDay: ChartData[] = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split("T")[0]
      const formattedDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)

      // Count inquiries (callbacks + messages) for this day
      const callbacksForDay = await database.listDocuments(DATABASE_ID, CALLBACK_COLLECTION_ID, [
        Query.greaterThanEqual("createdAt", `${dateString}T00:00:00.000Z`),
        Query.lessThan("createdAt", `${dateString}T23:59:59.999Z`),
        Query.limit(0),
      ])

      const messagesForDay = await database.listDocuments(DATABASE_ID, MESSAGE_COLLECTION_ID, [
        Query.greaterThanEqual("createdAt", `${dateString}T00:00:00.000Z`),
        Query.lessThan("createdAt", `${dateString}T23:59:59.999Z`),
        Query.limit(0),
      ])

      inquiriesByDay.push({
        label: formattedDate,
        value: callbacksForDay.total + messagesForDay.total,
      })

      // Count test drives for this day
      const testDrivesForDay = await database.listDocuments(DATABASE_ID, TEST_DRIVE_COLLECTION_ID, [
        Query.equal("scheduledDate", dateString),
        Query.limit(0),
      ])

      testDrivesByDay.push({
        label: formattedDate,
        value: testDrivesForDay.total,
      })
    }

    return {
      carsByCategory: carsByCategory.sort((a, b) => b.value - a.value).slice(0, 5),
      carsByMake: carsByMake.sort((a, b) => b.value - a.value),
      inquiriesByDay,
      testDrivesByDay,
    }
  } catch (error) {
    console.error("Error fetching dashboard charts data:", error)
    throw new Error("Failed to fetch dashboard charts data")
  }
}

