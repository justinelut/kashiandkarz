"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/layouts/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InfoIcon, Calculator, Calendar, Percent, PoundSterling } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function FinanceCalculatorPage() {
  // PCP Finance state
  const [pcpCarPrice, setPcpCarPrice] = useState(30000)
  const [pcpDeposit, setPcpDeposit] = useState(3000)
  const [pcpTerm, setPcpTerm] = useState(48)
  const [pcpMileage, setPcpMileage] = useState(8000)
  const [pcpInterestRate, setPcpInterestRate] = useState(5.9)
  const [pcpFinalPayment, setPcpFinalPayment] = useState(0)
  const [pcpMonthlyPayment, setPcpMonthlyPayment] = useState(0)
  const [pcpTotalPayable, setPcpTotalPayable] = useState(0)

  // HP Finance state
  const [hpCarPrice, setHpCarPrice] = useState(30000)
  const [hpDeposit, setHpDeposit] = useState(3000)
  const [hpTerm, setHpTerm] = useState(60)
  const [hpInterestRate, setHpInterestRate] = useState(6.9)
  const [hpMonthlyPayment, setHpMonthlyPayment] = useState(0)
  const [hpTotalPayable, setHpTotalPayable] = useState(0)

  // Leasing state
  const [leasingCarPrice, setLeasingCarPrice] = useState(30000)
  const [leasingInitialRental, setLeasingInitialRental] = useState(3)
  const [leasingTerm, setLeasingTerm] = useState(36)
  const [leasingMileage, setLeasingMileage] = useState(8000)
  const [leasingMonthlyPayment, setLeasingMonthlyPayment] = useState(0)
  const [leasingTotalPayable, setLeasingTotalPayable] = useState(0)

  // Calculate PCP finance
  useEffect(() => {
    // Estimate final payment (balloon payment) - typically 35-40% of car value
    const estimatedFinalPayment = pcpCarPrice * 0.4
    setPcpFinalPayment(estimatedFinalPayment)

    // Calculate amount to finance
    const amountToFinance = pcpCarPrice - pcpDeposit

    // Calculate interest
    const monthlyInterestRate = pcpInterestRate / 100 / 12
    const totalInterest = amountToFinance * (pcpInterestRate / 100) * (pcpTerm / 12)

    // Calculate monthly payment (excluding final payment)
    const totalExcludingFinal = amountToFinance - estimatedFinalPayment + totalInterest
    const monthlyPayment = totalExcludingFinal / pcpTerm

    // Calculate total payable
    const totalPayable = pcpDeposit + monthlyPayment * pcpTerm + estimatedFinalPayment

    setPcpMonthlyPayment(monthlyPayment)
    setPcpTotalPayable(totalPayable)
  }, [pcpCarPrice, pcpDeposit, pcpTerm, pcpMileage, pcpInterestRate])

  // Calculate HP finance
  useEffect(() => {
    // Calculate amount to finance
    const amountToFinance = hpCarPrice - hpDeposit

    // Calculate interest
    const monthlyInterestRate = hpInterestRate / 100 / 12

    // Calculate monthly payment using loan formula
    const monthlyPayment =
      (amountToFinance * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, hpTerm)) /
      (Math.pow(1 + monthlyInterestRate, hpTerm) - 1)

    // Calculate total payable
    const totalPayable = hpDeposit + monthlyPayment * hpTerm

    setHpMonthlyPayment(monthlyPayment)
    setHpTotalPayable(totalPayable)
  }, [hpCarPrice, hpDeposit, hpTerm, hpInterestRate])

  // Calculate Leasing
  useEffect(() => {
    // Simplified leasing calculation
    // In reality, this would be more complex and based on depreciation, fees, etc.
    const initialPayment = leasingCarPrice * 0.01 * leasingInitialRental

    // Monthly payment calculation (simplified)
    // Typically based on depreciation, interest, and fees
    const depreciationFactor = 1 - (0.15 + leasingMileage / 80000) // Higher mileage = higher depreciation
    const residualValue = leasingCarPrice * depreciationFactor * (1 - leasingTerm / 120)
    const totalDepreciation = leasingCarPrice - residualValue
    const interestComponent = ((leasingCarPrice + residualValue) / 2) * 0.04 * (leasingTerm / 12)
    const totalLeaseAmount = totalDepreciation + interestComponent

    // Subtract initial payment and divide by term
    const remainingAmount = totalLeaseAmount - initialPayment
    const monthlyPayment = remainingAmount / leasingTerm

    // Calculate total payable
    const totalPayable = initialPayment + monthlyPayment * leasingTerm

    setLeasingMonthlyPayment(monthlyPayment)
    setLeasingTotalPayable(totalPayable)
  }, [leasingCarPrice, leasingInitialRental, leasingTerm, leasingMileage])

  return (
    <PageLayout
      title="Car Finance Calculator"
      description="Calculate your monthly payments with our car finance calculator."
      breadcrumbs={[{ label: "Finance Calculator", href: "/finance-calculator" }]}
    >
      <div className="mb-8">
        <p className="text-lg">
          Use our car finance calculator to see how much your monthly payments could be. Choose between Personal
          Contract Purchase (PCP), Hire Purchase (HP), or Leasing options.
        </p>
      </div>

      <Tabs defaultValue="pcp" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pcp">PCP Finance</TabsTrigger>
          <TabsTrigger value="hp">HP Finance</TabsTrigger>
          <TabsTrigger value="leasing">Car Leasing</TabsTrigger>
        </TabsList>

        {/* PCP Finance Calculator */}
        <TabsContent value="pcp">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  PCP Finance Calculator
                </CardTitle>
                <CardDescription>
                  Personal Contract Purchase - pay a deposit, monthly payments, and an optional final payment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="pcp-car-price" className="text-sm font-medium">
                      Car Price
                    </label>
                    <div className="flex items-center">
                      <PoundSterling className="h-4 w-4 mr-1" />
                      <Input
                        id="pcp-car-price"
                        type="number"
                        value={pcpCarPrice}
                        onChange={(e) => setPcpCarPrice(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[pcpCarPrice]}
                    min={5000}
                    max={100000}
                    step={500}
                    onValueChange={(value) => setPcpCarPrice(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>£5,000</span>
                    <span>£100,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="pcp-deposit" className="text-sm font-medium">
                      Deposit
                    </label>
                    <div className="flex items-center">
                      <PoundSterling className="h-4 w-4 mr-1" />
                      <Input
                        id="pcp-deposit"
                        type="number"
                        value={pcpDeposit}
                        onChange={(e) => setPcpDeposit(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[pcpDeposit]}
                    min={0}
                    max={pcpCarPrice * 0.5}
                    step={100}
                    onValueChange={(value) => setPcpDeposit(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>£0</span>
                    <span>£{(pcpCarPrice * 0.5).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="pcp-term" className="text-sm font-medium">
                      Term (months)
                    </label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <Input
                        id="pcp-term"
                        type="number"
                        value={pcpTerm}
                        onChange={(e) => setPcpTerm(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[pcpTerm]}
                    min={24}
                    max={60}
                    step={6}
                    onValueChange={(value) => setPcpTerm(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>24 months</span>
                    <span>60 months</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="pcp-mileage" className="text-sm font-medium">
                      Annual Mileage
                    </label>
                    <Input
                      id="pcp-mileage"
                      type="number"
                      value={pcpMileage}
                      onChange={(e) => setPcpMileage(Number(e.target.value))}
                      className="w-24 text-right"
                    />
                  </div>
                  <Slider
                    value={[pcpMileage]}
                    min={5000}
                    max={30000}
                    step={1000}
                    onValueChange={(value) => setPcpMileage(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5,000 miles</span>
                    <span>30,000 miles</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label htmlFor="pcp-interest-rate" className="text-sm font-medium mr-1">
                        Interest Rate (APR)
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              The Annual Percentage Rate (APR) is the cost of credit expressed as a yearly rate.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 mr-1" />
                      <Input
                        id="pcp-interest-rate"
                        type="number"
                        value={pcpInterestRate}
                        onChange={(e) => setPcpInterestRate(Number(e.target.value))}
                        className="w-24 text-right"
                        step={0.1}
                      />
                    </div>
                  </div>
                  <Slider
                    value={[pcpInterestRate]}
                    min={0}
                    max={15}
                    step={0.1}
                    onValueChange={(value) => setPcpInterestRate(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your PCP Finance Quote</CardTitle>
                <CardDescription>Based on your selections, here's your estimated payment plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="text-4xl font-bold mt-1">£{pcpMonthlyPayment.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mt-1">{pcpTerm} monthly payments</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-sm text-muted-foreground">Deposit</div>
                      <div className="text-xl font-semibold">£{pcpDeposit.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Final Payment</div>
                      <div className="text-xl font-semibold">£{pcpFinalPayment.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Amount Payable</div>
                      <div className="text-xl font-semibold">£{pcpTotalPayable.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Cost of Credit</div>
                      <div className="text-xl font-semibold">£{(pcpTotalPayable - pcpCarPrice).toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">About PCP Finance</h3>
                  <p className="text-sm text-muted-foreground">
                    Personal Contract Purchase (PCP) is a type of car finance where you pay an initial deposit followed
                    by monthly payments over a term. At the end of the agreement, you have three options:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>1. Pay the final payment (balloon payment) to own the car</li>
                    <li>2. Return the car with nothing more to pay (subject to mileage and condition)</li>
                    <li>3. Part-exchange for a new car</li>
                  </ul>
                </div>

                <Button className="w-full">Apply for PCP Finance</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* HP Finance Calculator */}
        <TabsContent value="hp">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  HP Finance Calculator
                </CardTitle>
                <CardDescription>
                  Hire Purchase - pay a deposit followed by fixed monthly payments until you own the car.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="hp-car-price" className="text-sm font-medium">
                      Car Price
                    </label>
                    <div className="flex items-center">
                      <PoundSterling className="h-4 w-4 mr-1" />
                      <Input
                        id="hp-car-price"
                        type="number"
                        value={hpCarPrice}
                        onChange={(e) => setHpCarPrice(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[hpCarPrice]}
                    min={5000}
                    max={100000}
                    step={500}
                    onValueChange={(value) => setHpCarPrice(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>£5,000</span>
                    <span>£100,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="hp-deposit" className="text-sm font-medium">
                      Deposit
                    </label>
                    <div className="flex items-center">
                      <PoundSterling className="h-4 w-4 mr-1" />
                      <Input
                        id="hp-deposit"
                        type="number"
                        value={hpDeposit}
                        onChange={(e) => setHpDeposit(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[hpDeposit]}
                    min={0}
                    max={hpCarPrice * 0.5}
                    step={100}
                    onValueChange={(value) => setHpDeposit(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>£0</span>
                    <span>£{(hpCarPrice * 0.5).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="hp-term" className="text-sm font-medium">
                      Term (months)
                    </label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <Input
                        id="hp-term"
                        type="number"
                        value={hpTerm}
                        onChange={(e) => setHpTerm(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                  <Slider value={[hpTerm]} min={12} max={72} step={6} onValueChange={(value) => setHpTerm(value[0])} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>12 months</span>
                    <span>72 months</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label htmlFor="hp-interest-rate" className="text-sm font-medium mr-1">
                        Interest Rate (APR)
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              The Annual Percentage Rate (APR) is the cost of credit expressed as a yearly rate.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 mr-1" />
                      <Input
                        id="hp-interest-rate"
                        type="number"
                        value={hpInterestRate}
                        onChange={(e) => setHpInterestRate(Number(e.target.value))}
                        className="w-24 text-right"
                        step={0.1}
                      />
                    </div>
                  </div>
                  <Slider
                    value={[hpInterestRate]}
                    min={0}
                    max={15}
                    step={0.1}
                    onValueChange={(value) => setHpInterestRate(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your HP Finance Quote</CardTitle>
                <CardDescription>Based on your selections, here's your estimated payment plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="text-4xl font-bold mt-1">£{hpMonthlyPayment.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mt-1">{hpTerm} monthly payments</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-sm text-muted-foreground">Deposit</div>
                      <div className="text-xl font-semibold">£{hpDeposit.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Amount Payable</div>
                      <div className="text-xl font-semibold">£{hpTotalPayable.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Cost of Credit</div>
                      <div className="text-xl font-semibold">£{(hpTotalPayable - hpCarPrice).toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Interest Rate (APR)</div>
                      <div className="text-xl font-semibold">{hpInterestRate}%</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">About HP Finance</h3>
                  <p className="text-sm text-muted-foreground">
                    Hire Purchase (HP) is a straightforward way to finance your car. You pay a deposit followed by fixed
                    monthly payments. Once all payments are made, you own the car outright.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• You own the car at the end of the agreement</li>
                    <li>• No mileage restrictions</li>
                    <li>• No large final payment</li>
                    <li>• Fixed interest rate for the duration of the agreement</li>
                  </ul>
                </div>

                <Button className="w-full">Apply for HP Finance</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leasing Calculator */}
        <TabsContent value="leasing">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Car Leasing Calculator
                </CardTitle>
                <CardDescription>
                  Personal Contract Hire - pay an initial rental followed by fixed monthly payments.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="leasing-car-price" className="text-sm font-medium">
                      Car Price
                    </label>
                    <div className="flex items-center">
                      <PoundSterling className="h-4 w-4 mr-1" />
                      <Input
                        id="leasing-car-price"
                        type="number"
                        value={leasingCarPrice}
                        onChange={(e) => setLeasingCarPrice(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[leasingCarPrice]}
                    min={10000}
                    max={100000}
                    step={1000}
                    onValueChange={(value) => setLeasingCarPrice(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>£10,000</span>
                    <span>£100,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <label htmlFor="leasing-initial-rental" className="text-sm font-medium mr-1">
                        Initial Rental (months)
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              The initial rental is a multiple of your monthly payment, typically 3, 6, or 9 months.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="leasing-initial-rental"
                      type="number"
                      value={leasingInitialRental}
                      onChange={(e) => setLeasingInitialRental(Number(e.target.value))}
                      className="w-24 text-right"
                    />
                  </div>
                  <Slider
                    value={[leasingInitialRental]}
                    min={1}
                    max={12}
                    step={1}
                    onValueChange={(value) => setLeasingInitialRental(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 month</span>
                    <span>12 months</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="leasing-term" className="text-sm font-medium">
                      Term (months)
                    </label>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <Input
                        id="leasing-term"
                        type="number"
                        value={leasingTerm}
                        onChange={(e) => setLeasingTerm(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[leasingTerm]}
                    min={24}
                    max={48}
                    step={6}
                    onValueChange={(value) => setLeasingTerm(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>24 months</span>
                    <span>48 months</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="leasing-mileage" className="text-sm font-medium">
                      Annual Mileage
                    </label>
                    <Input
                      id="leasing-mileage"
                      type="number"
                      value={leasingMileage}
                      onChange={(e) => setLeasingMileage(Number(e.target.value))}
                      className="w-24 text-right"
                    />
                  </div>
                  <Slider
                    value={[leasingMileage]}
                    min={5000}
                    max={30000}
                    step={1000}
                    onValueChange={(value) => setLeasingMileage(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5,000 miles</span>
                    <span>30,000 miles</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Leasing Quote</CardTitle>
                <CardDescription>Based on your selections, here's your estimated payment plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="text-4xl font-bold mt-1">£{leasingMonthlyPayment.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground mt-1">{leasingTerm} monthly payments</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <div className="text-sm text-muted-foreground">Initial Rental</div>
                      <div className="text-xl font-semibold">
                        £{(leasingMonthlyPayment * leasingInitialRental).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">{leasingInitialRental} months</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Amount Payable</div>
                      <div className="text-xl font-semibold">£{leasingTotalPayable.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Annual Mileage</div>
                      <div className="text-xl font-semibold">{leasingMileage.toLocaleString()} miles</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Contract Length</div>
                      <div className="text-xl font-semibold">{leasingTerm} months</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">About Car Leasing</h3>
                  <p className="text-sm text-muted-foreground">
                    Car leasing (Personal Contract Hire) is a long-term rental agreement. You pay an initial rental
                    followed by fixed monthly payments for the duration of the contract.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• You never own the car</li>
                    <li>• Return the car at the end of the agreement</li>
                    <li>• Fixed monthly payments</li>
                    <li>• Includes road tax for the duration of the contract</li>
                    <li>• Excess mileage charges apply if you exceed your agreed mileage</li>
                  </ul>
                </div>

                <Button className="w-full">Apply for Car Leasing</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted rounded-xl p-8">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Need help with car finance?</h2>
            <p className="mb-6">
              Our team of finance experts are here to help you find the best deal for your circumstances.
            </p>
            <Button size="lg">Speak to an advisor</Button>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Car finance advisor"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

