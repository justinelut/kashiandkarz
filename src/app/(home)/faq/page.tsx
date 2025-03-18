"use client"
import { PageLayout } from "@/components/layouts/page-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function FAQPage() {
  return (
    <PageLayout
      title="Frequently Asked Questions"
      description="Find answers to the most common questions about buying, selling, and financing cars."
      breadcrumbs={[{ label: "FAQ", href: "/faq" }]}
    >
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search for answers..." className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="buying" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buying">Buying</TabsTrigger>
          <TabsTrigger value="selling">Selling</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="buying" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I search for cars on KashiAndKarz?</AccordionTrigger>
              <AccordionContent>
                <p>
                  You can search for cars on KashiAndKarz using our search function at the top of the page. You can
                  filter by make, model, price, year, mileage, and many other criteria to find the perfect car for you.
                </p>
                <p className="mt-2">
                  Alternatively, you can browse cars by category, make, or body type using the navigation menu.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I know if a car is good value?</AccordionTrigger>
              <AccordionContent>
                <p>
                  We provide a value indicator on all our listings, which compares the price to similar cars on the
                  market. We also provide a full vehicle history check on all cars, so you can see if the car has been
                  in any accidents, has outstanding finance, or has been stolen.
                </p>
                <p className="mt-2">
                  Additionally, you can check the car's service history, MOT history, and previous owners to get a
                  better idea of its condition and value.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I test drive a car before buying?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, we encourage test drives! You can book a test drive directly through our website by clicking the
                  "Book Test Drive" button on any car listing. You'll need to provide some basic information and choose
                  a convenient time and date.
                </p>
                <p className="mt-2">
                  The dealer or private seller will then confirm your appointment, and you'll receive a confirmation
                  email with all the details.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What documents do I need when buying a car?</AccordionTrigger>
              <AccordionContent>
                <p>When buying a car, you'll need:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>A valid driving license</li>
                  <li>Proof of address (utility bill, bank statement, etc.)</li>
                  <li>Proof of insurance</li>
                  <li>Payment method (bank transfer, debit/credit card, etc.)</li>
                </ul>
                <p className="mt-2">
                  If you're buying on finance, you may also need proof of income and bank statements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I know the car's history?</AccordionTrigger>
              <AccordionContent>
                <p>
                  All cars listed on KashiAndKarz come with a free basic vehicle history check. This includes
                  information about the car's MOT history, mileage records, and whether it has been reported as stolen
                  or written off.
                </p>
                <p className="mt-2">
                  For a more comprehensive check, you can purchase a full vehicle history report, which includes
                  additional information such as outstanding finance, plate changes, and more detailed accident history.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="selling" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I list my car for sale on KashiAndKarz?</AccordionTrigger>
              <AccordionContent>
                <p>Listing your car on KashiAndKarz is easy:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Click on "Sell My Car" in the navigation menu</li>
                  <li>Enter your car's registration number and mileage</li>
                  <li>Provide details about your car's condition and features</li>
                  <li>Upload photos of your car</li>
                  <li>Set your asking price</li>
                  <li>Review and publish your listing</li>
                </ol>
                <p className="mt-2">Your listing will be live on our site within 24 hours after our team reviews it.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How much does it cost to sell my car on KashiAndKarz?</AccordionTrigger>
              <AccordionContent>
                <p>We offer several selling options:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Basic listing: Free for 14 days</li>
                  <li>Standard listing: £19.99 for 30 days</li>
                  <li>Premium listing: £29.99 for 30 days with featured placement</li>
                </ul>
                <p className="mt-2">
                  If you choose our Instant Offer service, there are no upfront fees. We simply provide you with a
                  guaranteed purchase price for your car.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How long will it take to sell my car?</AccordionTrigger>
              <AccordionContent>
                <p>
                  The time it takes to sell your car depends on various factors, including the make, model, condition,
                  price, and current market demand. On average, cars listed at competitive prices sell within 2-3 weeks.
                </p>
                <p className="mt-2">
                  If you need to sell quickly, our Instant Offer service guarantees a purchase within 24-48 hours,
                  though the price may be lower than what you might achieve through a private sale.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What documents do I need to sell my car?</AccordionTrigger>
              <AccordionContent>
                <p>When selling your car, you'll need:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>V5C registration document (logbook)</li>
                  <li>Service history and maintenance records</li>
                  <li>MOT certificate (if applicable)</li>
                  <li>User manuals and spare keys</li>
                  <li>Proof of purchase if you're the first owner</li>
                </ul>
                <p className="mt-2">
                  Having these documents ready will make the selling process smoother and may help you achieve a better
                  price.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I get the best price for my car?</AccordionTrigger>
              <AccordionContent>
                <p>To get the best price for your car:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Clean your car thoroughly inside and out</li>
                  <li>Take high-quality photos from multiple angles</li>
                  <li>Provide a detailed and honest description</li>
                  <li>Include all service history and maintenance records</li>
                  <li>Set a competitive price based on similar cars in the market</li>
                  <li>Be responsive to inquiries and flexible with viewings</li>
                </ul>
                <p className="mt-2">
                  Consider getting a professional valuation to ensure your asking price is realistic.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What finance options are available?</AccordionTrigger>
              <AccordionContent>
                <p>We offer several finance options to help you purchase your car:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    <strong>Personal Contract Purchase (PCP)</strong>: Lower monthly payments with a final balloon
                    payment if you want to keep the car
                  </li>
                  <li>
                    <strong>Hire Purchase (HP)</strong>: Fixed monthly payments until you own the car outright
                  </li>
                  <li>
                    <strong>Personal Contract Hire (PCH)</strong>: Essentially a long-term rental with no option to buy
                  </li>
                  <li>
                    <strong>Personal Loan</strong>: Borrow the money to buy the car outright from the start
                  </li>
                </ul>
                <p className="mt-2">
                  You can use our finance calculator to see which option works best for your budget.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I apply for finance?</AccordionTrigger>
              <AccordionContent>
                <p>Applying for finance on KashiAndKarz is simple:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Find a car you're interested in</li>
                  <li>Click on "Apply for Finance" on the car listing page</li>
                  <li>Fill out the application form with your personal and financial details</li>
                  <li>Submit your application</li>
                  <li>Receive a decision, usually within 24 hours</li>
                </ol>
                <p className="mt-2">
                  If approved, you can proceed with the purchase. Our finance partners will guide you through the rest
                  of the process.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What is the difference between PCP and HP finance?</AccordionTrigger>
              <AccordionContent>
                <p>The main differences between PCP (Personal Contract Purchase) and HP (Hire Purchase) are:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    <strong>PCP</strong>: Lower monthly payments, but you'll need to make a larger final payment
                    (balloon payment) if you want to keep the car. Alternatively, you can return the car or trade it in
                    for a new one.
                  </li>
                  <li>
                    <strong>HP</strong>: Higher monthly payments, but once you've made all the payments, you own the car
                    outright with no final balloon payment.
                  </li>
                </ul>
                <p className="mt-2">
                  PCP is more flexible but can be more expensive overall if you decide to keep the car. HP is more
                  straightforward and often better if you plan to keep the car long-term.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Will my credit score affect my finance application?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, your credit score is one of the factors that finance providers consider when assessing your
                  application. A higher credit score generally means you're more likely to be approved and may be
                  offered better interest rates.
                </p>
                <p className="mt-2">
                  However, even if you have a less-than-perfect credit history, we work with a range of lenders who
                  specialize in different circumstances, so you may still be able to get finance.
                </p>
                <p className="mt-2">
                  Before applying, you might want to check your credit score using a free service like Experian or
                  ClearScore.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Can I pay off my finance early?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, you can usually pay off your finance agreement early, which is known as an early settlement. This
                  can potentially save you money on interest.
                </p>
                <p className="mt-2">
                  However, some finance agreements may include early repayment charges. The exact terms will depend on
                  your specific agreement and the finance provider.
                </p>
                <p className="mt-2">
                  To get an early settlement figure, you'll need to contact your finance provider directly. They'll tell
                  you exactly how much you need to pay to settle the agreement and whether there are any additional
                  fees.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create an account?</AccordionTrigger>
              <AccordionContent>
                <p>Creating an account on KashiAndKarz is easy:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Click on "Sign Up" in the top right corner of the page</li>
                  <li>Enter your email address and create a password</li>
                  <li>Verify your email address by clicking the link in the confirmation email</li>
                  <li>Complete your profile with your personal details</li>
                </ol>
                <p className="mt-2">
                  Once your account is created, you can save favorite cars, set up alerts, track your searches, and
                  more.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                <p>If you've forgotten your password:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Click on "Log In" in the top right corner of the page</li>
                  <li>Click on "Forgot Password?"</li>
                  <li>Enter the email address associated with your account</li>
                  <li>Check your email for a password reset link</li>
                  <li>Click the link and follow the instructions to create a new password</li>
                </ol>
                <p className="mt-2">
                  If you don't receive the email, check your spam folder or contact our customer support team for
                  assistance.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do I update my account details?</AccordionTrigger>
              <AccordionContent>
                <p>To update your account details:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Log in to your account</li>
                  <li>Click on your profile icon in the top right corner</li>
                  <li>Select "Account Settings"</li>
                  <li>Update your personal information, contact details, or preferences</li>
                  <li>Click "Save Changes"</li>
                </ol>
                <p className="mt-2">
                  You can update your name, email address, phone number, address, and communication preferences at any
                  time.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I save cars to my favorites?</AccordionTrigger>
              <AccordionContent>
                <p>To save a car to your favorites:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Find a car you're interested in</li>
                  <li>Click the heart icon on the car listing</li>
                  <li>The car will be added to your favorites</li>
                </ol>
                <p className="mt-2">
                  You can view all your saved cars by clicking on your profile icon and selecting "Favorites". From
                  there, you can also remove cars from your favorites or set up alerts for price changes.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I delete my account?</AccordionTrigger>
              <AccordionContent>
                <p>If you wish to delete your account:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Log in to your account</li>
                  <li>Click on your profile icon in the top right corner</li>
                  <li>Select "Account Settings"</li>
                  <li>Scroll to the bottom and click "Delete Account"</li>
                  <li>Confirm your decision</li>
                </ol>
                <p className="mt-2">
                  Please note that account deletion is permanent and cannot be undone. All your personal data, saved
                  cars, and search history will be permanently removed from our systems.
                </p>
                <p className="mt-2">
                  If you have any active listings or ongoing transactions, please resolve these before deleting your
                  account.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted rounded-xl p-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">
            Our customer support team is here to help. Contact us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">Live Chat</Button>
            <Button>Contact Support</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

