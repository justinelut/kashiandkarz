// Basic business information types
export interface business_info {
    business_name: string
    business_type: "independent" | "franchise" | "dealership" | "private_seller"
    years_in_business: "0-1" | "1-5" | "6-10" | "11-20" | "20+"
    business_registration_number?: string
    vat_number?: string
    website?: string
    $id?: string
  }
  
  // Contact information types
  export interface contact_details {
    contact_name: string
    position: string
    email: string
    phone: string
    alternative_phone?: string
    address_line1: string
    address_line2?: string
    city: string
    state_province: string
    postal_code: string
    country: string
    $id?: string
  }
  
  // Inventory information types
  export interface inventory_info {
    car_makes: string[]
    vehicle_types: string[]
    average_inventory_size: "1-10" | "11-50" | "51-100" | "101-500" | "500+"
    price_range: {
      min: number
      max: number
    }
    specializations?: string[]
    $id?: string
  }
  
  // Dealer preferences types
  export interface dealer_preferences {
    primary_service: "sales" | "service" | "parts" | "financing" | "leasing"
    secondary_services?: ("sales" | "service" | "parts" | "financing" | "leasing")[]
    description: string
    opening_hours: {
      monday: { open: string; close: string; closed: boolean }
      tuesday: { open: string; close: string; closed: boolean }
      wednesday: { open: string; close: string; closed: boolean }
      thursday: { open: string; close: string; closed: boolean }
      friday: { open: string; close: string; closed: boolean }
      saturday: { open: string; close: string; closed: boolean }
      sunday: { open: string; close: string; closed: boolean }
    }
    accept_terms: boolean
    marketing_preferences: {
      email_updates: boolean
      sms_notifications: boolean
      promotional_offers: boolean
    }
    onboarding_completed?: boolean
    $id?: string
  }
  
  // Media and branding types
  export interface dealer_media {
    logo_url?: string
    banner_url?: string
    showroom_images?: string[]
    team_photos?: string[]
    $id?: string
  }
  
  // Payment and subscription types
  export interface dealer_payment_info {
    subscription_plan: "basic" | "premium" | "enterprise"
    payment_method: "credit_card" | "bank_transfer" | "paypal"
    billing_cycle: "monthly" | "quarterly" | "annually"
    auto_renew: boolean
    $id?: string
  }
  
  // Complete dealer profile combining all sections
  export interface dealer_profile {
    user_id: string
    business_info: business_info
    contact_details: contact_details
    inventory_info: inventory_info
    dealer_preferences: dealer_preferences
    dealer_media?: dealer_media
    payment_info?: dealer_payment_info
    verification_status: "pending" | "verified" | "rejected"
    account_status: "active" | "inactive" | "suspended"
    created_at: string
    updated_at: string
    $id?: string
  }
  
  // Onboarding step tracking
  export interface onboarding_progress {
    user_id: string
    completed_steps: {
      business_info: boolean
      contact_details: boolean
      inventory_info: boolean
      dealer_preferences: boolean
      dealer_media: boolean
      payment_info: boolean
    }
    current_step:
      | "business_info"
      | "contact_details"
      | "inventory_info"
      | "dealer_preferences"
      | "dealer_media"
      | "payment_info"
      | "completed"
    started_at: string
    last_updated: string
    completed_at?: string
    $id?: string
  }
  
  // Form submission status
  export interface form_submission_status {
    is_submitting: boolean
    is_success: boolean
    is_error: boolean
    error_message?: string
  }
  
  // Onboarding context type
  export interface onboarding_context {
    dealer_data: Partial<dealer_profile>
    progress: onboarding_progress
    update_business_info: (data: business_info) => Promise<void>
    update_contact_details: (data: contact_details) => Promise<void>
    update_inventory_info: (data: inventory_info) => Promise<void>
    update_dealer_preferences: (data: dealer_preferences) => Promise<void>
    update_dealer_media: (data: dealer_media) => Promise<void>
    update_payment_info: (data: dealer_payment_info) => Promise<void>
    complete_onboarding: () => Promise<void>
    submission_status: form_submission_status
    reset_submission_status: () => void
  }
  
  