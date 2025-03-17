export interface DealerBasicInfo {
    business_name: string
    business_type: "independent" | "franchise"
    years_in_business: "0-1" | "1-5" | "6-10" | "11-20" | "20+"
    step: number
    $id?: string
  }
  
  export interface DealerContactInfo {
    contact_name: string
    email: string
    phone: string
    address: string
    $id?: string
  }
  
  export interface DealerInventoryInfo {
    car_makes: string[]
    vehicle_types: string[]
    $id?: string
  }
  
  export interface DealerPreferences {
    primary_service: "sales" | "service" | "parts" | "financing" | "leasing"
    description: string
    accept_terms: boolean
    onboarding_completed?: boolean
    $id?: string
  }
  
  export interface dealer_profile
    extends DealerBasicInfo,
      DealerContactInfo,
      DealerInventoryInfo,
      DealerPreferences {
    user_id: string
    created_at: string
    updated_at: string
  }
  
  