import Link from 'next/link'
import { Car, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="font-montserrat font-bold text-xl">KashiandKarz</span>
            </div>
            <p className="text-gray-50/70">
              Your trusted destination for cars. Quality vehicles, exceptional service.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/inventory" className="text-gray-50/70 hover:text-primary transition-colors">
                  Browse Inventory
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-50/70 hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-50/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-50/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/financing" className="text-gray-50/70 hover:text-primary transition-colors">
                  Financing Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-50/70">123 Car Street, Autoville, AV 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-50/70">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-50/70">info@kashiandkarz.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-50/70 mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-950 border border-gray-50/10 focus:outline-none focus:border-primary"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-50/10 text-center text-gray-50/70">
          <p>© {new Date().getFullYear()} KashiandKarz. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer