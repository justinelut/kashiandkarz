"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Plus, Minus, ChevronRight, ChevronLeft, Check, Star, ThumbsUp, ThumbsDown, X, MessageCircle, Clock, Package, User } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
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
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

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
  slug:string
}

// Custom Rating Stars component with improved styling
const ModernRatingStars = ({ rating, onChange, size = "md", interactive = false }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => interactive && onChange(value)}
          className={cn(
            "transition-all duration-200 rounded-full p-1",
            interactive && "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/30"
          )}
          disabled={!interactive}
          aria-label={`Rate ${value} stars`}
        >
          <Star
            className={cn(
              size === "lg" ? "w-10 h-10" : size === "md" ? "w-8 h-8" : "w-6 h-6",
              value <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-muted-foreground/40",
              interactive && "cursor-pointer"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export function ReviewForm({ carId, userId, carName, dealer, businessId, slug }: ReviewFormProps) {
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
  const recommend = watch("recommend")

  const handleRatingChange = (value: number) => {
    setValue("rating", value, { shouldValidate: true })
  }

  const addPro = () => {
    if (newPro.trim() && pros.length < 5) {
      const updatedPros = [...pros, newPro.trim()]
      setPros(updatedPros)
      setValue("pros", updatedPros, { shouldValidate: true })
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
      const updatedCons = [...cons, newCon.trim()]
      setCons(updatedCons)
      setValue("cons", updatedCons, { shouldValidate: true })
      setNewCon("")
    }
  }

  const removeCon = (index: number) => {
    const updatedCons = cons.filter((_, i) => i !== index)
    setCons(updatedCons)
    setValue("cons", updatedCons, { shouldValidate: true })
  }

  const nextStep = async () => {
    if (step === 1) {
      // Validate first step fields before proceeding
      const isValid = await trigger(["rating", "title", "comment"])
      if (isValid) setStep(step + 1)
    } else {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const onSubmit = (data: ReviewFormData) => {
    // Ensure pros and cons are included in the data
    const finalData = {
      ...data,
      pros: pros,
      cons: cons
    }
    // Use TanStack mutation to submit the form
    mutate(finalData)
  }

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false)
    router.push(`/car/${slug}`)
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
  
  // Progress percentage for progress bar
  const progressPercentage = ((step - 1) / 2) * 100;

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto border-none shadow-lg bg-white dark:bg-black">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Review {carName}</CardTitle>
        </CardHeader>

        <CardContent className="px-6 pt-8 pb-0">
          {/* Step indicators */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center ${
                    i < step ? "text-blue-500" : i === step ? "text-blue-600 font-bold" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full mb-2 transition-all",
                      i < step
                        ? "bg-blue-500 text-white"
                        : i === step
                          ? "border-2 border-blue-500 text-blue-600"
                          : "border-2 border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {i < step ? <Check className="h-5 w-5" /> : i}
                  </div>
                  <span className="text-xs sm:text-sm">
                    {i === 1 ? "Your Rating" : i === 2 ? "Pros & Cons" : "Details"}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <form id="review-form" onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Label className={cn("text-lg font-semibold", errors.rating ? "text-destructive" : "")}>
                      How would you rate this car?<span className="text-destructive"> *</span>
                    </Label>
                    <div className="flex justify-center py-6">
                      <ModernRatingStars rating={rating} size="lg" interactive={true} onChange={handleRatingChange} />
                    </div>
                    {errors.rating && (
                      <p className="text-sm text-destructive mt-1">{errors.rating.message || "Rating is required"}</p>
                    )}
                    {rating > 0 && (
                      <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500">
                        {rating === 5 ? "Excellent" : 
                         rating === 4 ? "Very Good" : 
                         rating === 3 ? "Good" : 
                         rating === 2 ? "Fair" : "Poor"}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className={cn("text-base font-medium", errors.title ? "text-destructive" : "")}>
                      Review Title<span className="text-destructive"> *</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Summarize your experience in a few words"
                      className={cn(
                        "text-lg py-6 transition-all border-2 focus:border-blue-400 focus:ring-blue-400",
                        errors.title ? "border-destructive" : ""
                      )}
                      {...register("title")}
                    />
                    {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground mt-1">
                        {title ? `${title.length}/300 characters` : "0/300 characters"}
                      </p>
                      {title && title.length >= 3 && <Check className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment" className={cn("text-base font-medium flex items-center gap-2", errors.comment ? "text-destructive" : "")}>
                      <MessageCircle className="h-4 w-4" /> 
                      Your Review<span className="text-destructive"> *</span>
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="Share your detailed experience with this car... What did you love? What surprised you? What could be improved?"
                      className={cn(
                        "min-h-[180px] resize-y border-2 focus:border-blue-400 focus:ring-blue-400", 
                        errors.comment ? "border-destructive" : ""
                      )}
                      {...register("comment")}
                    />
                    {errors.comment && <p className="text-sm text-destructive mt-1">{errors.comment.message}</p>}
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">
                        {comment ? `${comment.length}/1000 characters (minimum 20)` : "0/1000 characters (minimum 20)"}
                      </p>
                      {comment && comment.length >= 20 && <Check className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      Would you recommend this car?
                    </Label>
                    <div className="flex gap-4 justify-center p-2">
                      <Button
                        type="button"
                        className={cn(
                          "flex-1 flex items-center gap-2 py-6",
                          recommend
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-muted hover:bg-muted/80"
                          )}
                          onClick={() => setValue("recommend", true, { shouldValidate: true })}
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span>Yes, I recommend</span>
                        </Button>
                        <Button
                          type="button"
                          className={cn(
                            "flex-1 flex items-center gap-2 py-6",
                            !recommend
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-muted hover:bg-muted/80"
                          )}
                          onClick={() => setValue("recommend", false, { shouldValidate: true })}
                        >
                          <ThumbsDown className="h-5 w-5" />
                          <span>No, I don't recommend</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
  
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-medium flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5" />
                      What did you like about this car? (Optional)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a pro (e.g., Great fuel efficiency)"
                        value={newPro}
                        onChange={(e) => setNewPro(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addPro}
                        disabled={!newPro.trim() || pros.length >= 5}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
  
                    {pros.length > 0 ? (
                      <ul className="space-y-2">
                        {pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <span>{pro}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removePro(index)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No pros added yet</p>
                    )}
                  </div>
  
                  <div className="space-y-4">
                    <Label className="text-lg font-medium flex items-center gap-2">
                      <ThumbsDown className="h-5 w-5" />
                      What could be improved? (Optional)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a con (e.g., Limited trunk space)"
                        value={newCon}
                        onChange={(e) => setNewCon(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addCon}
                        disabled={!newCon.trim() || cons.length >= 5}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
  
                    {cons.length > 0 ? (
                      <ul className="space-y-2">
                        {cons.map((con, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <span>{con}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCon(index)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.li>
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
                  <div className="space-y-4">
                    <Label className="text-lg font-medium flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      How long have you owned this car?
                    </Label>
                    <RadioGroup
                      defaultValue="1-6-months"
                      onValueChange={(value) =>
                        setValue("ownership_duration", value as any, { shouldValidate: true })
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      {[
                        { value: "less-than-month", label: "Less than a month" },
                        { value: "1-6-months", label: "1-6 months" },
                        { value: "6-12-months", label: "6-12 months" },
                        { value: "1-3-years", label: "1-3 years" },
                        { value: "3-plus-years", label: "3+ years" },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2 p-4 bg-muted rounded-lg hover:bg-muted/80"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
  
                  <div className="space-y-4">
                    <Label className="text-lg font-medium flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      How did you acquire this car?
                    </Label>
                    <RadioGroup
                      defaultValue="used"
                      onValueChange={(value) =>
                        setValue("purchase_type", value as any, { shouldValidate: true })
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      {[
                        { value: "new", label: "Purchased new" },
                        { value: "used", label: "Purchased used" },
                        { value: "leased", label: "Leased" },
                        { value: "rented", label: "Rented" },
                        { value: "test-drive", label: "Test drive" },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2 p-4 bg-muted rounded-lg hover:bg-muted/80"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
  
                  <div className="flex items-start space-x-2 p-4 bg-muted rounded-lg">
                    <Checkbox
                      id="verified-purchase"
                      onCheckedChange={(checked) => {
                        setValue("verified_purchase", checked === true, { shouldValidate: true });
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
  
          <CardFooter className="flex justify-between p-6 border-t">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            )}
  
            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={step === 1 && !currentStepIsValid()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                form="review-form"
                disabled={isPending}
                className="bg-green-500 hover:bg-green-600"
              >
                {isPending ? "Submitting..." : "Submit Review"}
              </Button>
            )}
          </CardFooter>
        </Card>
  
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-green-500">Review Submitted Successfully!</DialogTitle>
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
    );
  }