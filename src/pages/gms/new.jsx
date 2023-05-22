import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchModels } from '@/store/actions/models'  // Import the appropriate actions
import Head from 'next/head'

import AppShell from '@/components/AppShell'
import { Footer } from '@/components/Footer'
import GameCreateForm from '@/components/lobby/GameCreateForm'

import schema from '@/schema/GM.schema.json'

export default function Home() {

  
  // Use dispatch hook for dispatching actions
  const dispatch = useDispatch()

  // Dispatch actions to fetch games and sessions
  useEffect(() => {
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
      <main>
        <GameCreateForm schema={schema} />
      </main>
      <Footer />
    </>
  )
}
