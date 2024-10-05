import RaceCard from "@/components/ui/race-card";
import data from "./Data/raceData.json";
import runningImage from "./images/running.jpg"
import triathlonImage from "./images/triathlon.jpg"
import ConciseRaceStatistics from "@/components/ui/race-statistics";

export default function Home() {
  return (
    <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <main className="">
         <ConciseRaceStatistics />
      </main>
      <main className="">
        <h1 className="text-3xl font-bold text-center mb-10">Races</h1>

        <div className="grid grid-cols-3 gap-8">
          {data.races.map((race: any) => (
            <div key={race.id}>
              <RaceCard 
              race={race}
              imageUrl={(race.type === "triathlon" ? triathlonImage.src : runningImage.src)}                  
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
