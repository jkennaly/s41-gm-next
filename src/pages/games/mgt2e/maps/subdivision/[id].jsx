import Head from 'next/head';
import AppShell from '@/components/AppShell';
import { Footer } from '@/components/Footer';


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@/components/dice/Table';
import ActionBar from '@/components/dice/ActionBar';
import ScoreBoard from '@/components/dice/ScoreBoard';
import GameHeading from '@/components/lobby/GameHeading';
import GameStats from '@/components/lobby/GameStats';
import CardList from '@/components/cards/CardList';
import Card from '@/components/cards/CharacterCreate';
import Dashboard from '@/components/create/Dashboard';
import MapOverview from '@/components/context/map/subsector/overview';
import { fetchModelDataArray, fetchControlledCharacters, fetchCharacters } from '@/store/actions/models';
import { selectGameData } from '@/store/selectors/games';
import { selectUserData } from '@/store/selectors/users';
import { getPlayerIds, getCharacterIds  } from '@/utils/gameMethods';
import { selectSubdivision } from '@/store/selectors/contexts';

import * as Colyseus from "colyseus.js"

var client = new Colyseus.Client('ws://localhost:3001')

function addMethodsToGameState(gameState) {
  return {
    ...gameState,
    getPlayerIds: () => getPlayerIds(gameState),
    getCharacterIds: () => getCharacterIds(gameState),
  };
}

const MapDisp = () => {
  const router = useRouter();
  const [authId, setAuthId] = useState(0)
  const [room, setRoom] = useState(null)
  const [gameState, setGameState] = useState(null)
  const auth = useAuth();
  const { id: subdivisionIds } = router.query; // get the dynamic route param
  const subdivisionId = subdivisionIds && subdivisionIds.length ? parseInt(subdivisionIds[0], 10) : 0;
      
  const dispatch = useDispatch();
  const subdivision = useSelector((state) => selectSubdivision(state, subdivisionId));
  const id = subdivision && subdivision.gameId ? subdivision.gameId : 0;
  const gameData = useSelector((state) => selectGameData(state, id));
  



    
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
          const room = await client.joinOrCreate(`chargen_mgt2e`, roomOptions);
  
          room.onStateChange((state) => {

            const stateWithMethods = addMethodsToGameState(state);
            const ids = stateWithMethods.getPlayerIds()
            //console.log('state changed', ids, JSON.parse(JSON.stringify(stateWithMethods)))
            dispatch(fetchModelDataArray({ids, modelName: 'users'}));
            dispatch(fetchCharacters({gameId: id}));

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
  console.log('Current state of Game on Map', JSON.parse(JSON.stringify(gameState)))
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
        gameStatus={'active'} 
        gameDescription={gameData.description || ''} 
        gameTitle={gameData.name}
        userData={userData}
        gameData={gameData}
      />
    </div>
    <MapOverview subdivision={subdivision} />

      </main>
      <Footer />
    </>
 
    
  );
};

export default MapDisp;
