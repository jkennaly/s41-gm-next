import Head from 'next/head';
import AppShell from '../../components/AppShell';
import { Footer } from '../../components/Footer';


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import GameHeading from '../../components/lobby/GameHeading';
import GameStats from '../../components/lobby/GameStats';
import GameGMList from '../../components/gm/GameGMList';
import ActivityTable from '../../components/lobby/ActivityTable';
import { fetchAssocData } from '../../store/actions/models';
import { selectGameData } from '../../store/selectors/games';
import { selectUserData } from '@/store/selectors/users';

const GameDetail = () => {
  const router = useRouter();
  const [authId, setAuthId] = useState(0)
  const auth = useAuth();

  const userData = useSelector((state) => selectUserData(state, authId));
  const { id: ids } = router.query; // get the dynamic route param
    const id = ids && ids.length ? parseInt(ids[0], 10) : 0;
    
    const dispatch = useDispatch();
    const gameData = useSelector((state) => selectGameData(state, id));
    
  // Fetch game data when component mounts or id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchAssocData({id, modelName: 'games'}));
    }
  }, [dispatch, id]);


  useEffect(() => {
    if(auth.userId()) setAuthId(auth.userId())
  })
  if (!gameData) return <div>Loading...</div>; // Loading state
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
      <div>
      <GameHeading 
        gameStatus={gameData.status} 
        gameDescription={gameData.description || ''} 
        gameTitle={gameData.name}
        userData={userData}
        gameData={gameData}
      />
      <GameStats stats={Object.entries(gameData).filter(([name, value]) => !value || ['string', 'number'].includes(typeof value)).map(([name, value]) => ({name, value: value || ''}))} />
      {gameData.gm && <GameGMList gmList={[gameData.gm]} />}
      <ActivityTable activityItems={[]} />
    </div>
      </main>
      <Footer />
    </>
 
    
  );
};

export default GameDetail;
