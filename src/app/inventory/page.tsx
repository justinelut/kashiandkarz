"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fuel, Gauge, RotateCw, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_CARS } from '../data';   
import { Pagination } from '@/components/pagination';

export default function InventoryPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-950">Filters</h3>
                <Filter className="h-5 w-5 text-gray-500" />
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-950">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price1" className="mr-2" />
                    <label htmlFor="price1" className="text-gray-600">Under Ksh 50,000</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price2" className="mr-2" />
                    <label htmlFor="price2" className="text-gray-600">Ksh 50,000 - 70,000</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price3" className="mr-2" />
                    <label htmlFor="price3" className="text-gray-600">Ksh 70,000 - 90,000</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price4" className="mr-2" />
                    <label htmlFor="price4" className="text-gray-600">Above Ksh 90,000</label>
                  </div>
                </div>
              </div>
              
              {/* Make */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-950">Make</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="make1" className="mr-2" />
                    <label htmlFor="make1" className="text-gray-600">Mercedes-Benz</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="make2" className="mr-2" />
                    <label htmlFor="make2" className="text-gray-600">BMW</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="make3" className="mr-2" />
                    <label htmlFor="make3" className="text-gray-600">Audi</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="make4" className="mr-2" />
                    <label htmlFor="make4" className="text-gray-600">Toyota</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="make5" className="mr-2" />
                    <label htmlFor="make5" className="text-gray-600">Honda</label>
                  </div>
                </div>
              </div>
              
              {/* Fuel Type */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-950">Fuel Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="fuel1" className="mr-2" />
                    <label htmlFor="fuel1" className="text-gray-600">Petrol</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="fuel2" className="mr-2" />
                    <label htmlFor="fuel2" className="text-gray-600">Diesel</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="fuel3" className="mr-2" />
                    <label htmlFor="fuel3" className="text-gray-600">Hybrid</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="fuel4" className="mr-2" />
                    <label htmlFor="fuel4" className="text-gray-600">Electric</label>
                  </div>
                </div>
              </div>
              
              {/* Year */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-950">Year</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="year1" className="mr-2" />
                    <label htmlFor="year1" className="text-gray-600">2024</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="year2" className="mr-2" />
                    <label htmlFor="year2" className="text-gray-600">2023</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="year3" className="mr-2" />
                    <label htmlFor="year3" className="text-gray-600">2022</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="year4" className="mr-2" />
                    <label htmlFor="year4" className="text-gray-600">2021</label>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-gray-950 text-gray-50 hover:bg-gray-800">
                Apply Filters
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-950">Our Inventory</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded-md p-2 bg-white">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_CARS.slice(0, 9).map((car) => (
                <Card key={car.id} className="overflow-hidden group bg-white">
                  <div className="relative h-56">
                    <Image
                      src={car.imageUrl}
                      alt={car.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-gray-950 text-gray-50 hover:bg-gray-800"></Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-950">{car.title}</h3>
                      <span className="text-sm font-semibold bg-gray-100 px-2 py-1 rounded">{car.year}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-gray-950">{car.price}</span>
                      <span className="text-gray-600">{car.mileage}</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <RotateCw className="h-4 w-4 mr-1" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center">
                        <Fuel className="h-4 w-4 mr-1" />
                        <span>{car.fuelType}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gray-950 text-gray-50 hover:bg-gray-800">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <Pagination className="mt-12" totalPages={3} />
          </div>
        </div>
      </div>
    </div>
  );
}