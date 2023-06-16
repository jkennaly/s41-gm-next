import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContextData } from '@/store/selectors/contexts';
import { selectGameData } from '@/store/selectors/games';
import { fetchModelContext, fetchUniverseSubdivisions, fetchUniverseFeatures } from '@/store/actions/models';
import Game from '@/components/context/Game';
import Overall from '@/components/context/Overall';
import Subdivision from '@/components/context/SubdivisionForm';
import Feature from '@/components/context/FeatureForm';

const Context = ({ gameId }) => {
  // Fetch game data from your API, use hardcoded data for now
  const dispatch = useDispatch();
  const [display, setDisplay] = useState({scale: 'game', focus: 'overall', type: 'universe', function: 'view'});


  //get context from the store
  const gameData = useSelector((state) => selectGameData(state, gameId));
  const context = useSelector((state) => selectContextData(state, gameId));

  useEffect(() => {
    //dispatch an action to update the context store
    dispatch(fetchModelContext({id: gameId, modelName: 'games'}));
    console.log('Context useEffect gameId', JSON.stringify(context));
    if(context?.universe?.id) {
      dispatch(fetchUniverseSubdivisions({universeId: context.universe.id, modelName: 'feature'}));
      dispatch(fetchUniverseSubdivisions({universeId: context.universe.id, modelName: 'subdivision'}));
      
    } 
    }, [gameId, JSON.stringify(context?.universe)]);

  const showOverall = display.focus === 'overall' && display.scale === 'game' && display.type === 'universe'
  const showSubdivisionForm = display.type === 'subdivision'
  const showFeatureForm = display.type === 'feature'

  // console.log('showOverall', showOverall);
  // console.log('showSubdivisionForm', showSubdivisionForm);
  return (
    <div>
      {
        !context?.universe?.id ? <div>Loading...</div>
        : showOverall ? <Overall game={gameData} context={context} setDisplay={setDisplay} display={display} />
        : showSubdivisionForm ? <Subdivision game={gameData} context={context.universe} setDisplay={setDisplay} display={display} />  
        : showFeatureForm ? <Feature game={gameData} context={context.universe} setDisplay={setDisplay} display={display} />  
      : <Game game={gameData} context={context.universe} setDisplay={setDisplay} />
      }
    </div>
  )
};

export default Context;
