export interface dealer_basic_info {
    business_name: string
    business_type: "independent" | "franchise"
    years_in_business: "0-1" | "1-5" | "6-10" | "11-20" | "20+"
    $id?: string
  }
  
  export interface dealer_contact_info {
    contact_name: string
    email: string
    phone: string
    address: string
    $id?: string
  }
  
  export interface dealer_inventory_info {
    car_makes: string[]
    vehicle_types: string[]
    $id?: string
  }
  
  export interface dealer_preferences {
    primary_service: "sales" | "service" | "parts" | "financing" | "leasing"
    description: string
    accept_terms: boolean
    onboarding_completed?: boolean
    $id?: string
  }
  
  export interface dealer_profile
    extends dealer_basic_info,
      dealer_contact_info,
      dealer_inventory_info,
      dealer_preferences {
    user_id: string
    created_at: string
    updated_at: string
  }
  
  