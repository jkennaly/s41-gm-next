import GameCard from './GameCard'

export default function GameList({ games = [], sessions = [] }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {games.map((game) => (
        <GameCard key={game.id} game={game} sessions={sessions} />
      ))}
    </ul>
  )
}
