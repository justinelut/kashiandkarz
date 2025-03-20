import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface DealerInfoProps {
  name: string
  company: string
  isOnline: boolean
  distance: string
  reviews: string
  avatar: string
}

export function DealerInfo({ name, company, isOnline, distance, reviews, avatar }: DealerInfoProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-muted-foreground">{company}</div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {isOnline && (
          <Badge variant="secondary" className="bg-[#00e1e1]/10 text-green-500">
            Online now
          </Badge>
        )}
        <Badge variant="outline">Buy online</Badge>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{distance}</span>
          <span>{reviews}</span>
        </div>
      </div>
    </div>
  )
}

