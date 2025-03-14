export interface CarType {
  $id: string
  name: string
  slug: string
  car_info?: any[] // Adjust the type of car_info as needed
}

export const getAllCarTypesWithCars = async (limit = 3) => {
  // This is a placeholder implementation. Replace with actual logic
  return {
    success: true,
    data: [
      {
        $id: "1",
        name: "SUV",
        slug: "suv",
        car_info: [],
      },
      {
        $id: "2",
        name: "Sedan",
        slug: "sedan",
        car_info: [],
      },
    ],
    error: null,
  }
}

