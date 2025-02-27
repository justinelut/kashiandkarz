import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Users, Building, Award, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-4">About KashiandKarz</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted destination for premium used cars with quality assurance and exceptional service.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-950 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2015, KashiandKarz began with a simple mission: to transform the used car buying experience. 
              We believed that purchasing a pre-owned vehicle should be just as exciting and confidence-inspiring as buying new.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a small dealership with just 15 cars has grown into one of the region's most trusted 
              automotive retailers, with hundreds of premium vehicles and thousands of satisfied customers.
            </p>
            <p className="text-gray-600 mb-6">
              Our commitment to quality, transparency, and customer satisfaction has remained unwavering throughout our journey. 
              Every vehicle in our inventory undergoes rigorous inspection and certification before it reaches our showroom floor.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">Quality Assured</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">Expert Service</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">Customer Focused</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-600">Transparent Pricing</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000"
              alt="KashiandKarz showroom"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-950 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at KashiandKarz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We never compromise on the quality of our vehicles. Each car undergoes a comprehensive 150-point inspection before joining our inventory."
              },
              {
                title: "Integrity",
                description: "Honesty and transparency are at the heart of our business. We provide detailed vehicle histories and are upfront about pricing."
              },
              {
                title: "Customer Service",
                description: "We're committed to exceeding expectations at every touchpoint, from browsing our inventory to after-sales support."
              },
              {
                title: "Innovation",
                description: "We continuously seek new ways to improve the car buying experience, embracing technology and modern solutions."
              },
              {
                title: "Community",
                description: "We're proud to be part of the local community and actively participate in initiatives that make a positive impact."
              },
              {
                title: "Sustainability",
                description: "We're committed to environmentally responsible practices and promoting fuel-efficient and hybrid vehicles."
              }
            ].map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow bg-white">
                <h3 className="text-xl font-bold mb-3 text-gray-950">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-950 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind KashiandKarz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
                bio: "With over 20 years in the automotive industry, John founded KashiandKarz with a vision to transform the used car market."
              },
              {
                name: "Sarah Johnson",
                role: "Sales Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
                bio: "Sarah leads our sales team with enthusiasm and expertise, ensuring every customer finds their perfect vehicle."
              },
              {
                name: "Michael Chen",
                role: "Head of Service",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
                bio: "Michael oversees our service department, bringing 15 years of technical expertise to maintain the highest standards."
              },
              {
                name: "Emily Rodriguez",
                role: "Customer Experience Manager",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
                bio: "Emily ensures that every interaction with KashiandKarz exceeds expectations, from first contact to after-sales support."
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden bg-white">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-950">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Achievements */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-950 mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Recognitions that reflect our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Best Used Car Dealership",
                year: "2023",
                organization: "Automotive Excellence Awards"
              },
              {
                icon: Star,
                title: "Customer Satisfaction Award",
                year: "2022",
                organization: "Consumer Choice"
              },
              {
                icon: Users,
                title: "Community Impact Award",
                year: "2023",
                organization: "Chamber of Commerce"
              },
              {
                icon: Building,
                title: "Business Growth Award",
                year: "2021",
                organization: "Business Association"
              }
            ].map((achievement, index) => (
              <Card key={index} className="p-6 text-center bg-white">
                <achievement.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2 text-gray-950">{achievement.title}</h3>
                <p className="text-gray-600 mb-1">{achievement.year}</p>
                <p className="text-gray-500 text-sm">{achievement.organization}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-950 text-gray-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the KashiandKarz Difference?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Visit our showroom today or browse our inventory online to find your perfect car.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gray-50 text-gray-950 hover:bg-gray-200">
              Browse Inventory
            </Button>
            <Button size="lg" variant="outline" className="border-gray-50 text-gray-50 hover:bg-gray-50/10">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}