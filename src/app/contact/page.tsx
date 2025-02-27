import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help. Reach out to our team with any questions or inquiries.
          </p>
        </div>
        
        {/* Contact Information and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white h-full">
              <h2 className="text-2xl font-bold text-gray-950 mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-950 mb-1">Visit Us</h3>
                    <p className="text-gray-600">123 Car Street, Autoville, AV 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-950 mb-1">Call Us</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-950 mb-1">Email Us</h3>
                    <p className="text-gray-600">info@kashiandkarz.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-950 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-950 mb-1">Live Chat</h3>
                    <p className="text-gray-600">Available during business hours</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-950 mb-6">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>
                
                <Button className="w-full bg-gray-950 text-gray-50 hover:bg-gray-800">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
        
        {/* Map */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Our Location</h2>
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            {/* Replace with actual map component or iframe */}
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <p className="text-gray-600">Interactive Map Would Be Displayed Here</p>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-950 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What documents do I need to purchase a car?",
                answer: "You'll need a valid ID, proof of insurance, and payment method. For financing, additional documents like proof of income and residence may be required."
              },
              {
                question: "Do you offer financing options?",
                answer: "Yes, we offer various financing options through our partner banks and financial institutions. Our finance team can help you find the best rates."
              },
              {
                question: "Can I trade in my current vehicle?",
                answer: "Absolutely! We accept trade-ins and will provide a fair market value for your current vehicle to apply toward your new purchase."
              },
              {
                question: "What warranty options do you offer?",
                answer: "All our vehicles come with a standard 3-month warranty. Extended warranty options are available for additional peace of mind."
              },
              {
                question: "How do I schedule a test drive?",
                answer: "You can schedule a test drive online through our website, by phone, or by visiting our showroom in person."
              },
              {
                question: "Do you deliver vehicles to other locations?",
                answer: "Yes, we offer delivery services within a 100-mile radius of our dealership for a nominal fee."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 bg-white">
                <h3 className="text-lg font-bold text-gray-950 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-950 text-gray-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Test Drive?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the quality and performance of our vehicles firsthand.
          </p>
          <Button size="lg" className="bg-gray-50 text-gray-950 hover:bg-gray-200">
            Schedule Now
          </Button>
        </div>
      </div>
    </div>
  );
}