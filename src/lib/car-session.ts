/**
 * Helper functions to manage car ID and data between form steps
 */

// Get the current car ID from session storage
export function getCurrentCarId(): string | null {
    if (typeof window === "undefined") return null
  
    return sessionStorage.getItem("currentCarId")
  }
  
  // Set the current car ID in session storage
  export function setCurrentCarId(id: string): void {
    if (typeof window === "undefined") return
  
    sessionStorage.setItem("currentCarId", id)
  }
  
  // Get car API data from session storage
  export function getCarApiData(): any {
    if (typeof window === "undefined") return null
  
    try {
      const data = sessionStorage.getItem("carApiData")
      return data ? JSON.parse(data) : null
    } catch (e) {
      console.error("Error parsing car API data:", e)
      return null
    }
  }
  
  // Set car API data in session storage
  export function setCarApiData(data: any): void {
    if (typeof window === "undefined") return
  
    try {
      sessionStorage.setItem("carApiData", JSON.stringify(data))
    } catch (e) {
      console.error("Error storing car API data:", e)
    }
  }
  
  // Clear all car session data
  export function clearCarSession(): void {
    if (typeof window === "undefined") return
  
    sessionStorage.removeItem("currentCarId")
    sessionStorage.removeItem("carApiData")
  }
  
  // Validate that we have a car ID, and redirect if not
  export function validateCarSession(router: any, toast: any): boolean {
    const carId = getCurrentCarId()
  
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
  
  