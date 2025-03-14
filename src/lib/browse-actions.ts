"use server"

import { Databases, Client, Query } from "node-appwrite"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.APPWRITE_API_KEY!) // Use server-side API key

const database = new Databases(client)
const databaseId = process.env.APPWRITE_DATABASE_ID as string

const carinfocollectionId = "67cf10af003268a33d9f"
const carmakecollectionsId = "67c72fe00000db170b7b"
const carTypeCollectionId = "67cee30c001fd65329ac"
const carcolorscollectionid = "67c86a92000277171665"

// Types for filtering
export interface NewCarFilters {
  makes?: string[]
  models?: string[]
  bodyTypes?: string[]
  priceMin?: number
  priceMax?: number
  colors?: string[]
  fuelTypes?: string[]
  transmissions?: string[]
  sortBy?: "price-low" | "price-high" | "newest" | "popularity"
  specialOffers?: boolean
  preOrder?: boolean
  page?: number
  limit?: number
  search?: string
}

export interface UsedCarFilters {
  makes?: string[]
  models?: string[]
  bodyTypes?: string[]
  priceMin?: number
  priceMax?: number
  colors?: string[]
  fuelTypes?: string[]
  transmissions?: string[]
  yearMin?: number
  yearMax?: number
  mileageMin?: number
  mileageMax?: number
  ownersMax?: number
  serviceHistory?: boolean
  accidentFree?: boolean
  warrantyRemaining?: boolean
  certifiedPreOwned?: boolean
  sortBy?: "price-low" | "price-high" | "newest" | "mileage-low" | "year-new"
  page?: number
  limit?: number
  search?: string
}

// Get new cars with filtering
export const getNewCars = async (filters: NewCarFilters = {}) => {
  try {
    const {
      makes,
      models,
      bodyTypes,
      priceMin,
      priceMax,
      colors,
      fuelTypes,
      transmissions,
      sortBy = "newest",
      specialOffers,
      preOrder,
      page = 1,
      limit = 12,
      search,
    } = filters

    // Start building the queries array
    const queries: any[] = [
      // Only show published and available cars that are new
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.equal("condition", "new"),
    ]

    // Add search query if provided
    if (search && search.trim() !== "") {
      queries.push(Query.search("title", search))
    }

    // Add make filter
    if (makes && makes.length > 0) {
      queries.push(Query.equal("car_make", makes))
    }

    // Add model filter
    if (models && models.length > 0) {
      queries.push(Query.search("car_model", models.join(" ")))
    }

    // Add body type filter
    if (bodyTypes && bodyTypes.length > 0) {
      queries.push(Query.equal("vehicle_type", bodyTypes))
    }

    // Add special offers filter
    if (specialOffers) {
      queries.push(Query.equal("special_offer", true))
    }

    // Add pre-order filter
    if (preOrder) {
      queries.push(Query.equal("pre_order", true))
    }

    // Add pagination
    const offset = (page - 1) * limit
    queries.push(Query.limit(limit))
    queries.push(Query.offset(offset))

    // Add sorting
    switch (sortBy) {
      case "price-low":
        // We'll sort after fetching
        break
      case "price-high":
        // We'll sort after fetching
        break
      case "popularity":
        queries.push(Query.orderDesc("view_count"))
        break
      case "newest":
      default:
        queries.push(Query.orderDesc("$createdAt"))
        break
    }

    // Fetch the cars
    const response = await database.listDocuments(databaseId, carinfocollectionId, queries)

    // Post-filtering for nested fields
    let filteredCars = response.documents

    // Filter by color
    if (colors && colors.length > 0) {
      filteredCars = filteredCars.filter((car) => car.color && colors.includes(car.color.$id))
    }

    // Filter by fuel type
    if (fuelTypes && fuelTypes.length > 0) {
      filteredCars = filteredCars.filter(
        (car) => car.car_specifications && fuelTypes.includes(car.car_specifications.fuel_type),
      )
    }

    // Filter by transmission
    if (transmissions && transmissions.length > 0) {
      filteredCars = filteredCars.filter(
        (car) => car.car_specifications && transmissions.includes(car.car_specifications.transmission_type),
      )
    }

    // Filter by price range
    if (priceMin !== undefined || priceMax !== undefined) {
      filteredCars = filteredCars.filter((car) => {
        if (!car.pricing_payments || !car.pricing_payments.selling_price) return false

        const price = car.pricing_payments.selling_price
        if (priceMin !== undefined && price < priceMin) return false
        if (priceMax !== undefined && price > priceMax) return false

        return true
      })
    }

    // Sort by price if needed
    if (sortBy === "price-high" || sortBy === "price-low") {
      filteredCars.sort((a, b) => {
        const priceA = a.pricing_payments?.selling_price || 0
        const priceB = b.pricing_payments?.selling_price || 0

        return sortBy === "price-high" ? priceB - priceA : priceA - priceB
      })
    }

    return {
      success: true,
      data: filteredCars,
      pagination: {
        total: response.total,
        page,
        limit,
        totalPages: Math.ceil(response.total / limit),
      },
    }
  } catch (error) {
    console.error("Error fetching new cars:", error)
    return { success: false, error: "Failed to fetch new cars" }
  }
}

