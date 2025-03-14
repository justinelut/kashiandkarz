interface PriceInfoProps {
  price: string
  description: string
}

export function PriceInfo({ price, description }: PriceInfoProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">Carwow cash offer</div>
      <div className="text-3xl font-bold">£{price}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  )
}

