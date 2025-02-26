export interface CarProps {
  id: string;
  title: string;
  year: number;
  transmission: string;
  fuelType: string;
  price: string;
  imageUrl: string;
  mileage: string;
}

export const MOCK_CARS: CarProps[] = [
  {
    id: "1",
    title: "Mercedes-Benz GLE Coupe",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Petrol",
    price: "Ksh 85,000",
    imageUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000",
    mileage: "12,000 kms",
  },
  {
    id: "2",
    title: "BMW X7",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Hybrid",
    price: "Ksh 92,000",
    imageUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000",
    mileage: "15,000 kms",
  },
  {
    id: "3",
    title: "Audi Q8",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Diesel",
    price: "Ksh 89,000",
    imageUrl:
      "https://images.unsplash.com/photo-1614200179396-bc9160799ef9?q=80&w=1000",
    mileage: "13,000 kms",
  },
  {
    id: "4",
    title: "Range Rover Sport",
    year: 2024,
    transmission: "Automatic",
    fuelType: "Hybrid",
    price: "Ksh 98,000",
    imageUrl:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1000",
    mileage: "10,000 kms",
  },
  {
    id: "5",
    title: "Porsche Cayenne",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Petrol",
    price: "Ksh 95,000",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000",
    mileage: "11,000 kms",
  },
  {
    id: "6",
    title: "Tesla Model X",
    year: 2024,
    transmission: "Automatic",
    fuelType: "Electric",
    price: "Ksh 89,999",
    imageUrl:
      "https://images.unsplash.com/photo-1566744394521-1c2f48120cdd?q=80&w=1000",
    mileage: "5,000 kms",
  },
  {
    id: "7",
    title: "Volvo XC90",
    year: 2023,
    transmission: "Automatic",
    fuelType: "Hybrid",
    price: "Ksh 75,000",
    imageUrl:
      "https://images.unsplash.com/photo-1698762366816-1e5125c08cf7?q=80&w=1000",
    mileage: "14,000 kms",
  },
  {
    id: "8",
    title: "Lexus RX",
    year: 2024,
    transmission: "Automatic",
    fuelType: "Hybrid",
    price: "Ksh 82,000",
    imageUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000",
    mileage: "9,000 kms",
  },
];
