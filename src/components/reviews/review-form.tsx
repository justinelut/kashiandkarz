"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Plus, Minus, ChevronRight, ChevronLeft, Check } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { RatingStars } from "@/components/reviews/rating-stars"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { submitReview } from "@/lib/review-actions"
import { toast } from "@/hooks/use-toast"

// Define Zod schema for form validation
const reviewSchema = z.object({
  rating: z.number().min(1, { message: "Please select a rating" }).max(5),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(300),
  comment: z.string().min(20, { message: "Review must be at least 20 characters" }).max(1000),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  recommend: z.boolean(),
  ownership_duration: z.enum([
    "less-than-month",
    "1-6-months",
    "6-12-months",
    "1-3-years",
    "3-plus-years"
  ]),
  purchase_type: z.enum(["new", "used", "leased", "rented", "test-drive"]),
  verified_purchase: z.boolean().default(false),
})

// Infer TypeScript type from Zod schema
type ReviewFormData = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  carId: string
  userId: string
  carName: string
  dealer: string
  businessId: string
}

export function ReviewForm({ carId, userId, carName, dealer, businessId }: ReviewFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [pros, setPros] = useState<string[]>([])
  const [cons, setCons] = useState<string[]>([])
  const [newPro, setNewPro] = useState("")
  const [newCon, setNewCon] = useState("")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Set up form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    mode: "onChange", // Validate on change for real-time feedback
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
      pros: [],
      cons: [],
      recommend: true,
      ownership_duration: "1-6-months",
      purchase_type: "used",
      verified_purchase: false,
    },
  })

  // TanStack Query v5 mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      return await submitReview(data, carId, userId, dealer, businessId)
    },
    onSuccess: (result) => {
      if (result.success) {
        setShowSuccessDialog(true)
        // Optionally revalidate the path to show updated reviews
        router.refresh()
      } else {
        toast({
          title: "Error submitting review",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    },
    onError: (error) => {
      console.error("Error submitting review:", error)
      toast({
        title: "Error submitting review",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    },
  })

  const rating = watch("rating")
  const title = watch("title")
  const comment = watch("comment")

  const handleRatingChange = (value: number) => {
    setValue("rating", value, { shouldValidate: true })
  }

  const addPro = () => {
    if (newPro.trim() && pros.length < 5) {
      setPros([...pros, newPro.trim()])
      setValue("pros", [...pros, newPro.trim()], { shouldValidate: true })
      setNewPro("")
    }
  }

  const removePro = (index: number) => {
    const updatedPros = pros.filter((_, i) => i !== index)
    setPros(updatedPros)
    setValue("pros", updatedPros, { shouldValidate: true })
  }

  const addCon = () => {
    if (newCon.trim() && cons.length < 5) {
      setCons([...cons, newCon.trim()])
      setValue("cons", [...cons, newCon.trim()], { shouldValidate: true })
      setNewCon("")
    }
  }

  const removeCon = (index: number) => {
    const updatedCons = cons.filter((_, i) => i !== index)
    setCons(updatedCons)
    setValue("cons", updatedCons, { shouldValidate: true })
  }

  const nextStep = () => {
    if (step === 1) {
      // Validate first step fields before proceeding
      trigger(["rating", "title", "comment"]).then((isValid) => {
        if (isValid) setStep(step + 1)
      })
    } else {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const onSubmit = (data: ReviewFormData) => {
    // Use TanStack mutation to submit the form
    mutate(data)
  }

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false)
    router.push(`/car/${carId}`)
  }

  // Function to check if fields are valid for current step
  const currentStepIsValid = () => {
    if (step === 1) {
      return rating > 0 && 
        title && title.length >= 3 && 
        comment && comment.length >= 20;
    }
    return true;
  }

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Write a Review for {carName}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex items-center ${
                    i < step ? "text-primary" : i === step ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                      i < step
                        ? "bg-primary text-primary-foreground"
                        : i === step
                          ? "border-2 border-primary text-primary"
                          : "border-2 border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="h-4 w-4" /> : i}
                  </div>
                  <span className="hidden sm:inline">
                    {i === 1 ? "Rating & Review" : i === 2 ? "Pros & Cons" : "Details"}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <form id="review-form" onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className={errors.rating ? "text-destructive" : ""}>
                    Your Rating<span className="text-destructive"> *</span>
                  </Label>
                  <div className="flex justify-center py-4">
                    <RatingStars rating={rating} size="lg" interactive onChange={handleRatingChange} />
                  </div>
                  {errors.rating && (
                    <p className="text-sm text-destructive mt-1">{errors.rating.message || "Rating is required"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>
                    Review Title<span className="text-destructive"> *</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Summarize your experience"
                    className={`text-lg py-6 ${errors.title ? "border-destructive" : ""}`}
                    {...register("title")}
                  />
                  {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
                  {title && <p className="text-xs text-muted-foreground mt-1">{title.length}/100 characters</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment" className={errors.comment ? "text-destructive" : ""}>
                    Your Review<span className="text-destructive"> *</span>
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Share your experience with this car..."
                    className={`min-h-[150px] ${errors.comment ? "border-destructive" : ""}`}
                    {...register("comment")}
                  />
                  {errors.comment && <p className="text-sm text-destructive mt-1">{errors.comment.message}</p>}
                  {comment && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {comment.length}/1000 characters (minimum 20)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Would you recommend this car?</Label>
                  <RadioGroup defaultValue="true" onValueChange={(value) => setValue("recommend", value === "true", { shouldValidate: true })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="recommend-yes" />
                      <Label htmlFor="recommend-yes">Yes, I would recommend this car</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="recommend-no" />
                      <Label htmlFor="recommend-no">No, I would not recommend this car</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>What did you like about this car? (Optional)</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a pro"
                      value={newPro}
                      onChange={(e) => setNewPro(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addPro} disabled={!newPro.trim() || pros.length >= 5}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>

                  {pros.length > 0 ? (
                    <ul className="space-y-2 mt-2">
                      {pros.map((pro, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span>{pro}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removePro(index)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No pros added yet</p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label>What could be improved? (Optional)</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a con"
                      value={newCon}
                      onChange={(e) => setNewCon(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addCon} disabled={!newCon.trim() || cons.length >= 5}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>

                  {cons.length > 0 ? (
                    <ul className="space-y-2 mt-2">
                      {cons.map((con, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span>{con}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeCon(index)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No cons added yet</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>How long have you owned this car?</Label>
                  <RadioGroup
                    defaultValue="1-6-months"
                    onValueChange={(value) => setValue("ownership_duration", value as any, { shouldValidate: true })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="less-than-month" id="less-than-month" />
                      <Label htmlFor="less-than-month">Less than a month</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-6-months" id="1-6-months" />
                      <Label htmlFor="1-6-months">1-6 months</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6-12-months" id="6-12-months" />
                      <Label htmlFor="6-12-months">6-12 months</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-3-years" id="1-3-years" />
                      <Label htmlFor="1-3-years">1-3 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3-plus-years" id="3-plus-years" />
                      <Label htmlFor="3-plus-years">3+ years</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>How did you acquire this car?</Label>
                  <RadioGroup 
                    defaultValue="used" 
                    onValueChange={(value) => setValue("purchase_type", value as any, { shouldValidate: true })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new">Purchased new</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="used" id="used" />
                      <Label htmlFor="used">Purchased used</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="leased" id="leased" />
                      <Label htmlFor="leased">Leased</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rented" id="rented" />
                      <Label htmlFor="rented">Rented</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="test-drive" id="test-drive" />
                      <Label htmlFor="test-drive">Test drive</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="verified-purchase"
                    onCheckedChange={(checked) => {
                      setValue("verified_purchase", checked === true, { shouldValidate: true })
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="verified-purchase"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I purchased this car from Karshi & Karz
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Check this if you purchased the car through our platform
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          )}

          {step < 3 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={step === 1 && !currentStepIsValid()}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" form="review-form" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Review"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Thank you for sharing your experience with this car. Your review will help other customers make informed
              decisions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSuccessDialogClose}>Return to Car Details</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
