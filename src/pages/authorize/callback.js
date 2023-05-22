import { useEffect } from 'react';
import Head from 'next/head'
import { setUser } from '@/store/reducers/auth';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/auth/auth';

import AppShell from '@/components/AppShell'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function Home() {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const query = window.location.search.substring(1);
    if(query) {
      auth.handleAuthentication()
        .then(user => {
          window.location.href = '/'
          dispatch(setUser(user), 'users');
        })
    } 
  }, [window.location.search, dispatch])
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
      </main>
      <Footer />
    </>
  )
}
