"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormRegisterReturn } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/appwrite-provider"
import { createUser } from "@/lib/appwrite"
import { Check, ChevronsUpDown, Car, Building2, MapPin, Phone, Mail, User, Lock, LucideIcon } from "lucide-react"
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
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
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
}: {
  id: string;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
  error?: Record<string, any> | undefined;
  register: UseFormRegisterReturn;
  [key: string]: any;
}) => {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0.9, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "pl-10",
          error && "border-destructive focus-visible:ring-destructive"
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
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  children: React.ReactNode 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button {...props}>
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
}: {
  id: string;
  value: string;
  icon?: LucideIcon;
  label: string;
  register: UseFormRegisterReturn;
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
        whileHover={{ scale: 1.03, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Label
          htmlFor={id}
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
}: {
  id: string;
  label: string;
  error?: Record<string, any> | undefined;
  register?: UseFormRegisterReturn;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) => {
  return (
    <div className="flex items-start space-x-2">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 10 }}
      >
        {register ? (
          <Checkbox id={id} {...register} />
        ) : (
          <Checkbox 
            id={id} 
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
            error && "text-destructive"
          )}
        >
          {label}
        </Label>
        {error && (
          <p className="text-xs text-destructive">{error.message}</p>
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
  const [specializations, setSpecializations] = useState<string[]>([]);

  // Step 1 form
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1, isValid: isValidStep1 },
    watch: watchStep1,
  } = useForm<z.infer<typeof signupSchema>>({
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
  } = useForm<z.infer<typeof dealerProfileSchema>>({
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
  const isSpecializationSelected = (item: string) => specializations.includes(item);
  
  const handleSpecializationChange = (item: string, checked: boolean) => {
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
    mutationFn: async (data: z.infer<typeof signupSchema>) => {
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
    mutationFn: async (data: z.infer<typeof dealerProfileSchema>) => {
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
  const onSubmitStep1 = (data: z.infer<typeof signupSchema>) => {
    signupMutation.mutate(data);
  };

  const onSubmitStep2 = (data: z.infer<typeof dealerProfileSchema>) => {
    profileMutation.mutate(data);
  };

  // If verification is sent, show success message
  if (isVerificationSent) {
    return (
      <Card className="w-full border-0 shadow-none">
        <CardContent className="space-y-6 pt-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 100 
            }}
          >
            <motion.div 
              className="rounded-full bg-primary/10 p-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
            >
              <Check className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Application Submitted!
            </motion.h3>
            <motion.p 
              className="text-muted-foreground"
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
              <AnimatedButton className="mt-4" onClick={() => router.push("/")}>
                Return to Home
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent className="space-y-6 pt-6">
        {/* Progress indicator */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-muted">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "50%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <div className="relative flex justify-between">
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  step >= 1
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground bg-background text-muted-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-5 w-5" />
              </motion.div>
              <span className="mt-2 text-xs font-medium">Account</span>
            </div>
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  step >= 2
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground bg-background text-muted-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Building2 className="h-5 w-5" />
              </motion.div>
              <span className="mt-2 text-xs font-medium">Dealership</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={cn(errorsStep1.name && "text-destructive")}>
                    Full Name
                  </Label>
                  <InputWithAnimation
                    id="name"
                    placeholder="Enter your full name"
                    icon={User}
                    error={errorsStep1.name}
                    register={registerStep1("name")}
                  />
                  {errorsStep1.name && (
                    <p className="text-xs text-destructive">{errorsStep1.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={cn(errorsStep1.email && "text-destructive")}>
                    Email Address
                  </Label>
                  <InputWithAnimation
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    icon={Mail}
                    error={errorsStep1.email}
                    register={registerStep1("email")}
                  />
                  {errorsStep1.email && (
                    <p className="text-xs text-destructive">{errorsStep1.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className={cn(errorsStep1.password && "text-destructive")}>
                    Password
                  </Label>
                  <InputWithAnimation
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    icon={Lock}
                    error={errorsStep1.password}
                    register={registerStep1("password")}
                  />
                  {errorsStep1.password && (
                    <p className="text-xs text-destructive">{errorsStep1.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className={cn(errorsStep1.confirmPassword && "text-destructive")}
                  >
                    Confirm Password
                  </Label>
                  <InputWithAnimation
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    icon={Lock}
                    error={errorsStep1.confirmPassword}
                    register={registerStep1("confirmPassword")}
                  />
                  {errorsStep1.confirmPassword && (
                    <p className="text-xs text-destructive">{errorsStep1.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <AnimatedCheckbox id="terms" label="I agree to the terms and conditions" error={errorsStep1.terms} register={registerStep1("terms")} />
                </div>

                <AnimatedButton
                  type="submit"
                  className="w-full"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? "Creating Account..." : "Create Account"}
                </AnimatedButton>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dealership Type</h3>
                  <RadioGroup
                    defaultValue="independent"
                    className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                    {...registerStep2("dealerType")}
                  >
                    <AnimatedRadioCard
                      id="independent"
                      value="independent"
                      icon={Car}
                      label="Independent"
                      register={registerStep2("dealerType")}
                    />
                    <AnimatedRadioCard
                      id="franchise"
                      value="franchise"
                      icon={Building2}
                      label="Franchise"
                      register={registerStep2("dealerType")}
                    />
                  </RadioGroup>
                  {errorsStep2.dealerType && (
                    <p className="text-xs text-destructive">{errorsStep2.dealerType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName" className={cn(errorsStep2.businessName && "text-destructive")}>
                    Business Name
                  </Label>
                  <InputWithAnimation
                    id="businessName"
                    placeholder="Your dealership name"
                    icon={Building2}
                    error={errorsStep2.businessName}
                    register={registerStep2("businessName")}
                  />
                  {errorsStep2.businessName && (
                    <p className="text-xs text-destructive">{errorsStep2.businessName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className={cn(errorsStep2.address && "text-destructive")}>
                    Business Address
                  </Label>
                  <InputWithAnimation
                    id="address"
                    placeholder="Full business address"
                    icon={MapPin}
                    error={errorsStep2.address}
                    register={registerStep2("address")}
                  />
                  {errorsStep2.address && (
                    <p className="text-xs text-destructive">{errorsStep2.address.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className={cn(errorsStep2.phone && "text-destructive")}>
                      Phone Number
                    </Label>
                    <InputWithAnimation
                      id="phone"
                      placeholder="Your business phone"
                      icon={Phone}
                      error={errorsStep2.phone}
                      register={registerStep2("phone")}
                    />
                    {errorsStep2.phone && (
                      <p className="text-xs text-destructive">{errorsStep2.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">
                      WhatsApp Number <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      placeholder="WhatsApp number if different"
                      {...registerStep2("whatsapp")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">
                    Instagram Handle <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input
                    id="instagram"
                    placeholder="@yourdealership"
                    {...registerStep2("instagram")}
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className={cn(errorsStep2.specialization && "text-destructive")}>
                      Specialization (Select all that apply)
                    </Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {[
                        "Luxury", "SUVs", "Sedans", "Sports Cars", "Electric Vehicles", 
                        "Hybrids", "Trucks", "Classics", "Imports", "Domestics", "Commercial"
                      ].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <AnimatedCheckbox
                            id={`specialization-${item}`}
                            label={item}
                            checked={isSpecializationSelected(item)}
                            onCheckedChange={(checked) => 
                              handleSpecializationChange(item, checked as boolean)
                            }
                            register={registerStep2(`specialization.${item}`)}
                          />
                        </div>
                      ))}
                    </div>
                    {errorsStep2.specialization && (
                      <p className="text-xs text-destructive">{errorsStep2.specialization.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Years in Business</h3>
                  <RadioGroup
                    defaultValue="1-5"
                    className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                    {...registerStep2("yearsInBusiness")}
                  >
                    {[
                      { value: "1-5", label: "1-5 years" },
                      { value: "6-10", label: "6-10 years" },
                      { value: "11-20", label: "11-20 years" },
                      { value: "20+", label: "20+ years" },
                    ].map((option) => (
                      <AnimatedRadioCard
                        key={option.value}
                        id={`years-${option.value}`}
                        value={option.value}
                        label={option.label}
                        register={registerStep2("yearsInBusiness")}
                      />
                    ))}
                  </RadioGroup>
                  {errorsStep2.yearsInBusiness && (
                    <p className="text-xs text-destructive">{errorsStep2.yearsInBusiness.message}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <AnimatedButton
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </AnimatedButton>
                  <AnimatedButton
                    type="submit"
                    className="flex-1"
                    disabled={profileMutation.isPending}
                  >
                    {profileMutation.isPending ? "Submitting..." : "Complete Registration"}
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
