import React, { useState } from 'react';
import CharacterSheet from './CharacterSheet';
import Context from './Context';

export default function CharacterSelectionContainer({ gameState = {}, userData = {}, room }) {
    const { pcs = {}, npcs = [] } = gameState;
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [displayContext, setDisplayContext] = useState(false);

  // Status state
  const isGm = userData.id && userData.id === gameState?.dbGame?.gmId;
  const hasPC = !isGm && Object.keys(pcs).includes(userData.id);
  const gameId = gameState?.dbGame?.id;

  console.log('CharacterSelectionContainer npcs', npcs.filter(c => c && c.id));

  // Handle the creation of a new character
  const handleNewCharacter = () => {
    if(!hasPC && room && room.send) room.send('CREATE_CHARACTER')
  }


  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
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
              {character?.personalDataFile?.Name || `Unnamed PC ${character.id}`}
            </button>
          ))}
        </div>
        <div className="p-4">
          <h2 className="font-bold mb-2">NPCs</h2>
          {npcs.filter(c => c && c.id).map((character) => (
            <button 
              key={character.id} 
              onClick={() => handleCharacterClick(character)}>
              {character?.personalDataFile?.Name || `Unnamed NPC ${character.id}`}
            </button>
          ))}
        </div>

      </div>
      <div className="w-3/4">
        {selectedCharacter && (
          <CharacterSheet character={selectedCharacter} />
        )}
        {!selectedCharacter && displayContext && isGm && gameId && (
          <Context gameId={gameId} />
        )}
      </div>
    </div>
  );
}
