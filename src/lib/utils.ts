import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrency(amount: number | string, currency = "£") {
  if (!amount) return `${currency}0`

  // Convert to number if it's a string
  const numAmount = typeof amount === "string" ? Number.parseFloat(amount) : amount

  // Format based on currency
  if (currency === "KES") {
    // Format for Kenyan Shilling
    return `KSh ${numAmount.toLocaleString("en-KE")}`
  } else {
    // Default format for other currencies
    return `${currency}${numAmount.toLocaleString("en")}`
  }
}

