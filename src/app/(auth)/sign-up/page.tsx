
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { DealerSignupForm } from "@/components/auth/dealer-signup-form"

export const metadata: Metadata = {
  title: "Dealer Signup",
  description: "Join our network of car dealers and start listing your vehicles today",
}

export default function DealerSignupPage() {
  return (
    <div className="container h-screen relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/sign-in"
        className="absolute right-4 top-4 md:right-8 md:top-8 text-muted-foreground hover:text-primary"
      >
        Already a dealer? Login
      </Link>
      
      <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="https://appwrite.coolify.pixeldesign.site/v1/storage/buckets/67ab26470023df8c0274/files/67d47c3c002623bbf81b/view?project=67ab2565000bb415b5ae&project=67ab2565000bb415b5ae&mode=admin"
            fill
            alt="Dealer signup background"
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Kashi & Karz
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-white">
              "Joining Kashi & Karz as a dealer was the best business decision I've made. 
              Their platform helped me reach more customers and sell cars faster than ever before."
            </p>
            <footer className="text-sm text-white">Ahmed Hassan - Premium Motors</footer>
          </blockquote>
        </div>
      </div>
      
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Become a Dealer</h1>
            <p className="text-sm text-muted-foreground">
              Join our network of trusted car dealers and start selling your inventory online
            </p>
          </div>
          <DealerSignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
