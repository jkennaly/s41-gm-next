import StatusLine from './StatusLine'
import statuses from './statuses'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GameStatus({ game, players, sessions, gm }) {
  return (
    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
      <StatusLine label="Game" value={game.name} />
      {players && players.map(player => <StatusLine label="Player" value={player.nickname} />)}
      {sessions.map(session => <StatusLine label="Session" value={session.name} />)}
      <StatusLine label="Game Master" value={game.gmId} />
      <div className="flex justify-between gap-x-4 py-3">
        <dt className="text-gray-500">Status</dt>
        <dd className="flex items-start gap-x-2">
          <div
            className={classNames(
              statuses[game.status],
              'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
            )}
          >
            {game.status}
          </div>
        </dd>
      </div>
    </dl>
  )
}
