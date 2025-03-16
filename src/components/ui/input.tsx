import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="relative w-full">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          className={cn(
            "flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-base text-gray-900 transition-all duration-200",
            "placeholder:text-gray-400 placeholder:font-normal",
            "shadow-sm hover:shadow",
            "focus:border-primary/20 focus:bg-white focus:shadow-md focus:shadow-primary/5 focus:outline-none focus:ring-0",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
            isPassword ? "pr-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
