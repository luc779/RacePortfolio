import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

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
  return (
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