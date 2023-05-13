import Head from 'next/head'

import AppShell from '@/components/AppShell'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Schedule } from '@/components/Schedule'
import { Speakers } from '@/components/Speakers'
import { Sponsors } from '@/components/Sponsors'

export default function Home() {
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
      <Header />
      <main>
        <Hero />
        <Speakers />
        <Schedule />
        <Sponsors />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
