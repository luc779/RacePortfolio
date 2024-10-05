export function mphAverage({timeString, distance}: {timeString: string, distance: number}) {
    // Split the time string into components
    const timeParts = timeString.split(":");
    
    // Convert time parts into total hours
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    
    const totalTimeInHours = hours + minutes / 60 + seconds / 3600;
  
    if (totalTimeInHours === 0) {
      return "-1"; // or handle as needed
    }
  
    const averageSpeed = distance / totalTimeInHours;
    return averageSpeed.toFixed(1);
}