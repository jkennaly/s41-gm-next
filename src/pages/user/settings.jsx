import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchModels } from '@/store/actions/models'  // Import the appropriate actions
import Head from 'next/head'

import AppShell from '@/components/AppShell'
import { Footer } from '@/components/Footer'
import UserSettingsForm from '@/components/admin/UserSettingsForm'

import schema from '@/schema/GM.schema.json'
import UserSettings from '@/components/admin/UserSettingsForm'

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
        <UserSettingsForm />
      </main>
      <Footer />
    </>
  )
}