// Get used cars with filtering
export const getUsedCars = async (filters: UsedCarFilters = {}) => {
  try {
    const {
      makes,
      models,
      bodyTypes,
      priceMin,
      priceMax,
      colors,
      fuelTypes,
      transmissions,
      yearMin,
      yearMax,
      mileageMin,
      mileageMax,
      ownersMax,
      serviceHistory,
      accidentFree,
      warrantyRemaining,
      certifiedPreOwned,
      sortBy = "newest",
      page = 1,
      limit = 12,
      search,
    } = filters

    // Start building the queries array
    const queries: any[] = [
      // Only show published and available cars that are used
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.equal("condition", "used"),
    ]

    // Add search query if provided
    if (search && search.trim() !== "") {
      queries.push(Query.search("title", search))
    }

    // Add make filter
    if (makes && makes.length > 0) {
      queries.push(Query.equal("car_make", makes))
    }

    // Add model filter
    if (models && models.length > 0) {
      queries.push(Query.search("car_model", models.join(" ")))
    }

    // Add body type filter
    if (bodyTypes && bodyTypes.length > 0) {
      queries.push(Query.equal("vehicle_type", bodyTypes))
    }

    // Add year range filter
    if (yearMin) {
      queries.push(Query.greaterThanEqual("year", yearMin.toString()))
    }
    if (yearMax) {
      queries.push(Query.lessThanEqual("year", yearMax.toString()))
    }

    // Add certified pre-owned filter
    if (certifiedPreOwned) {
      queries.push(Query.equal("certified_pre_owned", true))
    }

    // Add pagination
    const offset = (page - 1) * limit
    queries.push(Query.limit(limit))
    queries.push(Query.offset(offset))

    // Add sorting
    switch (sortBy) {
      case "price-low":
        // We'll sort after fetching
        break
      case "price-high":
        // We'll sort after fetching
        break
      case "mileage-low":
        // We'll sort after fetching
        break
      case "year-new":
        queries.push(Query.orderDesc("year"))
        break
      case "newest":
      default:
        queries.push(Query.orderDesc("$createdAt"))
        break
    }

    // Fetch the cars
    const response = await database.listDocuments(databaseId, carinfocollectionId, queries)

    // Post-filtering for nested fields
    let filteredCars = response.documents

    // Filter by color
    if (colors && colors.length > 0) {
      filteredCars = filteredCars.filter((car) => car.color && colors.includes(car.color.$id))
    }

    // Filter by fuel type
    if (fuelTypes && fuelTypes.length > 0) {
      filteredCars = filteredCars.filter(
        (car) => car.car_specifications && fuelTypes.includes(car.car_specifications.fuel_type),
      )
    }

    // Filter by transmission
    if (transmissions && transmissions.length > 0) {
      filteredCars = filteredCars.filter(
        (car) => car.car_specifications && transmissions.includes(car.car_specifications.transmission_type),
      )
    }

    // Filter by price range
    if (priceMin !== undefined || priceMax !== undefined) {
      filteredCars = filteredCars.filter((car) => {
        if (!car.pricing_payments || !car.pricing_payments.selling_price) return false

        const price = car.pricing_payments.selling_price
        if (priceMin !== undefined && price < priceMin) return false
        if (priceMax !== undefined && price > priceMax) return false

        return true
      })
    }

    // Filter by mileage range
    if (mileageMin !== undefined || mileageMax !== undefined) {
      filteredCars = filteredCars.filter((car) => {
        if (!car.car_specifications || !car.car_specifications.mileage) return false

        const mileage = Number.parseInt(car.car_specifications.mileage)
        if (mileageMin !== undefined && mileage < mileageMin) return false
        if (mileageMax !== undefined && mileage > mileageMax) return false

        return true
      })
    }

    // Filter by owners
    if (ownersMax !== undefined) {
      filteredCars = filteredCars.filter((car) => {
        if (!car.ownership_documentation || !car.ownership_documentation.previous_owners) return false
        return car.ownership_documentation.previous_owners <= ownersMax
      })
    }

    // Filter by service history
    if (serviceHistory) {
      filteredCars = filteredCars.filter(
        (car) => car.ownership_documentation && car.ownership_documentation.service_history === "full",
      )
    }

    // Filter by accident free
    if (accidentFree) {
      filteredCars = filteredCars.filter(
        (car) => car.ownership_documentation && car.ownership_documentation.accident_free === true,
      )
    }

    // Filter by warranty remaining
    if (warrantyRemaining) {
      filteredCars = filteredCars.filter(
        (car) => car.ownership_documentation && car.ownership_documentation.warranty_remaining === true,
      )
    }

    // Sort by price or mileage if needed
    if (sortBy === "price-high" || sortBy === "price-low") {
      filteredCars.sort((a, b) => {
        const priceA = a.pricing_payments?.selling_price || 0
        const priceB = b.pricing_payments?.selling_price || 0

        return sortBy === "price-high" ? priceB - priceA : priceA - priceB
      })
    } else if (sortBy === "mileage-low") {
      filteredCars.sort((a, b) => {
        const mileageA = Number.parseInt(a.car_specifications?.mileage || "0")
        const mileageB = Number.parseInt(b.car_specifications?.mileage || "0")

        return mileageA - mileageB
      })
    }

    return {
      success: true,
      data: filteredCars,
      pagination: {
        total: response.total,
        page,
        limit,
        totalPages: Math.ceil(response.total / limit),
      },
    }
  } catch (error) {
    console.error("Error fetching used cars:", error)
    return { success: false, error: "Failed to fetch used cars" }
  }
}

