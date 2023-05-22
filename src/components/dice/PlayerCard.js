import statuses from '../lobby/statuses'

export default function GameCard({ player }) {
    const status = player.roll ? 'playing' : 'playerJoined'
  return (
        <div className={`overflow-hidden rounded-xl border ${statuses[status]}`}>
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img
              src={player.picture}
              alt={player.nickname}
              className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm font-medium leading-6 text-gray-900">{player.nickname}</div>
            <div className="text-sm font-medium leading-6 text-gray-900">{player.roll}</div>
        </div>
        </div>
  )
}
