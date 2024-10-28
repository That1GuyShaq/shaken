import { Badge } from "@/Components/ui/badge"
import { Card, CardContent } from "@/Components/ui/card"
import { Martini } from "lucide-react"
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
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-25 bg-primary/10 flex items-center justify-center ">
          <Martini className="w-12 h-12 text-primary" />
        </div>
        <CardContent className="w-full p-4 pe-0">
          <h2 className="font-bold mt-2">{title}</h2>
          <p className="text-muted-foreground ">{description}</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant="default" className={color}>
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
