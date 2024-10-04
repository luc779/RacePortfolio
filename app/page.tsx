import RaceCard from "@/components/ui/race-card";
import data from "./Data/raceData.json";
import runningImage from "./images/running.jpg"
import triathlonImage from "./images/triathlon.jpg"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <h1>Stats</h1>
      </main>
      <main className="">
        <h1>Races</h1>

        <div className="grid grid-cols-3 gap-8">
        {data.races.map((race: any) => (
            <div key={race.id}>
              {race.type === "triathlon" && (
                <>
                  <RaceCard 
                    chipTime={race.times.total_time} 
                    raceType={race.type}
                    raceName={race.event_name} 
                    imageUrl={triathlonImage.src} 
                    overallRank={race.rank.overall} 
                    genderRank={race.rank.gender} 
                    divisionRank={race.rank.div} 
                    city={race.location.city} 
                    state={race.location.state} 
                    country={race.location.country} 
                    />
                </>
              )}
              {race.type === "running" && (
                <>
                  <RaceCard 
                    chipTime={race.times} 
                    raceType={race.type}
                    raceName={race.event_name} 
                    imageUrl={runningImage.src} 
                    overallRank={race.rank.overall} 
                    genderRank={race.rank.gender} 
                    divisionRank={race.rank.div} 
                    city={race.location.city} 
                    state={race.location.state} 
                    country={race.location.country} 
                    />
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
