import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchModels } from '@/store/actions/models'  // Import the appropriate actions
import Head from 'next/head'

import AppShell from '@/components/AppShell'
import { Footer } from '@/components/Footer'
import GameList from '@/components/lobby/GameList'
import GameActionBar from '@/components/lobby/GameActionBar'

export default function Home() {
  // Use redux hooks to get data from store
  const games = useSelector(state => state.games.games)
  const sessions = useSelector(state => state.sessions.sessions)
  
  // Use dispatch hook for dispatching actions
  const dispatch = useDispatch()

  // Dispatch actions to fetch games and sessions
  useEffect(() => {
    dispatch(fetchModels('games'))
    dispatch(fetchModels('sessions'))
  }, [dispatch])

  return (
    <>
      <Head>
        <title>Sector 41</title>
        <meta
          name="description"
          content="A game management system"
        />
      </Head>
      <AppShell />
      <GameActionBar />
      <main>
        <GameList games={games} sessions={sessions} />
      </main>
      <Footer />
    </>
  )
}
