import React, { useState } from 'react';
import CharacterSheet from './CharacterSheet';

export default function CharacterSelectionContainer({ gameState = {}, userData = {}, room }) {
    const { pcs = {}, npcs = [] } = gameState;
  const [selectedCharacter, setSelectedCharacter] = useState(null);


  // Status state
  const isGm = userData.id && userData.id === gameState?.dbGame?.gmId;
  const hasPC = !isGm && Object.keys(pcs).includes(userData.id);

  // Handle the creation of a new character
  const handleNewCharacter = () => {
    if(!hasPC && room && room.send) room.send('CREATE_CHARACTER')
  }


  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="flex">
      <div className="w-1/4 border-r">
      {!hasPC && <button onClick={handleNewCharacter} disabled={hasPC}> New Character </button>}
        <div className="p-4">
          <h2 className="font-bold mb-2">PCs</h2>
          {Object.values(pcs).filter(Boolean).map((character) => (
            <button 
              key={character.id} 
              onClick={() => handleCharacterClick(character)}>
              {character.name}
            </button>
          ))}
        </div>
        <div className="p-4">
          <h2 className="font-bold mb-2">NPCs</h2>
          {Object.values(npcs).filter(Boolean).map((character) => (
            <button 
              key={character.id} 
              onClick={() => handleCharacterClick(character)}>
              {character.name}
            </button>
          ))}
        </div>

      </div>
      <div className="w-3/4">
        {selectedCharacter && (
          <CharacterSheet character={selectedCharacter} />
        )}
      </div>
    </div>
  );
}
