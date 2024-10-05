"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Medal } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Rank, TotalTime } from "../raceCardFunctions.tsx/rank"
import { ChipTime } from "../raceCardFunctions.tsx/chipTime"
import { TypeDateLocation } from "../raceCardFunctions.tsx/typeDateLocation"

interface RaceCardProps {
  race: any
  imageUrl: string
}

const RaceCard: React.FC<RaceCardProps> = ({ race, imageUrl}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="p-0 relative">
        <img 
          src={imageUrl} 
          alt={race.event_name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-blue-500  px-2 py-1 rounded">
          <span className="text-white font-bold text-sm uppercase">{race.sub_type}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-bold">{race.event_name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{race.location.city}, {race.location.state}, {race.location.country}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">Chip Time</h3>
            <TotalTime race = {race} />
          </div>
          <div className="text-right">
            <div className="grid grid-cols-3 gap-2">
                <PositionBadge label="Overall" position={race.rank.overall} />
                <PositionBadge label="Gender" position={race.rank.gender} />
                <PositionBadge label="Division" position={race.rank.div} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{race.event_name}</DialogTitle>
        </DialogHeader>
        <div className="">
          <TypeDateLocation race={race} />
          <ChipTime race={race} />
          <div className="mb-2">
            <strong className="text-sm">Rank:</strong>
            <div className="list-disc list-inside text-sm ml-2">
              <Rank race ={race} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PositionBadge({ label, position }: { label: string; position: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-muted-foreground mb-1">{label}</span>
      <Badge variant="outline" className="text-sm font-semibold">
        {position ? position : "?"}
      </Badge>
    </div>
  )
}

export default RaceCard;

