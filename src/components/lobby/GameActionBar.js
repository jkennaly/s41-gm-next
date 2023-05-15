import { useRouter } from 'next/router'

export default function GameActionBar() {
  const router = useRouter()

  const handleCreateGame = () => {
    router.push('/games/new') // Update this with your actual route
  }

  return (
    <div className="flex justify-end p-4">
      <button
        onClick={handleCreateGame}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      >
        Create Game
      </button>
    </div>
  )
}
