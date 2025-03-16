"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/appwrite-provider"
import { createUser } from "@/lib/appwrite"
import { Check, Car, Building2, MapPin, Phone, Mail, User, Lock, LucideIcon, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Define schemas for form validation
const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const dealerProfileSchema = z.object({
  dealerType: z.enum(["independent", "franchise"], {
    required_error: "Please select a dealer type",
  }),
  businessName: z.string().min(2, { message: "Business name is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  specialization: z.array(z.string()).min(1, { message: "Select at least one specialization" }),
  yearsInBusiness: z.enum(["1-5", "6-10", "11-20", "20+"]),
});

// Animated input component with hover and focus effects
const InputWithAnimation = ({ 
  id, 
  type = "text", 
  placeholder, 
  icon: Icon, 
  error, 
  register,
  ...props 
}) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0.9, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "h-12 pl-10 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all duration-200",
          error && "border-red-400 focus-visible:ring-red-400"
        )}
        {...register}
        {...props}
      />
    </motion.div>
  );
};

// Animated button with spring animation
const AnimatedButton = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button 
        className={cn("h-12 rounded-xl text-base font-medium", className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

// Animated radio card with hover effects
const AnimatedRadioCard = ({ 
  id, 
  value, 
  icon: Icon, 
  label,
  register
}) => {
  return (
    <div>
      <RadioGroupItem
        value={value}
        id={id}
        className="peer sr-only"
        {...register}
      />
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.05)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Label
          htmlFor={id}
          className="flex flex-col items-center justify-between rounded-xl border-2 border-gray-200 bg-white p-4 hover:bg-gray-50/70 hover:text-gray-900 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary"
        >
          {Icon && <Icon className="mb-3 h-6 w-6" />}
          <span className="text-sm font-medium">{label}</span>
        </Label>
      </motion.div>
    </div>
  );
};

// Animated checkbox with bounce effect
const AnimatedCheckbox = ({ 
  id, 
  label, 
  error, 
  register,
  checked,
  onCheckedChange
}) => {
  return (
    <div className="flex items-start space-x-2">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 10 }}
        className="mt-1"
      >
        {register ? (
          <Checkbox 
            id={id} 
            className={cn(error && "border-red-400 text-red-400")}
            {...register} 
          />
        ) : (
          <Checkbox 
            id={id} 
            className={cn(error && "border-red-400 text-red-400")}
            checked={checked} 
            onCheckedChange={(checked) => onCheckedChange?.(!!checked)} 
          />
        )}
      </motion.div>
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            error && "text-red-500"
          )}
        >
          {label}
        </Label>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error.message}</p>
        )}
      </div>
    </div>
  );
};

