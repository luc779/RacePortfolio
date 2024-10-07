"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, Clock, Flag, Ruler, Timer, Trophy } from "lucide-react"
import { calculateStatistics } from "../raceStatsFormulas/calcualteStats"

// Define race categories with calculations
const raceCategories = [
  calculateStatistics("5k"),
  calculateStatistics("10k"),
  calculateStatistics("Half Marathon"),
  calculateStatistics("Sprint Triathlon"),
  calculateStatistics("Olympic Triathlon"),
  calculateStatistics("Marathon"),
  calculateStatistics("Half Ironman"),
  calculateStatistics("Ironman"),
];

function StatItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium">{label}:</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  )
}

function RaceCategoryStats({ category }: { category: typeof raceCategories[0] }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <StatItem icon={Flag} label="Total Races" value={category.totalRaces} />
              <StatItem icon={Ruler} label="Total Distance" value={`${category.totalDistance} miles`} />
              <StatItem icon={Trophy} label="Personal Best" value={category.raceName || "N/A"} />
            </div>
            <div className="space-y-2">
              <StatItem icon={Clock} label="Best Time" value={category.bestTime} />
              <StatItem icon={Timer} label="Best Pace" value={category.bestPace || "N/A"} />
              <StatItem icon={ArrowUp} label="Best Finish" value={`${category.bestFinish} %`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ExpandedRaceStatistics() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Race Statistics</h1>
        <Tabs defaultValue={raceCategories[0].name.toLowerCase()} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-2 pb-12">
            {raceCategories.map((category) => (
              <TabsTrigger 
                key={category.name} 
                value={category.name.toLowerCase()} 
                className="flex flex-col items-center justify-center p-2 h-auto"
              >
                <span className="text-sm">{category.name}</span>
                <Badge variant="secondary" className="mt-1">
                  {category.totalRaces}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          {raceCategories.map((category) => (
            <TabsContent key={category.name} value={category.name.toLowerCase()}>
              <RaceCategoryStats category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}