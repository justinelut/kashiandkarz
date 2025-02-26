export interface Car {
  id: string;
  name: string;
  price: number;
  year: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  imageUrl: string;
}

export const cars: Car[] = [
  {
    id: '1',
    name: 'Toyota Land Cruiser V8',
    price: 8500000,
    year: 2019,
    mileage: 45000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1631294883353-e8c1b3ce27b3?q=80&w=1920&auto=format&fit=crop', // Land Cruiser
  },
  {
    id: '2',
    name: 'Mercedes-Benz G63 AMG',
    price: 15000000,
    year: 2021,
    mileage: 25000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1666624481302-9ba3785a0ad4?q=80&w=1920&auto=format&fit=crop', // G63 AMG
  },
  {
    id: '3',
    name: 'Range Rover Vogue',
    price: 12000000,
    year: 2020,
    mileage: 35000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1920&auto=format&fit=crop', // Range Rover
  },
  {
    id: '4',
    name: 'BMW X7',
    price: 9500000,
    year: 2021,
    mileage: 30000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=1920&auto=format&fit=crop', // BMW X7
  },
  {
    id: '5',
    name: 'Porsche Cayenne',
    price: 11000000,
    year: 2020,
    mileage: 40000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1920&auto=format&fit=crop', // Porsche Cayenne
  },
  {
    id: '6',
    name: 'Lexus LX570',
    price: 9000000,
    year: 2019,
    mileage: 50000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    imageUrl: 'https://images.unsplash.com/photo-1675793715951-b5d674d3cd90?q=80&w=1920&auto=format&fit=crop', // Lexus LX
  }
];
