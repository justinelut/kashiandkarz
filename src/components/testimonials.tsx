import { Star } from "lucide-react";
import { Card } from "./ui/card";
import Image from "next/image"

const Testimonials = () => {
    return (
         <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-4">Customer Reviews</h2>
            <p className="text-gray-600 text-lg">Hear what our satisfied customers have to say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Business Owner",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
                content: "Outstanding service! The team at KashiandKarz made my car buying experience smooth and enjoyable."
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
                content: "Found my dream car at a great price. The financing options were flexible and the staff was very helpful."
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Director",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
                content: "Excellent selection of premium vehicles. The attention to detail and customer service is unmatched."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-950">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
}

export default Testimonials;