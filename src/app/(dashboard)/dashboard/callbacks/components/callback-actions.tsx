"use client";

// Define the Callback interface locally to avoid import errors
interface Callback {
  $id?: string;
  name: string;
  phone: string;
  email: string;
  preferred_time: string;
  car_id?: string;
  status: 'pending' | 'contacted' | 'completed';
  notes?: string;
  created_at?: string;
}
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Copy, Phone, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface CallbackActionsProps {
  callback: Callback;
}

export default function CallbackActions({ callback }: CallbackActionsProps) {
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            copyToClipboard(callback.phone, "Phone number copied to clipboard")
          }
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy phone number
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            copyToClipboard(callback.email, "Email copied to clipboard")
          }
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy email
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Mark as contacted
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Mark as completed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
