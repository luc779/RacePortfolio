import { mphAverage } from "@/app/Math/mphAverage";
import { runPace } from "@/app/Math/runPace";
import { swimPace } from "@/app/Math/swimPace";

export function ChipTime({race}: {race:any}) {
    return (
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
    )
}