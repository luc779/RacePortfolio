export function swimPace({timeString, distance}: {timeString: string, distance: number}) {
    let  seconds = 0.0;
    const timeParts = timeString.split(":");
    // Check if the timeString is valid and contains at least minutes
    if (timeParts.length < 2) {
      return "-1";
    }
    const hourExtr = parseInt(timeParts[0], 10) * 60 * 60;
    const minutesExtr = parseInt(timeParts[1], 10) * 60;
    const secondsExt = parseInt(timeParts[2], 10);
    seconds = hourExtr + minutesExtr + secondsExt;
  
    seconds /= (distance * 1760);
    // turn 0.## seconds to ##
    seconds *= 100;
    // get amount of minutes in ##
    const minutesLeft = (seconds / 60) | 0
    // whats left from minutes move right 2x
    seconds = ((seconds % 60) / 100);
  
    if (isNaN(seconds)) {
      seconds = -1;
    }
  
    return (minutesLeft + seconds).toFixed(2);
}
  