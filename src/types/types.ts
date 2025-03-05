export interface CarInformation {
    // Basic Info
    car_id: string
    make: string
    model: string
    year: number
    mileage: number
    color: string
  
    transmission: string
    fuel_type: string
    condition: string
    description: string
  
    // Features
    exterior_features: string[]
    interior_features: string[]
    safety_features: string[]
  
    vin?: string
    registration_number: string
    logbook_availability: "yes" | "no"
    previous_owners: string
    insurance_status: "valid" | "expired" | "none"
  
    // Pricing
    selling_price: string
    currency: string
    negotiable: "yes" | "no"
    installment_plans: "yes" | "no"
    payment_methods: string[]
  
    // Photos & Video
    images: string[]
    video?: string
  
    // Status
    status: "draft" | "published"
    availability: boolean
  }