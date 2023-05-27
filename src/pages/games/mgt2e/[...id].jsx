import Head from 'next/head';
import AppShell from '../../../components/AppShell';
import { Footer } from '../../../components/Footer';


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/dice/Table';
import ActionBar from '../../../components/dice/ActionBar';
import ScoreBoard from '../../../components/dice/ScoreBoard';
import GameHeading from '../../../components/lobby/GameHeading';
import GameStats from '../../../components/lobby/GameStats';
import CardList from '../../../components/cards/CardList';
import Card from '../../../components/cards/CharacterCreate';
import ActivityTable from '../../../components/lobby/ActivityTable';
import { fetchModelDataArray } from '../../../store/actions/models';
import { selectGameData } from '../../../store/selectors/games';
import { selectUserData } from '@/store/selectors/users';
import { getPlayerIds  } from '@/utils/gameMethods';


import * as Colyseus from "colyseus.js"

var client = new Colyseus.Client('ws://localhost:3001')

function addMethodsToGameState(gameState) {
  return {
    ...gameState,
    getPlayerIds: () => getPlayerIds(gameState),
  };
}

const GameDetail = () => {
  const router = useRouter();
  const [authId, setAuthId] = useState(0)
  const [room, setRoom] = useState(null)
  const [gameState, setGameState] = useState(null)
  const auth = useAuth();
  const { id: ids } = router.query; // get the dynamic route param
    const id = ids && ids.length ? parseInt(ids[0], 10) : 0;
    
    const dispatch = useDispatch();
    const gameData = useSelector((state) => selectGameData(state, id));
    const nextPlayer = useSelector((state) => selectUserData(state, gameState && gameState.currentTurn));

    
  // Fetch game data when component mounts or id changes
  useEffect(() => {
    const joinOrCreateRoom = async () => {
      try {
        if (id) {
          const roomOptions = { 
            gameId: id.toString(), 
            create: true,
            token: (await auth.getAccessToken()),
          }
          const room = await client.joinOrCreate(`lobby`, roomOptions);
  
          room.onStateChange((state) => {

            const stateWithMethods = addMethodsToGameState(state);
            const ids = stateWithMethods.getPlayerIds()
            dispatch(fetchModelDataArray({ids, modelName: 'users'}));

            setGameState(stateWithMethods);
          });
  
          room.onMessage("message_type", (message) => {
            console.log(client.id, "received on", room.name, message);
          });
  
          room.onError((code, message) => {
            console.log(client.id, "couldn't join", room.name);
          });
  
          room.onLeave((code) => {
            console.log(client.id, "left", room.name);
          });

          room.onMessage('MOVE_TO_CHARACTER_GENERATION', async () => {
            await room.leave();
            const charGenRoom = await client.joinOrCreate('character_generation', roomOptions);
            // Now set up listeners for the new room...
          });
          
  
          setRoom(room);
        }
      } catch (error) {
        if (error.message === 'TOKEN_EXPIRED') {
          // request for a new token or refresh token
        } else {
        console.log("JOIN ERROR", error);
        }
      }
    };
  
    joinOrCreateRoom();
  }, [dispatch, id, client]);


  useEffect(() => {
    if(auth.userId()) setAuthId(auth.userId())
  })

  const userData = useSelector((state) => selectUserData(state, authId));
  if (!gameData) return <div>Loading...</div>; // Loading state
  console.log('Current state of Lobby', JSON.parse(JSON.stringify(gameState)))
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
    </div>
    <ActionBar player={nextPlayer} user={userData} room={room} />
    <Table gameState={gameState} />

      </main>
      <Footer />
    </>
 
    
  );
};

export default GameDetail;
