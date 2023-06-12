import React, { useState, useEffect } from 'react';
import CharacterSheet from './CharacterSheet';
import Context from './Context';
import { useSelector, useDispatch } from 'react-redux';
import { selectPC, selectAllCharacterData } from '@/store/selectors/characters';
import { fetchControlledCharacters, fetchCharacter, fetchCharacters } from '@/store/actions/models';

export default function CharacterSelectionContainer({ 
  controlledCharacters, 
  gameState = {}, 
  userData = {}, 
  room 
}) {
  console.log('CharacterSelectionContainer controlledCharacters', controlledCharacters)

    const { pcs = {}, npcs = [] } = gameState;
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [displayContext, setDisplayContext] = useState(false);
  const dispatch = useDispatch();

  
  // Status state
  const isGm = userData.id && userData.id === gameState?.dbGame?.gmId;
  const hasPC = !isGm && Object.keys(pcs).includes(userData.id);
  const gameId = gameState?.dbGame?.id;
  const pcId = hasPC ? pcs[userData.id].id : null;
  
  const pc = useSelector((state) => selectPC(state, pcId));
  if(pcId && !pc) dispatch(fetchControlledCharacters(gameId))
  const displayNpcs = (useSelector((state) => selectAllCharacterData(state)))
    .filter(c => npcs.some(n => n.id === c.id))
  
  useEffect(() => {
    dispatch(fetchCharacters({gameId}));
    
  }, [dispatch, gameId]);
  

  // Fetch game data when component mounts or id changes
  useEffect(() => {
    if (selectedCharacter && selectedCharacter.id) {
      dispatch(fetchCharacter({characterId: selectedCharacter.id}));
    }
  }, [dispatch, selectedCharacter]);
  //console.log('CharacterSelectionContainer npcs', npcs.filter(c => c && c.id));

  // Handle the creation of a new character
  const handleNewCharacter = () => {
    if(!hasPC && room && room.send) room.send('CREATE_CHARACTER')
  }


  const handleCharacterClick = (character) => {

    const selectedControlled = controlledCharacters.find(c => c.id === character.id);
    setSelectedCharacter(selectedControlled || character);
    setDisplayContext(false);
  };

  const defineContext = () => {
    setDisplayContext(true);
    setSelectedCharacter(null);
  }



  return (
    <div className="flex">
      <div className="w-1/4 border-r">
      {!hasPC && <button onClick={handleNewCharacter} disabled={hasPC}> New Character </button>}
        { isGm && (
          <button onClick={defineContext}> Define Context </button>
        )}
        <div className="p-4">
          <h2 className="font-bold mb-2">PCs</h2>
          {Object.values(pcs).filter(c => c && c.id).map((character) => (
            <button 
              key={character.id} 
              onClick={() => handleCharacterClick(character)}>
              {character?.personalDataFile?.name || `Unnamed PC ${character.id}`}
            </button>
          ))}
        </div>
        <div className="p-4">
          <h2 className="font-bold mb-2">NPCs</h2>
          {displayNpcs.filter(c => c && c.id)
            .map((character) => (
              <button 
                key={character.id} 
                onClick={() => handleCharacterClick(character)}>
                {character?.personalDataFile?.name || `Unnamed NPC ${character.id}`}
              </button>
          ))}
        </div>

      </div>
      <div className="w-3/4">
        {selectedCharacter && (
          <CharacterSheet character={selectedCharacter} gameState={gameState?.dbGame || {}} />
        )}
        {!selectedCharacter && displayContext && isGm && gameId && (
          <Context gameId={gameId} />
        )}
      </div>
    </div>
  );
}
