"use client";

import { Award, Clock, Shield, PenToolIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const CallToAction = () => {
    return (
        <div>
         <section className="py-20 bg-gray-950 text-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl mb-8 text-gray-400">Browse our inventory or schedule a test drive today</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-lg bg-gray-50 text-gray-950 hover:bg-gray-200">
              Browse Inventory
            </Button>
            <Button size="lg" variant="outline" className="text-lg border-gray-50 text-gray-50 hover:bg-gray-50/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

        <section className="py-20 bg-gray-950 text-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-400 text-lg">Experience premium service with every purchase</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "Every vehicle undergoes rigorous inspection and certification"
              },
              {
                icon: PenToolIcon,
                title: "Expert Maintenance",
                description: "Professional service and maintenance support"
              },
              {
                icon: Clock,
                title: "Fast Processing",
                description: "Quick and efficient purchasing process"
              },
              {
                icon: Award,
                title: "Best Value",
                description: "Competitive pricing and financing options"
              }
            ].map((service, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-gray-900 border-gray-800">
                <service.icon className="h-12 w-12 mx-auto mb-4 text-gray-50" />
                <h3 className="text-xl font-bold mb-2 text-gray-50">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </div>
    );
}

export default CallToAction;