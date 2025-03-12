// Add to src/lib/actions.ts
export async function getCallbacks() {
  try {
    const database = new Databases(client);
    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_CALLBACKS_COLLECTION_ID!
    );
    return { data: response.documents };
  } catch (error) {
    console.error('Error fetching callbacks:', error);
    return { error: 'Failed to fetch callbacks' };
  }
}import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  Reply,
  Eye,
  MoreVertical
} from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for now - this would normally come from the server
const mockMessages = [
  {
    $id: "1",
    name: "John Smith",
    email: "john@example.com",
    message: "I'm interested in the Rolls Royce Ghost. Can you provide more details on its features?",
    status: "unread",
    created_at: "2025-03-10T15:30:00.000Z"
  },
  {
    $id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    message: "What's the best price you can offer on the 2017 Ghost model? I'm ready to make a purchase soon.",
    status: "read",
    created_at: "2025-03-09T10:15:00.000Z"
  },
  {
    $id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    message: "Do you offer financing options for your luxury vehicles? I'm specifically looking at the Rolls Royce in your inventory.",
    status: "replied",
    created_at: "2025-03-08T08:45:00.000Z"
  }
];

export default async function MessagesPage() {
  // const { data: messages } = await getMessages({});
  const messages = mockMessages; // Using mock data until the API is implemented

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Manage customer inquiries and messages
        </p>
      </div>
      <Separator />
      
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8 w-full bg-background"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            <span>Replied</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Eye className="h-3.5 w-3.5 text-blue-500" />
            <span>Read</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            <Clock className="h-3.5 w-3.5 text-yellow-500" />
            <span>Unread</span>
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="replied">Replied</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="rounded-md border bg-card overflow-hidden">
            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium text-sm bg-muted/50">
              <div className="col-span-3">From</div>
              <div className="col-span-5">Message</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            <div className="divide-y">
              {messages.map((msg) => (
                <div key={msg.$id} className="grid grid-cols-12 px-4 py-3 items-center hover:bg-muted/20 transition-colors">
                  <div className="col-span-3">
                    <div className="font-medium">{msg.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{msg.email}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-5">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="p-0 h-auto text-left font-normal hover:bg-transparent justify-start">
                          <span className="line-clamp-2 text-sm">{msg.message}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Message from {msg.name}</DialogTitle>
                          <DialogDescription className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            {msg.email}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="bg-muted/50 p-4 rounded-md my-4">
                          <p className="whitespace-pre-wrap">{msg.message}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Reply</h4>
                          <Textarea
                            placeholder="Type your reply here..."
                            className="min-h-32"
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Save Draft</Button>
                            <Button>
                              <Reply className="mr-2 h-4 w-4" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {format(new Date(msg.created_at), "MMM d, yyyy")}                  
                  </div>
                  
                  <div className="col-span-1">
                    <Badge
                      className={`${msg.status === "replied" ? "bg-green-500 hover:bg-green-600" : 
                                  msg.status === "read" ? "bg-blue-500 hover:bg-blue-600" : 
                                  "bg-yellow-500 hover:bg-yellow-600"}`}
                    >
                      {msg.status}
                    </Badge>
                  </div>
                  
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Mark as read
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Reply className="h-4 w-4" />
                          Reply to message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 flex items-center gap-2">
                          Delete message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="unread" className="space-y-4 mt-4">
          <div className="rounded-md border bg-card overflow-hidden">
            {/* Same structure as above, filtered for unread */}
            <div className="grid grid-cols-12 border-b px-4 py-3 font-medium text-sm bg-muted/50">
              <div className="col-span-3">From</div>
              <div className="col-span-5">Message</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            <div className="divide-y">
              {messages.filter(msg => msg.status === "unread").map((msg) => (
                <div key={msg.$id} className="grid grid-cols-12 px-4 py-3 items-center hover:bg-muted/20 transition-colors">
                  {/* Same content as above */}
                  <div className="col-span-3">
                    <div className="font-medium">{msg.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{msg.email}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-5">
                    <Button variant="ghost" className="p-0 h-auto text-left font-normal hover:bg-transparent justify-start">
                      <span className="line-clamp-2 text-sm">{msg.message}</span>
                    </Button>
                  </div>
                  
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {format(new Date(msg.created_at), "MMM d, yyyy")}                  
                  </div>
                  
                  <div className="col-span-1">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      {msg.status}
                    </Badge>
                  </div>
                  
                  <div className="col-span-1 flex justify-end">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {messages.filter(msg => msg.status === "unread").length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  No unread messages
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Similar content for other tabs */}
        <TabsContent value="read" className="space-y-4 mt-4">
          {/* Filtered content for read messages */}
          <div className="px-4 py-8 text-center text-muted-foreground border rounded-md">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">Read Messages</h3>
            <p>Messages you&apos;ve viewed but haven&apos;t replied to yet</p>
          </div>
        </TabsContent>
        
        <TabsContent value="replied" className="space-y-4 mt-4">
          {/* Filtered content for replied messages */}
          <div className="px-4 py-8 text-center text-muted-foreground border rounded-md">
            <Reply className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">Replied Messages</h3>
            <p>Messages you&apos;ve already responded to</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