export function DealerSignupForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  // Step 1 form
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1, isValid: isValidStep1 },
    watch: watchStep1,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // Step 2 form
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    setValue,
  } = useForm({
    resolver: zodResolver(dealerProfileSchema),
    mode: "onChange",
    defaultValues: {
      dealerType: "independent",
      businessName: "",
      address: "",
      phone: "",
      whatsapp: "",
      instagram: "",
      specialization: [],
      yearsInBusiness: "1-5",
    },
  });

  // Specialization helpers
  const isSpecializationSelected = (item) => specializations.includes(item);
  
  const handleSpecializationChange = (item, checked) => {
    if (checked) {
      setSpecializations((prev) => {
        const newSpecializations = [...prev, item];
        setValue("specialization", newSpecializations);
        return newSpecializations;
      });
    } else {
      setSpecializations((prev) => {
        const newSpecializations = prev.filter((i) => i !== item);
        setValue("specialization", newSpecializations);
        return newSpecializations;
      });
    }
  };

  // TanStack Query mutation for signup
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      await signUp(data.email, data.password, data.name);
      // Get the user ID from the session
      const session = await useAuth().getSession();
      return session?.$id || "";
    },
    onSuccess: (newUserId) => {
      setUserId(newUserId);
      setStep(2);
      toast({
        title: "Account created!",
        description: "Please complete your dealer profile",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // TanStack Query mutation for profile creation
  const profileMutation = useMutation({
    mutationFn: async (data) => {
      if (!userId) throw new Error("User ID is missing");
      
      return await createUser(userId, {
        name: watchStep1("name"),
        email: watchStep1("email"),
        phone: data.phone,
        whatsapp: data.whatsapp || undefined,
        instagram: data.instagram || undefined,
        businessName: data.businessName,
        address: data.address,
        dealerType: data.dealerType,
        specialization: data.specialization,
        yearsInBusiness: data.yearsInBusiness,
      });
    },
    onSuccess: () => {
      setIsVerificationSent(true);
      toast({
        title: "Profile created!",
        description: "Please check your email to verify your account",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Form submission handlers
  const onSubmitStep1 = (data) => {
    signupMutation.mutate(data);
  };

  const onSubmitStep2 = (data) => {
    profileMutation.mutate(data);
  };

  // If verification is sent, show success message
  if (isVerificationSent) {
    return (
      <Card className="w-full border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <CardContent className="space-y-6 p-8">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 100 
            }}
          >
            <motion.div 
              className="rounded-full bg-primary/10 p-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
            >
              <Check className="h-12 w-12 text-primary" />
            </motion.div>
            <motion.h3 
              className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Application Submitted!
            </motion.h3>
            <motion.p 
              className="text-gray-600 text-lg max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Thank you for applying to become a dealer on Kashi & Karz. Our team will review your application
              and get back to you within 24-48 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <AnimatedButton 
                className="mt-4 px-8 bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90" 
                onClick={() => router.push("/")}
              >
                Return to Home
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-xl rounded-2xl overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <CardContent className="space-y-8 p-8">
        {/* Progress indicator */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-indigo-500"
              initial={{ width: "50%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <div className="relative flex justify-between">
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                 "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors shadow-md",
                  step >= 1
                    ? "border-primary bg-gradient-to-r from-primary to-indigo-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                )}
              >
                <span className="text-base font-semibold">1</span>
              </motion.div>
              <p className="mt-2 text-sm font-medium">Account</p>
            </div>
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors shadow-md",
                  step >= 2
                    ? "border-primary bg-gradient-to-r from-primary to-indigo-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                )}
              >
                <span className="text-base font-semibold">2</span>
              </motion.div>
              <p className="mt-2 text-sm font-medium">Dealer Profile</p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Create Your Account</h2>
                  <p className="text-gray-500">Join our dealer network and reach thousands of customers.</p>
                </div>

                <div className="space-y-4">
                  <InputWithAnimation
                    id="name"
                    placeholder="Full Name"
                    icon={User}
                    error={errorsStep1.name}
                    register={registerStep1("name")}
                  />
                  {errorsStep1.name && (
                    <p className="text-sm text-red-500 mt-1">{errorsStep1.name.message}</p>
                  )}

                  <InputWithAnimation
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    icon={Mail}
                    error={errorsStep1.email}
                    register={registerStep1("email")}
                  />
                  {errorsStep1.email && (
                    <p className="text-sm text-red-500 mt-1">{errorsStep1.email.message}</p>
                  )}

                  <InputWithAnimation
                    id="password"
                    type="password"
                    placeholder="Password"
                    icon={Lock}
                    error={errorsStep1.password}
                    register={registerStep1("password")}
                  />
                  {errorsStep1.password && (
                    <p className="text-sm text-red-500 mt-1">{errorsStep1.password.message}</p>
                  )}

                  <InputWithAnimation
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    icon={Lock}
                    error={errorsStep1.confirmPassword}
                    register={registerStep1("confirmPassword")}
                  />
                  {errorsStep1.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errorsStep1.confirmPassword.message}</p>
                  )}

                  <AnimatedCheckbox
                    id="terms"
                    label="I agree to the terms and conditions"
                    error={errorsStep1.terms}
                    register={registerStep1("terms")}
                  />
                </div>

                <div className="pt-4">
                  <AnimatedButton
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90"
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⟳</span>
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </AnimatedButton>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Already have an account?{" "}
                  <a 
                    href="/login" 
                    className="font-medium text-primary hover:underline"
                  >
                    Log in here
                  </a>
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Complete Your Dealer Profile</h2>
                  <p className="text-gray-500">Tell us more about your business to help customers find you.</p>
                </div>

                <div className="space-y-6">
                  {/* Dealer Type */}
                  <div className="space-y-4">
                    <Label className="text-base">Dealer Type</Label>
                    <RadioGroup
                      defaultValue="independent"
                      className="grid grid-cols-2 gap-4"
                      {...registerStep2("dealerType")}
                    >
                      <AnimatedRadioCard
                        id="independent"
                        value="independent"
                        icon={Car}
                        label="Independent Dealer"
                        register={registerStep2("dealerType")}
                      />
                      <AnimatedRadioCard
                        id="franchise"
                        value="franchise"
                        icon={Building2}
                        label="Franchise Dealer"
                        register={registerStep2("dealerType")}
                      />
                    </RadioGroup>
                    {errorsStep2.dealerType && (
                      <p className="text-sm text-red-500">{errorsStep2.dealerType.message}</p>
                    )}
                  </div>

                  {/* Business Information */}
                  <div className="space-y-4">
                    <Label className="text-base">Business Information</Label>
                    
                    <InputWithAnimation
                      id="businessName"
                      placeholder="Business Name"
                      icon={Building2}
                      error={errorsStep2.businessName}
                      register={registerStep2("businessName")}
                    />
                    {errorsStep2.businessName && (
                      <p className="text-sm text-red-500 mt-1">{errorsStep2.businessName.message}</p>
                    )}

                    <InputWithAnimation
                      id="address"
                      placeholder="Address"
                      icon={MapPin}
                      error={errorsStep2.address}
                      register={registerStep2("address")}
                    />
                    {errorsStep2.address && (
                      <p className="text-sm text-red-500 mt-1">{errorsStep2.address.message}</p>
                    )}

                    <InputWithAnimation
                      id="phone"
                      placeholder="Phone Number"
                      icon={Phone}
                      error={errorsStep2.phone}
                      register={registerStep2("phone")}
                    />
                    {errorsStep2.phone && (
                      <p className="text-sm text-red-500 mt-1">{errorsStep2.phone.message}</p>
                    )}

                    <InputWithAnimation
                      id="whatsapp"
                      placeholder="WhatsApp Number (Optional)"
                      icon={Phone}
                      error={errorsStep2.whatsapp}
                      register={registerStep2("whatsapp")}
                    />

                    <InputWithAnimation
                      id="instagram"
                      placeholder="Instagram Handle (Optional)"
                      icon={User}
                      error={errorsStep2.instagram}
                      register={registerStep2("instagram")}
                    />
                  </div>

                  {/* Years in Business */}
                  <div className="space-y-4">
                    <Label className="text-base">Years in Business</Label>
                    <RadioGroup
                      defaultValue="1-5"
                      className="grid grid-cols-4 gap-2"
                      {...registerStep2("yearsInBusiness")}
                    >
                      <AnimatedRadioCard
                        id="1-5"
                        value="1-5"
                        label="1-5"
                        register={registerStep2("yearsInBusiness")}
                      />
                      <AnimatedRadioCard
                        id="6-10"
                        value="6-10"
                        label="6-10"
                        register={registerStep2("yearsInBusiness")}
                      />
                      <AnimatedRadioCard
                        id="11-20"
                        value="11-20"
                        label="11-20"
                        register={registerStep2("yearsInBusiness")}
                      />
                      <AnimatedRadioCard
                        id="20+"
                        value="20+"
                        label="20+"
                        register={registerStep2("yearsInBusiness")}
                      />
                    </RadioGroup>
                  </div>

                  {/* Specialization */}
                  <div className="space-y-4">
                    <Label className="text-base">Specialization (Select at least one)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Luxury", "Sports", "SUV", "Sedan", "Hatchback", "EV", "Hybrid", "Classic"].map((item) => (
                        <AnimatedCheckbox
                          key={item}
                          id={`specialization-${item}`}
                          label={item}
                          checked={isSpecializationSelected(item)}
                          onCheckedChange={(checked) => handleSpecializationChange(item, checked)}
                          error={errorsStep2.specialization}
                        />
                      ))}
                    </div>
                    {errorsStep2.specialization && (
                      <p className="text-sm text-red-500 mt-1">{errorsStep2.specialization.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <AnimatedButton
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </AnimatedButton>
                  <AnimatedButton
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90"
                    disabled={profileMutation.isPending}
                  >
                    {profileMutation.isPending ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2">⟳</span>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Submit Application
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}