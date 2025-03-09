"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CarSearch() {
  return (
    <section className="bg-white py-8">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-4 shadow-lg md:p-6">
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="new">New cars</TabsTrigger>
              <TabsTrigger value="used">Used cars</TabsTrigger>
              <TabsTrigger value="leasing">Leasing</TabsTrigger>
            </TabsList>
            <TabsContent value="new" className="mt-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="text-sm font-medium">Make</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Any make</option>
                      <option>BMW</option>
                      <option>Audi</option>
                      <option>Mercedes</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Model</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Any model</option>
                      <option>M5</option>
                      <option>3 Series</option>
                      <option>5 Series</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Budget</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>No max</option>
                      <option>£20,000</option>
                      <option>£30,000</option>
                      <option>£50,000</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <Button className="mt-7">Search</Button>
              </div>
            </TabsContent>
            <TabsContent value="used" className="mt-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="text-sm font-medium">Make</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Any make</option>
                      <option>BMW</option>
                      <option>Audi</option>
                      <option>Mercedes</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Model</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Any model</option>
                      <option>M5</option>
                      <option>3 Series</option>
                      <option>5 Series</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Max price</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>No max</option>
                      <option>£10,000</option>
                      <option>£20,000</option>
                      <option>£30,000</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <Button className="mt-7">Search</Button>
              </div>
            </TabsContent>
            <TabsContent value="leasing" className="mt-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="text-sm font-medium">Make</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Any make</option>
                      <option>BMW</option>
                      <option>Audi</option>
                      <option>Mercedes</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Model</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Any model</option>
                      <option>M5</option>
                      <option>3 Series</option>
                      <option>5 Series</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Monthly budget</label>
                  <div className="relative mt-1">
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>No max</option>
                      <option>£200</option>
                      <option>£300</option>
                      <option>£500</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <Button className="mt-7">Search</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

