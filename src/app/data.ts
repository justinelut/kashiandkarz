export interface CarProps {
  id: string;
  title: string;
  year: number;
  transmission: string;
  fuelType: string;
  price: number;
  imageUrl: string;
}

export const MOCK_CARS: CarProps[] = [
  {
    id: "1",
    title: "Mercedes-Benz GLE Coupe",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Petrol",
    price: 85000,
    imageUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000",
  },
  {
    id: "2",
    title: "BMW X7",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Hybrid",
    price: 92000,
    imageUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000",
  },
  {
    id: "3",
    title: "Audi Q8",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Diesel",
    price: 89000,
    imageUrl:
      "https://images.unsplash.com/photo-1614200179396-bc9160799ef9?q=80&w=1000",
  },
  {
    id: "4",
    title: "Range Rover Sport",
    year: 2024,
    transmission: "Automatic",
    fuelType: "Hybrid",
    price: 98000,
    imageUrl:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1000",
  },
  {
    id: "5",
    title: "Porsche Cayenne",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Petrol",
    price: 95000,
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000",
  },
  {
    id: "6",
    title: "Tesla Model X",
    year: 2024,
    transmission: "Automatic",
    fuelType: "Electric",
    price: 89999,
    imageUrl:
      "https://images.unsplash.com/photo-1566744394521-1c2f48120cdd?q=80&w=1000",
  },
  {
    id: "7",
    title: "Volvo XC90",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Hybrid",
    price: 75000,
    imageUrl:
      "https://images.unsplash.com/photo-1698762366816-1e5125c08cf7?q=80&w=1000",
  },
  {
    id: "8",
    title: "Lexus RX",
    year: 2024,
    transmission: "Automatic",
    fuelType: "Hybrid",
    price: 82000,
    imageUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000",
  },
];
