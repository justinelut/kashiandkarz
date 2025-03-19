import { z } from "zod"

// Callback Request Schema
export const callbackRequestSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  carId: z.string().optional(),
  carTitle: z.string().optional(),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  status: z.enum(["pending", "contacted", "completed", "cancelled"]),
  notes: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type CallbackRequest = z.infer<typeof callbackRequestSchema>

// Message Schema
export const messageSchema = z.object({
  id: z.string().optional(),
  senderName: z.string().min(2, "Name must be at least 2 characters"),
  senderEmail: z.string().email("Please enter a valid email"),
  senderPhone: z.string().optional(),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  carId: z.string().optional(),
  carTitle: z.string().optional(),
  isRead: z.boolean().default(false),
  isReplied: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Message = z.infer<typeof messageSchema>

// Test Drive Schema
export const testDriveSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(10, "Please enter a valid phone number"),
  carId: z.string().min(1, "Car ID is required"),
  carTitle: z.string().min(1, "Car title is required"),
  scheduledDate: z.string().min(1, "Please select a date"),
  scheduledTime: z.string().min(1, "Please select a time"),
  status: z.enum(["scheduled", "completed", "cancelled", "no-show"]),
  notes: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TestDrive = z.infer<typeof testDriveSchema>

// Company Details Schema
export const companyDetailsSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Company name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  website: z.string().url("Please enter a valid URL").optional(),
  openingHours: z.array(
    z.object({
      day: z.string(),
      open: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
  ),
  socialMedia: z.object({
    facebook: z.string().url("Please enter a valid URL").optional(),
    twitter: z.string().url("Please enter a valid URL").optional(),
    instagram: z.string().url("Please enter a valid URL").optional(),
    linkedin: z.string().url("Please enter a valid URL").optional(),
    youtube: z.string().url("Please enter a valid URL").optional(),
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type CompanyDetails = z.infer<typeof companyDetailsSchema>

// Dealer Profile Schema
export const dealerProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  avatar: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  languages: z.array(z.string()),
  specialties: z.array(z.string()),
  yearsOfExperience: z.number().min(0, "Years of experience must be positive"),
  socialMedia: z.object({
    linkedin: z.string().url("Please enter a valid URL").optional(),
    twitter: z.string().url("Please enter a valid URL").optional(),
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type DealerProfile = z.infer<typeof dealerProfileSchema>

