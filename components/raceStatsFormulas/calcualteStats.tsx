import { mphAverage } from "@/app/Math/mphAverage";
import { runPace } from "@/app/Math/runPace";
import { swimPace } from "@/app/Math/swimPace";
import data from "../../app/Data/raceData.json";

export const calculateStatistics = (subType: any) => {
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
      let sentence = "Error";
      if (race.type === "running" && race.times == bestTime) {
        sentence = runPace({ timeString: race.times, distance: race.distance }) + " min/mi"; 
      } else if (race.distances && race.times.total_time == bestTime) {
        sentence = swimPace({ timeString: race.times.swim, distance: race.distances.swim }) + " / 100yd " 
        + mphAverage({ timeString: race.times.bike, distance: race.distances.bike }) + " mph " 
        + runPace({ timeString: race.times.run, distance: race.distances.run }) + " min/mi "; 
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
    
    const bestFinish = races.reduce((best, race: any) => {
      let finish;
      if (race.type === "running") {
        finish = ((race.rank.overall / race.rank.overall_total) * 100).toFixed(2) || "N/A"; // Grab the time object directly for running
      } else {
        finish = ((race.rank.overall / race.rank.overall_total) * 100).toFixed(2) || "N/A"; // Grab the total time for triathlons
      }
  
      if (!finish) return best; // If no time, skip
  
      return best === "N/A" || convertTimeToMinutes(finish) < convertTimeToMinutes(best) ? finish : best;
    }, "N/A");
  
    return {
      name: subType,
      totalRaces,
      totalDistance,
      bestTime,
      averageTime: averageTime === "N/A" ? "N/A" : convertMinutesToTime(averageTime),
      bestPace,
      bestFinish,
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