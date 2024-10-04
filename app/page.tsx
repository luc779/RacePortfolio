import Image from "next/image";
import data from "./Data/data.json";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>Data from JSON</h1>
      <ul>
      {data.races.map((race: any) => (
          <li key={race.id}>
            <h2>{race.event_name}</h2>
            <p>Type: {race.type}</p>
            <p>Date: {race.date}</p>
            <p>Location: {race.location.city}, {race.location.state || race.location.country}</p>
            {race.type === "triathlon" && (
              <>
                <h3>Tri Distances</h3>
                <ul>
                  <li>Swim: {race.distances.swim}</li>
                  <li>Bike: {race.distances.bike}</li>
                  <li>Run: {race.distances.run}</li>
                </ul>
                <h3>Times</h3>
                <ul>
                  <li>Swim: {race.times.swim}</li>
                  <li>T1: {race.times.t1}</li>
                  <li>Bike: {race.times.bike}</li>
                  <li>T2: {race.times.t2}</li>
                  <li>Run: {race.times.run}</li>
                  <li>Total Time: {race.times.total_time}</li>
                </ul>
                <p>Division: {race.division}</p>
                <h3>Rank</h3>
                <ul>
                  <li>Division Rank: {race.rank.div} / {race.rank.div_total}</li>
                  <li>Gender Rank: {race.rank.gender} / {race.rank.gender_total}</li>
                  <li>Overall Rank: {race.rank.overall} / {race.rank.overall_total}</li>
                </ul>
              </>
            )}
            {race.type === "running" && (
              <>
                <h3>Distance: {race.distance}</h3>
                <h3>Time: {race.times}</h3>
                <p>Division: {race.division}</p>
                <h3>Rank</h3>
                <p>Overall Rank: {race.rank.overall}</p>
                <p>Age Group Rank: {race.rank.age_group}</p>
              </>
            )}
          </li>
        ))}
      </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
