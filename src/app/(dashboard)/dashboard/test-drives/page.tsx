import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Calendar,
  Clock,
  Car,
  User,
  CheckCircle2,
  X,
  MoreVertical,
  Phone
} from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for test drive appointments
const mockTestDrives = [
  {
    $id: "1",
    name: "David Morgan",
    phone: "+1234567890",
    email: "david@example.com",
    car_id: "car1",
    car_name: "Rolls Royce Ghost 2023",
    date: "2025-04-15T10:00:00.000Z",
    status: "scheduled",
    notes: "Interested in financing options",
    created_at: "2025-03-10T15:30:00.000Z"
  },
  {
    $id: "2",
    name: "Jennifer Lee",
    phone: "+1987654321",
    email: "jennifer@example.com",
    car_id: "car2",
    car_name: "Bentley Continental GT",
    date: "2025-04-16T14:30:00.000Z",
    status: "completed",
    notes: "Customer was very pleased with the test drive",
    created_at: "2025-03-08T09:45:00.000Z"
  },
  {
    $id: "3",
    name: "Robert Johnson",
    phone: "+1456789123",
    email: "robert@example.com",
    car_id: "car3",
    car_name: "Aston Martin DB11",
    date: "2025-04-17T11:15:00.000Z",
    status: "pending",
    notes: "Customer had to reschedule due to emergency",
    created_at: "2025-03-05T14:20:00.000Z"
  },
  {
    $id: "4",
    name: "Sophia Williams",
    phone: "+1789123456",
    email: "sophia@example.com",
    car_id: "car4",
    car_name: "Rolls Royce Phantom",
    date: "2025-04-18T16:00:00.000Z",
    status: "scheduled",
    notes: "Looking for a luxury vehicle for business use",
    created_at: "2025-03-12T10:15:00.000Z"
  }
];

export default async function TestDrivesPage() {
  // const { data: testDrives } = await getTestDrives({});
  const testDrives = mockTestDrives; // Using mock data until the API is implemented

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Test Drive Schedule</h1>
        <p className="text-muted-foreground">
          Manage test drive appointments
        </p>
      </div>
      <Separator />
      
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer or car..."
            className="pl-8 w-full bg-background"
          />
        </div>
        
        <Button variant="default">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule New Test Drive
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            All
            <Badge variant="secondary" className="ml-1">{testDrives.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending
            <Badge variant="secondary" className="ml-1">
              {testDrives.filter(td => td.status === "pending").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Scheduled
            <Badge variant="secondary" className="ml-1">
              {testDrives.filter(td => td.status === "scheduled").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Completed
            <Badge variant="secondary" className="ml-1">
              {testDrives.filter(td => td.status === "completed").length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testDrives.map((drive) => (
              <TestDriveCard key={drive.$id} testDrive={drive} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testDrives
              .filter(drive => drive.status === "pending")
              .map((drive) => (
                <TestDriveCard key={drive.$id} testDrive={drive} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testDrives
              .filter(drive => drive.status === "scheduled")
              .map((drive) => (
                <TestDriveCard key={drive.$id} testDrive={drive} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testDrives
              .filter(drive => drive.status === "completed")
              .map((drive) => (
                <TestDriveCard key={drive.$id} testDrive={drive} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Test Drive Card Component
function TestDriveCard({ testDrive }) {
  const statusColor = {
    pending: "bg-yellow-500 hover:bg-yellow-600",
    scheduled: "bg-blue-500 hover:bg-blue-600",
    completed: "bg-green-500 hover:bg-green-600",
    cancelled: "bg-red-500 hover:bg-red-600"
  };
  
  const statusIcon = {
    pending: <Clock className="h-4 w-4" />,
    scheduled: <Calendar className="h-4 w-4" />,
    completed: <CheckCircle2 className="h-4 w-4" />,
    cancelled: <X className="h-4 w-4" />
  };
  
  return (
    <Card className="shadow-sm hover:shadow transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{testDrive.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <User className="h-3.5 w-3.5" />
              {testDrive.email}
            </CardDescription>
          </div>
          <Badge className={statusColor[testDrive.status]}>
            <span className="flex items-center gap-1">
              {statusIcon[testDrive.status]}
              {testDrive.status.charAt(0).toUpperCase() + testDrive.status.slice(1)}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{testDrive.car_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(testDrive.date), "EEEE, MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(testDrive.date), "h:mm a")}</span>
          </div>
          {testDrive.notes && (
            <div className="mt-2 p-2 bg-muted/50 rounded-md">
              <p className="text-sm">{testDrive.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-1">
        <Button variant="outline" size="sm" className="gap-1">
          <Phone className="h-3.5 w-3.5" />
          Call
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <MoreVertical className="h-3.5 w-3.5" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Test Drive Actions</DropdownMenuLabel>
            <DropdownMenuItem className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Reschedule
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
              <X className="h-4 w-4" />
              Cancel Appointment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
