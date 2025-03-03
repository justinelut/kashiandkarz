"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, PenTool as Tool, Clock, Award, Wrench, FileCheck, Truck, Headphones } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive automotive services to ensure your vehicle performs at its best.
          </p>
        </div>
        
        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Shield,
              title: "Quality Assurance",
              description: "Every vehicle undergoes rigorous inspection and certification before sale."
            },
            {
              icon: Tool,
              title: "Expert Maintenance",
              description: "Professional service and maintenance support for all makes and models."
            },
            {
              icon: Clock,
              title: "Fast Processing",
              description: "Quick and efficient purchasing process with minimal paperwork."
            },
            {
              icon: Award,
              title: "Best Value",
              description: "Competitive pricing and flexible financing options to suit your budget."
            }
          ].map((service, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-white border-gray-100">
              <service.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2 text-gray-950">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
        
        {/* Maintenance Plans */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-950 mb-4">Maintenance Plans</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Keep your vehicle in optimal condition with our comprehensive maintenance plans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Basic Care",
                price: "Ksh 15,000",
                features: [
                  "Oil and filter change",
                  "Tire rotation",
                  "Brake inspection",
                  "Fluid level check",
                  "Battery test"
                ],
                popular: false
              },
              {
                title: "Premium Care",
                price: "Ksh 25,000",
                features: [
                  "Everything in Basic Care",
                  "Air filter replacement",
                  "Cabin filter replacement",
                  "Spark plug check",
                  "Cooling system service",
                  "Detailed inspection report"
                ],
                popular: true
              },
              {
                title: "Ultimate Care",
                price: "Ksh 40,000",
                features: [
                  "Everything in Premium Care",
                  "Full engine diagnostic",
                  "Transmission service",
                  "Fuel system cleaning",
                  "AC system check",
                  "Suspension inspection",
                  "24/7 roadside assistance"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`overflow-hidden ${plan.popular ? 'border-primary shadow-md' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-950 mb-2">{plan.title}</h3>
                  <p className="text-3xl font-bold text-gray-950 mb-6">{plan.price}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-gray-950 hover:bg-gray-800'}`}>
                    Select Plan
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-950 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a range of specialized services to meet all your automotive needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Wrench,
                title: "Custom Modifications",
                description: "Personalize your vehicle with our custom modification services, from performance upgrades to aesthetic enhancements."
              },
              {
                icon: FileCheck,
                title: "Vehicle Inspection",
                description: "Comprehensive inspection services to ensure your vehicle meets all safety and performance standards."
              },
              {
                icon: Truck,
                title: "Vehicle Transport",
                description: "Safe and secure transport services for your vehicle, whether you're moving or purchasing from afar."
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Round-the-clock customer support for all your automotive needs and emergencies."
              }
            ].map((service, index) => (
              <div key={index} className="flex gap-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="shrink-0">
                  <service.icon className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-950">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-950 text-gray-50 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Schedule a Service?</h2>
              <p className="text-gray-300 mb-6">
                Our expert technicians are ready to help keep your vehicle in top condition.
                Schedule a service appointment today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gray-50 text-gray-950 hover:bg-gray-200">
                  Schedule Service
                </Button>
                <Button variant="outline" className="border-gray-50 text-gray-50 hover:bg-gray-50/10">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000"
                alt="Car service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}