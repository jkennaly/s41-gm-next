

export default function CardList({ cards }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {cards.map((card) => (
      card    
    ))}
    </ul>
  )
}
