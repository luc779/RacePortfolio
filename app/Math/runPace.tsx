export function runPace({timeString, distance}: {timeString: string, distance: number}) {
    // Split the time string into components
    const timeParts = timeString.split(":");
    
    // Convert time parts into total hours
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    
    // Calculate total time in hours
    var totalTimeInHours = hours * 60 + minutes + seconds / 60;
  
    // Avoid division by zero if totalTimeInHours is 0
    if (totalTimeInHours === 0) {
      return "-1"; // or handle as needed
    }
  
    // Calculate average speed
    var averageSpeed = totalTimeInHours / distance;
    // get decimal val of num
    var temp = averageSpeed % 1;
    // get whole number from val, then calculate minutes to seconds
    averageSpeed = (averageSpeed - temp) + temp * 60 / 100;
  
    return averageSpeed.toFixed(2);
  }