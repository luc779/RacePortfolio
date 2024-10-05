"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Flag, Ruler, Timer, TrendingDown, Trophy, Footprints, Waves, Bike } from "lucide-react"
import data from "../../app/Data/raceData.json";
import { swimPace } from "../../app/Math/swimPace"
import { mphAverage } from "../../app/Math/mphAverage"
import { runPace } from "../../app/Math/runPace"

const calculateStatistics = (subType: any) => {
  const races = data.races.filter(race => race.sub_type === subType);
  
  // Initialize statistics
  const totalRaces = races.length;
  const totalDistance = races.reduce((acc, race) => {
    if (race.type === "running") {
      return acc + (race.distance || 0); // If there's a distance directly in the race
    }
    if (race.distances) {
      return acc + ((race.distances.swim + race.distances.bike + race.distances.run) || 0); // Add the running distance for triathlons
    }
    return acc;
  }, 0);

  const bestTime = races.reduce((best, race: any) => {
    let time;
    if (race.type === "running") {
      time = race.times || "N/A"; // Grab the time object directly for running
    } else {
      time = race.times?.total_time || "N/A"; // Grab the total time for triathlons
    }

    if (!time) return best; // If no time, skip

    return best === "N/A" || convertTimeToMinutes(time) < convertTimeToMinutes(best) ? time : best;
  }, "N/A");

  const averageTime = totalRaces ? races.reduce((acc, race: any) => {
    let time;
    if (race.type === "running") {
      time = race.times || "N/A"; // Grab the time object directly for running
    } else if (race.distances) {
      time = race.times?.total_time || "N/A"; // Grab the total time for triathlons
    }
    return bestTime === "N/A" ? acc : acc + convertTimeToMinutes(time);
  }, 0) / totalRaces : "N/A";

  const bestPace = races.reduce((acc, race: any) => {
    let sentence;
    if (race.type === "running" && race.times == bestTime) {
      sentence = runPace({ timeString: race.times, distance: race.distance }) + " min/mi"; 
    } else if (race.distances && race.times.total_time == bestTime) {
      sentence = swimPace({ timeString: race.times.swim, distance: race.distances.swim }) + " / 100yd " 
      + mphAverage({ timeString: race.times.bike, distance: race.distances.bike }) + " mph " 
      + runPace({ timeString: race.times.run, distance: race.distances.run }) + " min/mi " || "N/A"; 
    }
    return sentence ? `${acc} ${sentence}`.trim() : acc;
  }, "").trim();

  const raceName = races.reduce((acc, race: any) => {
    let sentence;
    if (race.type === "running" && race.times == bestTime) {
      sentence = race.event_name; 
    } else if (race.type === "triathlon" && race.times.total_time == bestTime) {
      sentence = race.event_name;
    }
    return sentence ? `${acc} ${sentence}`.trim() : acc;
  }, "").trim();
  
  const averagePace = "N/D";

  return {
    name: subType,
    totalRaces,
    totalDistance,
    bestTime,
    averageTime: averageTime === "N/A" ? "N/A" : convertMinutesToTime(averageTime),
    bestPace,
    averagePace,
    raceName,
  };
};

// Helper functions for time conversions
const convertTimeToMinutes = (time: any) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 60 + minutes + seconds / 60;
};

const convertMinutesToTime = (totalMinutes: any) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

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
              <StatItem icon={Trophy} label="Personal Bests" value={`${category.raceName}`} />
            </div>
            <div className="space-y-2">
              <StatItem icon={Clock} label="Best Time" value={category.bestTime} />
              <StatItem icon={Timer} label="Best Pace" value={category.bestPace} />
              <StatItem icon={TrendingDown} label="Avg Pace" value={category.averagePace} />
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