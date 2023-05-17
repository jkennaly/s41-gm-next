import Head from 'next/head';
import AppShell from '../../components/AppShell';
import { Footer } from '../../components/Footer';


import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameHeading from '../../components/lobby/GameHeading';
import GameStats from '../../components/lobby/GameStats';
import GameGMList from '../../components/gm/GameGMList';
import ActivityTable from '../../components/lobby/ActivityTable';
import { fetchAssocData } from '../../store/actions/models';
import { selectGameData } from '../../store/selectors/games';

const GameDetail = () => {
  const router = useRouter();
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

  if (!gameData) return <div>Loading...</div>; // Loading state
  console.log('GameDetail gameData', gameData);

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
      />
      <GameStats stats={Object.entries(gameData).filter(([name, value]) => !value || ['string', 'number'].includes(typeof value)).map(([name, value]) => ({name, value: value || ''}))} />
      <GameGMList gmList={[gameData.gm]} />
      <ActivityTable activityItems={[]} />
    </div>
      </main>
      <Footer />
    </>
 
    
  );
};

export default GameDetail;
