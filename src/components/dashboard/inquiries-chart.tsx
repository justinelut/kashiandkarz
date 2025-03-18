"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface InquiriesChartProps {
  data: {
    name: string
    callbacks: number
    messages: number
    testDrives: number
  }[]
}

export function InquiriesChart({ data }: InquiriesChartProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Inquiries</CardTitle>
        <CardDescription>Breakdown of inquiries over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer
          config={{
            callbacks: {
              label: "Callbacks",
              color: "hsl(var(--chart-1))",
            },
            messages: {
              label: "Messages",
              color: "hsl(var(--chart-2))",
            },
            testDrives: {
              label: "Test Drives",
              color: "hsl(var(--chart-3))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="callbacks" fill="var(--color-callbacks)" />
              <Bar dataKey="messages" fill="var(--color-messages)" />
              <Bar dataKey="testDrives" fill="var(--color-testDrives)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

