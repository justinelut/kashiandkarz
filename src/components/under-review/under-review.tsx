"use client"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/appwrite-provider";

export default function AccountReviewPage({ account, business }: { account: boolean; business: boolean }) {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState("24 hours");
  const user = useAuth();

  useEffect(() => {
    // Generate waiting time based on user name or email
    if (user?.name || user?.email) {
      const nameToUse = user?.name || user?.email || "";
      const hash = Array.from(nameToUse.toString()).reduce(
        (acc, char) => acc + char.charCodeAt(0), 0
      );
      const hours = (hash % 24) + 12; // Between 12-36 hours
      setTimeRemaining(`${hours} hours`);
    }
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Determine verification status based on props
  const statusMessage = !account && !business 
    ? "Both your account and business profile are under review."
    : !account 
    ? "Your account is under review." 
    : "Your business profile is under review.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        {/* Background decorative elements */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-primary/30"
            variants={circleVariants}
            animate="animate"
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full border border-secondary/30"
            variants={circleVariants}
            animate="animate"
          />
        </motion.div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader className="text-center space-y-4">
            <motion.div variants={itemVariants} className="mx-auto">
              <motion.div 
                variants={pulseVariants}
                animate="pulse"
                className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto"
              >
                <AlertCircle className="h-10 w-10 text-primary" />
              </motion.div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl">Account Under Review</CardTitle>
              <CardDescription className="text-lg mt-2">
                Hello {user?.name || user?.email?.split('@')[0] || "there"}! Thanks for your application.
              </CardDescription>
            </motion.div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <motion.div 
              variants={itemVariants}
              className="bg-secondary/10 p-4 rounded-lg border border-secondary/20"
            >
              <p className="text-foreground/80">
                {statusMessage} This process helps us ensure the security and quality of our dealer network.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p>Application received and being processed</p>
              </div>
              
              <div className="flex items-start gap-3">
                <motion.div 
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
                >
                  <Bell className="h-5 w-5 text-primary mt-0.5" />
                </motion.div>
                <p>You'll receive a notification when your account is approved</p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <p>Estimated approval time: <span className="font-medium">{timeRemaining}</span></p>
              </div>
            </motion.div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <motion.div variants={itemVariants} className="w-full">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push("/")}
              >
                Return to Homepage
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-sm text-muted-foreground text-center">
                Need help? Contact our support team at <span className="text-primary">support@cardealers.com</span>
              </p>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}