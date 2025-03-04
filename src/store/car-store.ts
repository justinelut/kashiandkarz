import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// Define the car data types
interface CarMake {
  $id: string
  name: string
  slug: string
  image: string
}

interface CarApiData {
  fuelType?: string
  transmissionType?: string
  drivetrain?: string
  engineCapacity?: string
  horsepower?: string
  torque?: string
}

interface BasicCarInfo {
  makeId: string
  makeName?: string
  makeImage?: string
  model: string
  year: string
  vehicleType: string
  condition: string
}

interface CarSpecifications {
  fuelType: string
  transmissionType: string
  drivetrain: string
  engineCapacity: string
  horsepower: string
  torque: string
  mileage?: string
  mileageUnit: "km" | "miles"
}

interface CarFeatures {
  exteriorFeatures?: string[]
  interiorFeatures?: string[]
  safetyFeatures?: string[]
}

interface OwnershipDocumentation {
  vin: string
  registrationNumber: string
  logbookAvailability: "yes" | "no"
  previousOwners: string
  insuranceStatus: "valid" | "expired" | "none"
}

interface PricingPayment {
  sellingPrice: string
  currency: string
  negotiable: "yes" | "no"
  installmentPlans: "yes" | "no"
  paymentMethods: string[]
}

// Define the store state
interface CarState {
  // Car data
  carId: string | null
  apiData: CarApiData | null
  basicInfo: BasicCarInfo | null
  specifications: CarSpecifications | null
  features: CarFeatures | null
  ownership: OwnershipDocumentation | null
  pricing: PricingPayment | null

  // Selected make for UI
  selectedMake: CarMake | null

  // Actions
  setCarId: (id: string) => void
  setApiData: (data: CarApiData) => void
  setBasicInfo: (data: BasicCarInfo) => void
  setSpecifications: (data: CarSpecifications) => void
  setFeatures: (data: CarFeatures) => void
  setOwnership: (data: OwnershipDocumentation) => void
  setPricing: (data: PricingPayment) => void
  setSelectedMake: (make: CarMake | null) => void

  // Clear store
  clearStore: () => void
}

// Create the store with persistence
export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      // Initial state
      carId: null,
      apiData: null,
      basicInfo: null,
      specifications: null,
      features: null,
      ownership: null,
      pricing: null,
      selectedMake: null,

      // Actions
      setCarId: (id) => set({ carId: id }),
      setApiData: (data) => set({ apiData: data }),
      setBasicInfo: (data) => set({ basicInfo: data }),
      setSpecifications: (data) => set({ specifications: data }),
      setFeatures: (data) => set({ features: data }),
      setOwnership: (data) => set({ ownership: data }),
      setPricing: (data) => set({ pricing: data }),
      setSelectedMake: (make) => set({ selectedMake: make }),

      // Clear store
      clearStore: () =>
        set({
          carId: null,
          apiData: null,
          basicInfo: null,
          specifications: null,
          features: null,
          ownership: null,
          pricing: null,
          selectedMake: null,
        }),
    }),
    {
      name: "car-store", // name of the item in storage
      storage: createJSONStorage(() => localStorage), // use localStorage
    },
  ),
)

// Helper functions
export function validateCarData(router: any, toast: any): boolean {
  const carId = useCarStore.getState().carId

  if (!carId) {
    toast({
      title: "No car information found",
      description: "Please start from the beginning to add a new car.",
      variant: "error",
    })
    router.push("/dashboard/cars/new")
    return false
  }

  return true
}

