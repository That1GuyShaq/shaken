import { Badge } from "@/Components/ui/badge"
import { Card, CardContent } from "@/Components/ui/card"
import { Martini, ShoppingCart, Tag, User } from "lucide-react"
import { useState } from "react";
interface MartiniCardProps {
  title: string
  description: string
  badges: string[]
}

export default function MartiniGlassCard({
  title = "Cocktail of the Day",
  description = "Discover our specially crafted cocktail, perfect for any occasion.",
  badges = ["Refreshing", "Classic", "Happy Hour"]
}: MartiniCardProps) {
    const icons = ['Martini', 'ShoppingCart', 'Tag', 'User']
    const [color, setColor] = useState("bg-purple-700")

    // switch (Math.floor(Math.random() * 2)) {
    //     case 0:
    //         setColor("bg-primary");
    //         break;
    //     case 1:
    //         setColor("bg-secondary");
    //         break;
    //     case 2:
    //         setColor("bg-info");
    //         break;

    //     default:
    //         setColor("bg-destructive");
    //         break;
    // }
    const classes = "w-10 h-10 p-1 text-primary";
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="flex items-center justify-center ">
          {(() => {
            switch (Math.floor(Math.random() * 5) + 1) {
              case 1:
                return <Martini className={classes} />
              case 2:
                return <ShoppingCart className={classes} />
              case 3:
                return <Tag className={classes} />
              case 4:
                return <User className={classes} />
              case 5:
                return <Martini className={classes} />
            }
          })()}
        </div>
        <CardContent className="w-full p-1 ms-1 pe-1">
            <p className="font-bold mt-2 inline truncate">
                {title}
                <span className="truncate text-nowrap">

                </span>
            </p>
            <p className="text-muted-foreground  leading-tight text-sm">{description}</p>
            <div className="flex flex-wrap gap-2">
                    {/* {badges.map((badge, index) => (
                    <Badge key={index} variant="default" className={`${color} ms-1 text-xs`}>
                        {badge}
                    </Badge>
                    ))} */}
            </div>
        </CardContent>
      </div>
    </Card>
  )
}