// Get special offers
export const getSpecialOffers = async (limit = 6) => {
  try {
    const queries = [
      Query.equal("special_offer", true),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
    ]

    const response = await database.listDocuments(databaseId, carinfocollectionId, queries)

    return { success: true, data: response.documents }
  } catch (error) {
    console.error("Error fetching special offers:", error)
    return { success: false, error: "Failed to fetch special offers" }
  }
}

// Get pre-order cars
export const getPreOrderCars = async (limit = 6) => {
  try {
    const queries = [
      Query.equal("pre_order", true),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.limit(limit),
    ]

    const response = await database.listDocuments(databaseId, carinfocollectionId, queries)

    return { success: true, data: response.documents }
  } catch (error) {
    console.error("Error fetching pre-order cars:", error)
    return { success: false, error: "Failed to fetch pre-order cars" }
  }
}

// Get certified pre-owned cars
export const getCertifiedPreOwnedCars = async (limit = 6) => {
  try {
    const queries = [
      Query.equal("certified_pre_owned", true),
      Query.equal("status", "published"),
      Query.equal("availability", true),
      Query.equal("condition", "used"),
      Query.limit(limit),
    ]

    const response = await database.listDocuments(databaseId, carinfocollectionId, queries)

    return { success: true, data: response.documents }
  } catch (error) {
    console.error("Error fetching certified pre-owned cars:", error)
    return { success: false, error: "Failed to fetch certified pre-owned cars" }
  }
}

// Get popular used car makes
export const getPopularUsedCarMakes = async (limit = 8) => {
  try {
    // This would ideally be based on analytics data
    // For now, we'll just get makes that have used cars
    const queries = [
      Query.limit(limit),
      // Add any other criteria for popular makes
    ]

    const response = await database.listDocuments(databaseId, carmakecollectionsId, queries)

    return { success: true, data: response.documents }
  } catch (error) {
    console.error("Error fetching popular used car makes:", error)
    return { success: false, error: "Failed to fetch popular used car makes" }
  }
}

// Get popular new car makes
export const getPopularNewCarMakes = async (limit = 8) => {
  try {
    // This would ideally be based on analytics data
    // For now, we'll just get makes that have new cars
    const queries = [
      Query.limit(limit),
      // Add any other criteria for popular makes
    ]

    const response = await database.listDocuments(databaseId, carmakecollectionsId, queries)

    return { success: true, data: response.documents }
  } catch (error) {
    console.error("Error fetching popular new car makes:", error)
    return { success: false, error: "Failed to fetch popular new car makes" }
  }
}

