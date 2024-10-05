"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Medal } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { swimPace } from "../../app/Math/swimPace"
import { mphAverage } from "../../app/Math/mphAverage"
import { runPace } from "../../app/Math/runPace"

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
            <div className="text-lg font-bold">
              {race.type === "triathlon" ? (
                <span>{race.times.total_time}</span> 
              ) : race.type === "running" ? (
                <span>{race.times}</span> 
              ) : (
                <span>Other Event</span> 
              )}
            </div>
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
          <div className="grid grid-cols-3 gap-8 mb-1">
            <div className="text-sm">
              <strong>Type:</strong>
              <p>{race.sub_type}</p>
            </div>
            <div className="text-sm">
              <strong>Date:</strong>
              <p>{race.date}</p>
            </div>
            <div className="text-sm">
              <strong>Location:</strong>
              <p>{race.location.city}, {race.location.state}, {race.location.country}</p>
            </div>
          </div>
          <p className="text-sm mb-1"><strong>Chip Time:</strong> 
            {race.type === "triathlon" ? (
              <div className="grid grid-cols-3 gap-8 ml-2">
                <div>
                  <strong>Split</strong>
                  <p>Swim</p>
                  <p>T1</p>
                  <p>Bike</p>
                  <p>T2</p>
                  <p>Run</p>
                  <p>Total</p>
                </div>
                <div>
                  <strong>Time</strong>
                  {Object.entries(race.times).map(([key, times]) => (
                    <div key={key}>
                      <p>{times as number}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <strong>Pace</strong>
                  <p>{swimPace({ timeString: race.times.swim, distance: race.distances.swim })} / 100yd</p>
                  <br />
                  <p>{mphAverage({ timeString: race.times.bike, distance: race.distances.bike })} mph</p>
                  <br />
                  <p>{runPace({ timeString: race.times.run, distance: race.distances.run })} min/mi</p>
                </div>
              </div>
            ) : race.type === "running" ? (
                <div className="grid grid-cols-3 gap-8 ml-2">
                  <div>
                    <strong>Time:</strong>
                    <p>{race.times}</p>
                  </div>
                  <div>
                    <strong>Distance</strong>
                    <p>{race.distance}</p>
                  </div>
                  <div>
                    <strong>Pace</strong>
                    <p>{runPace({timeString: race.times, distance: race.distance})} min/mi</p>
                  </div>
                </div>
            ) : (
              <span>Other Event</span> 
            )}
          </p>
          <div className="mb-2">
            <strong className="text-sm">Rank:</strong>
            <div className="list-disc list-inside text-sm ml-2">
              {race.type === "triathlon" ? (
                <div className="grid grid-cols-3 gap-8">
                  <div>
                  <strong>Type</strong>
                  <p>Divison</p>
                  <p>Gender</p>
                  <p>Overall</p>
                  </div>
                  <div>
                    <strong>Place</strong>
                    {["div", "gender", "overall"].map((key) => (
                      <p key={key}>{race.rank[key] === 0 ? "No Data" : race.rank[key]}</p>
                    ))}
                  </div>
                  <div>
                    <strong>Total</strong>
                    {["div_total", "gender_total", "overall_total"].map((key) => (
                      <p key={key}>{race.rank[key]}</p>
                    ))}
                  </div>
                </div>
              ) : race.type === "running" ? (
                <div className="grid grid-cols-3 gap-8">
                  <div>
                  <strong>Type</strong>
                  <p>Divison</p>
                  <p>Gender</p>
                  <p>Overall</p>
                  </div>
                  <div>
                    <strong>Place</strong>
                    {["div", "gender", "overall"].map((key) => (
                      <p key={key} className="flex items-center">
                      {race.rank[key] === 0 ? (
                        "NA"
                      ) : race.rank[key] <= 3 ? (
                        <>
                          <Medal className="w-4 h-4 mr-1" />
                          Top {race.rank[key]}
                        </>
                      ) : (
                        race.rank[key]
                      )}
                    </p>
                    ))}
                  </div>
                  <div>
                    <strong>Total</strong>
                    {["div_total", "gender_total", "overall_total"].map((key) => (
                      <p key={key}>{race.rank[key] === 0 ? "No Data" : race.rank[key]}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <span>Other Event</span> 
              )}
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

