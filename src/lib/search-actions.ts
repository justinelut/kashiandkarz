"use server"
import { Query } from "node-appwrite"
import { database } from "./appwrite-config"
import { carinfocollectionId, databaseId } from "./constants"

export interface CarSearchFilters {
    search?: string
    priceMin?: number
    priceMax?: number
    condition?: ("new" | "used")[]
    makes?: string[]
    models?: string[]
    bodyTypes?: string[]
    transmissions?: string[]
    fuelTypes?: string[]
    colors?: string[]
    doors?: number[]
    seats?: number[]
    safetyRatings?: number[]
    yearMin?: number
    yearMax?: number
    mileageMin?: number
    mileageMax?: number
    sortBy?: "price-low" | "price-high" | "mileage-low" | "mileage-high" | "year-new" | "year-old"
    limit?: number
    cursor?: string
  }



  export const searchCars = async (filters: CarSearchFilters) => {
    try {
      const {
        search,
        priceMin,
        priceMax,
        condition,
        makes,
        models,
        bodyTypes,
        transmissions,
        fuelTypes,
        colors,
        doors,
        seats,
        safetyRatings,
        yearMin,
        yearMax,
        mileageMin,
        mileageMax,
        sortBy = "price-low",
        limit = 12,
        cursor,
      } = filters
  
      // Start building the queries array
      const queries: any[] = [
        // Only show published and available cars
        Query.equal("status", "published"),
        Query.equal("availability", true),
      ]
  
      // Add search query if provided
      if (search && search.trim() !== "") {
        // Search across multiple fields
        queries.push(Query.search("title", search))
      }
  
      // Add condition filter (new/used)
      if (condition && condition.length > 0) {
        queries.push(Query.equal("condition", condition))
      }
  
      // Add make filter
      if (makes && makes.length > 0) {
        // For make, we need to search in the car_make field which contains IDs
        // This is a bit tricky with Appwrite, so we might need to do post-filtering
        queries.push(Query.equal("car_make", makes))
      }
  
      // Add model filter - this would be a partial text match
      if (models && models.length > 0) {
        queries.push(Query.search("car_model", models.join(" ")))
      }
  
      // Add body type filter
      if (bodyTypes && bodyTypes.length > 0) {
        // Similar to make, this would be a reference to car_type
        queries.push(Query.equal("vehicle_type", bodyTypes))
      }
  
      // Add year range filter
      if (yearMin) {
        queries.push(Query.greaterThanEqual("year", yearMin.toString()))
      }
      if (yearMax) {
        queries.push(Query.lessThanEqual("year", yearMax.toString()))
      }
  
      // Add cursor for pagination
      if (cursor) {
        queries.push(Query.cursorAfter(cursor))
      }
  
      // Add limit
      queries.push(Query.limit(limit))
  
      // Add sorting
      switch (sortBy) {
        case "price-high":
          // We need to sort by the pricing_payments.selling_price field
          // This is tricky with Appwrite's current limitations
          // We'll need to sort after fetching
          break
        case "price-low":
          // Same issue as above, but in reverse
          break
        case "mileage-low":
          // We need to sort by car_specifications.mileage
          // Again, post-processing required
          break
        case "mileage-high":
          // Same as above, but in reverse
          break
        case "year-new":
          queries.push(Query.orderDesc("year"))
          break
        case "year-old":
          queries.push(Query.orderAsc("year"))
          break
        default:
          // Default sort by newest first
          queries.push(Query.orderDesc("$createdAt"))
      }
  
      // Fetch the cars
      const response = await database.listDocuments(databaseId, carinfocollectionId, queries)
  
      // Now we need to do post-filtering for the nested fields
      let filteredCars = response.documents
  
      // Filter by transmission (in car_specifications)
      if (transmissions && transmissions.length > 0) {
        filteredCars = filteredCars.filter(
          (car) => car.car_specifications && transmissions.includes(car.car_specifications.transmission_type),
        )
      }
  
      // Filter by fuel type (in car_specifications)
      if (fuelTypes && fuelTypes.length > 0) {
        filteredCars = filteredCars.filter(
          (car) => car.car_specifications && fuelTypes.includes(car.car_specifications.fuel_type),
        )
      }
  
      // Filter by doors (in car_specifications)
      if (doors && doors.length > 0) {
        filteredCars = filteredCars.filter(
          (car) => car.car_specifications && doors.includes(car.car_specifications.doors),
        )
      }
  
      // Filter by seats (in car_specifications)
      if (seats && seats.length > 0) {
        filteredCars = filteredCars.filter(
          (car) => car.car_specifications && seats.includes(car.car_specifications.seats),
        )
      }
  
      // Filter by safety rating (in car_specifications)
      if (safetyRatings && safetyRatings.length > 0) {
        filteredCars = filteredCars.filter(
          (car) =>
            car.car_specifications &&
            car.car_specifications.safety_rating &&
            safetyRatings.includes(car.car_specifications.safety_rating),
        )
      }
  
      // Filter by color (this is a reference to a color object)
      if (colors && colors.length > 0) {
        filteredCars = filteredCars.filter((car) => car.color && colors.includes(car.color.$id))
      }
  
      // Filter by price range (in pricing_payments)
      if (priceMin !== undefined || priceMax !== undefined) {
        filteredCars = filteredCars.filter((car) => {
          if (!car.pricing_payments || !car.pricing_payments.selling_price) return false
  
          const price = car.pricing_payments.selling_price
          if (priceMin !== undefined && price < priceMin) return false
          if (priceMax !== undefined && price > priceMax) return false
  
          return true
        })
      }
  
      // Filter by mileage range (in car_specifications)
      if (mileageMin !== undefined || mileageMax !== undefined) {
        filteredCars = filteredCars.filter((car) => {
          if (!car.car_specifications || !car.car_specifications.mileage) return false
  
          const mileage = Number.parseInt(car.car_specifications.mileage)
          if (mileageMin !== undefined && mileage < mileageMin) return false
          if (mileageMax !== undefined && mileage > mileageMax) return false
  
          return true
        })
      }
  
      // Sort by price or mileage if needed (post-processing)
      if (sortBy === "price-high" || sortBy === "price-low") {
        filteredCars.sort((a, b) => {
          const priceA = a.pricing_payments?.selling_price || 0
          const priceB = b.pricing_payments?.selling_price || 0
  
          return sortBy === "price-high" ? priceB - priceA : priceA - priceB
        })
      } else if (sortBy === "mileage-high" || sortBy === "mileage-low") {
        filteredCars.sort((a, b) => {
          const mileageA = Number.parseInt(a.car_specifications?.mileage || "0")
          const mileageB = Number.parseInt(b.car_specifications?.mileage || "0")
  
          return sortBy === "mileage-high" ? mileageB - mileageA : mileageA - mileageB
        })
      }
  
      // Get the total count (this is an approximation since we're doing post-filtering)
      const totalCount = response.total
  
      // Determine if there are more results
      const hasMore = filteredCars.length === limit
  
      // Get the last document's ID for cursor-based pagination
      const lastId = filteredCars.length > 0 ? filteredCars[filteredCars.length - 1].$id : null
  
      return {
        success: true,
        data: filteredCars,
        pagination: {
          total: totalCount,
          hasMore,
          nextCursor: hasMore ? lastId : null,
        },
      }
    } catch (error) {
      console.error("Error searching cars:", error)
      return { success: false, error: "Failed to search cars" }
    }
  }