export function TypeDateLocation({race}: {race:any}) {
    return (
      <div className="grid grid-cols-3 gap-8 mb-1">
        <div className="text-sm">
          <strong>Type:</strong>
          <p>{race.sub_type}</p>
        </div>
        <div className="text-sm">
          <strong>Date:</strong>
          <p>{race.date}</p>
        </div>
        <div className="text-sm">
          <strong>Location:</strong>
          <p>{race.location.city}, {race.location.state}, {race.location.country}</p>
        </div>
      </div>
    )
}