import React, { useState } from 'react';
import Overview from './sections/Overview'
import PersonalDataFileForm from './entry/pdfForm'
import CoreCharacteristicsForm from './entry/ccForm';
import LifePathForm from './entry/lpForm';
import getStatusOfSection from '@/utils/getStatusOfSection';

export default function CharacterSheet({ userData, character, gameState, room }) {
  const [activeSection, setActiveSection] = useState(null);

  //console.log('CharacterSheet gameState', gameState);

  const handleSectionClick = section => e => {
    const status = getStatusOfSection(section)(character);
    console.log('handleSectionClick', section, status);
    if(status === 'disabled') return false;
    setActiveSection(section);
  };

  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <main className="flex-1 min-w-0">
        {character && <div className="min-w-0 flex-1">
      { (activeSection === 'PersonalDataFile' || activeSection === 'PDF') && gameState?.dbGame?.id && character?.id ? <PersonalDataFileForm gameId={gameState?.dbGame?.id} setActiveSection={setActiveSection} characterId={character?.id} />
          : (activeSection === 'CoreCharacteristics' || activeSection === 'CC') && gameState?.dbGame?.id && character?.id ? <CoreCharacteristicsForm userData={userData} room={room} gameState={gameState} setActiveSection={setActiveSection} characterId={character?.id} />
          : (activeSection === 'LifePath' || activeSection === 'LP') && gameState?.dbGame?.id && character?.id ? <LifePathForm userData={userData} room={room} gameState={gameState} setActiveSection={setActiveSection} characterId={character?.id} />
          : <Overview 
            handleSectionClick={handleSectionClick} 
            character={character}
            gameState={gameState?.dbGame || {}}
            userData={userData}
          />}
        </div>}
      </main>
    </div>
  );
}
