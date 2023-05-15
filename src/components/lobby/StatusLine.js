const valueHandlers = {
    Game: (value) => <div>{value}</div>,
    Players: (value) => (
      <div>
        {value.map((player, index) => (
          <span key={index}>{player}</span>
        ))}
      </div>
    ),
    Sessions: (value) => (
      <div>
        {value.map((session, index) => (
          <span key={index}>{session}</span>
        ))}
      </div>
    ),
    "Game Master": (value) => <div>{value}</div>,
  };
  
  export default function StatusLine({ label, value }) {
    const ValueComponent = valueHandlers[label];
  
    return (
      <div className="flex justify-between gap-x-4 py-3">
        <dt className="text-gray-500">{label}</dt>
        <dd className="text-gray-700">
          {ValueComponent ? ValueComponent(value) : value}
        </dd>
      </div>
    );
  }
  