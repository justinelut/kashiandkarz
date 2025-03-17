export interface ActionButtonsProps {
    carId: string
    carTitle: string
    dealerId: string
    dealerName: string
    dealerPhone?: string
    dealerLocation?: string
    isAvailable?: boolean
  }
  
  export interface EnquiryFormData {
    name: string
    phone: string
    email: string
    message: string
    contact_preference: "email" | "phone" | "both"
  }
  
  export interface CallbackFormData {
    name: string
    phone: string
    best_time: "morning" | "afternoon" | "evening"
    notes?: string
  }
  
  export interface TestDriveFormData {
    name: string
    phone: string
    email: string
    preferred_date: string
    preferred_time: string
    preferred_location: string
    special_requests?: string
  }
  
  export interface FormSubmissionResult {
    success: boolean
    message: string
    data?: any
  }
  
  