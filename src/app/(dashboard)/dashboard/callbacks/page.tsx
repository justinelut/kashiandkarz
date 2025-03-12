import { getCallbacks } from "@/lib/actions";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";
import CallbackActions from "./components/callback-actions";

export default async function CallbacksPage() {
  const { data: callbacks } = await getCallbacks({});

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Callback Requests</h1>
        <p className="text-muted-foreground">
          Manage callback requests from customers
        </p>
      </div>
      <Separator />
      
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            className="pl-8 w-full bg-background"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>Completed</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Phone className="h-3.5 w-3.5 text-blue-500" />
            <span>Contacted</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Clock className="h-3.5 w-3.5 text-yellow-500" />
            <span>Pending</span>
          </Badge>
        </div>
      </div>
      
      <div className="rounded-md border bg-card">
        <div className="grid grid-cols-6 border-b px-4 py-3 font-medium text-sm">
          <div className="col-span-1">Name</div>
          <div className="col-span-1">Phone</div>
          <div className="col-span-1">Email</div>
          <div className="col-span-1">Preferred Time</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        
        <div className="divide-y">
          {callbacks?.length > 0 ? (
            callbacks.map((callback) => (
              <div key={callback.$id} className="grid grid-cols-6 px-4 py-3 items-center">
                <div className="col-span-1 font-medium">{callback.name}</div>
                <div className="col-span-1 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{callback.phone}</span>
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{callback.email}</span>
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{callback.preferred_time}</span>
                </div>
                <div className="col-span-1">
                  <Badge
                    className={
                      callback.status === "completed"
                        ? "bg-green-500 hover:bg-green-600"
                        : callback.status === "contacted"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }
                  >
                    {callback.status}
                  </Badge>
                </div>
                <div className="col-span-1 flex justify-end">
                  <CallbackActions callback={callback} />
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No callback requests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
