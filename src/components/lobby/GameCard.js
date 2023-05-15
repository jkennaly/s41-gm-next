import Link from 'next/link'
import GameMenu from './GameMenu'
import GameStatus from './GameStatus'
import statuses from './statuses'

export default function GameCard({ game, sessions }) {
  return (
    <Link href={`/games/${game.id}`}>
        <li className={`overflow-hidden rounded-xl border ${statuses[game.status]}`}>
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img
              src={game.imageUrl}
              alt={game.name}
              className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm font-medium leading-6 text-gray-900">{game.name}</div>
            <GameMenu game={game} sessions={sessions} />
          </div>
          <GameStatus game={game} sessions={sessions} />
        </li>
    </Link>
  )
}
