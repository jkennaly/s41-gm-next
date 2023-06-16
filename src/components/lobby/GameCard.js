import Link from 'next/link'
import GameMenu from './GameMenu'
import GameStatus from './GameStatus'
import statuses from './statuses'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/reducers/auth';
import { fetchAssocData } from '@/store/actions/models';
import { useEffect, useState } from 'react';
import { useAuth } from '@/auth/auth';



export default function GameCard({ game, sessions }) {
  const user = useSelector(selectUser) || {};
  const [authId, setAuthId] = useState(0)
  const auth = useAuth();
  const dispatch = useDispatch();
  const isGm = game.gmId === authId;

  useEffect(() => {
    if(auth.userId()) setAuthId(auth.userId())
  }, [user])

  
  // Fetch game data when component mounts or id changes
  useEffect(() => {
    if (authId) {
      dispatch(fetchAssocData({id: authId, modelName: 'users'}));
    }
  }, [dispatch, authId]);
  console.log('GameCard', game, sessions)
  return (
    <Link href={`/games/${game.id}`}>
        <li className={`overflow-hidden rounded-xl border ${statuses[game.status]}`}>
        <div className="gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="flex items-center">
            <img
              src={game.imageUrl}
              className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <h2 className="text-2xl px-4 font-medium leading-6 text-gray-900">{game.name}</h2>
            <GameMenu game={game} sessions={sessions} />
            </div>
            {isGm && <h4 className="text-sm font-medium leading-6 text-gray-900">My Game</h4>}
            </div>
          <GameStatus game={game} sessions={sessions} />
        </li>
    </Link>
  )
}
