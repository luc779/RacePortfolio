"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"

interface RaceCardProps {
  chipTime: string
  raceType: string
  raceName: string
  imageUrl: string
  overallRank: number
  genderRank: number
  divisionRank: number
  city: string
  state: string
  country: string
}

const RaceCard: React.FC<RaceCardProps> = ({
    imageUrl,
    raceType,
    raceName,
    city,
    state,
    country,
    chipTime,
    overallRank,
    genderRank,
    divisionRank,
  }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="p-0 relative">
        <img 
          src={imageUrl} 
          alt={raceName} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-blue-500  px-2 py-1 rounded">
          <span className="text-white font-bold text-sm uppercase">{raceType}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-bold">{raceName}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{city}, {state}, {country}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">Chip Time</h3>
            <div className="text-lg font-bold">
              {chipTime}
            </div>
          </div>
          <div className="text-right">
            <div className="grid grid-cols-3 gap-2">
                <PositionBadge label="Overall" position={overallRank} />
                <PositionBadge label="Gender" position={genderRank} />
                <PositionBadge label="Division" position={divisionRank} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{raceName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img 
            src={imageUrl} 
            alt={raceName} 
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <p className="text-sm text-muted-foreground mb-2">d</p>
          <p className="text-sm mb-1"><strong>Date:</strong> d</p>
          <p className="text-sm mb-1"><strong>Location:</strong> lo</p>
          <p className="text-sm mb-1"><strong>Chip Time:</strong> ch</p>
          <div className="mb-2">
            <strong className="text-sm">Finish Positions:</strong>
            <ul className="list-disc list-inside text-sm ml-2">
              <li>Overall: t</li>
              <li>Gender: t</li>
              <li>Division: t</li>
            </ul>
          </div>
          <p className="text-sm mb-1">
            <strong>Website:</strong>
          </p>
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