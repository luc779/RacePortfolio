import { Medal } from "lucide-react"

export function Rank({race}: {race:any}) {
    return (
      <div className="grid grid-cols-3 gap-8">
        <div>
          <strong>Type</strong>
          <p>Divison</p>
          <p>Gender</p>
          <p>Overall</p>
        </div>
        <RankPlace race={race}/>
        <RankTotals race={race}/>
      </div>
    )
}
  
export function RankPlace({race}: {race:any}) {
    return (
      <div>
        <strong>Place</strong>
        {["div", "gender", "overall"].map((key) => (
          <p key={key} className="flex items-center">
          {race.rank[key] === 0 ? (
            "N/A"
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
    )
}
  
export  function RankTotals({race}: {race:any}) {
    return (
      <div>
        <strong>Total</strong>
        {["div_total", "gender_total", "overall_total"].map((key) => (
          <p key={key}>{race.rank[key] || "N/A"}</p>
        ))}
      </div>
    )
}
  
export function TotalTime({race}: {race:any}) {
    return (
      <div className="text-lg font-bold">
        {race.type === "triathlon" ? (
          <span>{race.times.total_time}</span> 
        ) : race.type === "running" ? (
          <span>{race.times}</span> 
        ) : (
          <span>Other Event</span> 
        )}
      </div>
    )
}