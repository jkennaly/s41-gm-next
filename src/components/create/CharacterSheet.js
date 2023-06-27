import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCharacter } from '@/store/selectors/characters';
import Overview from './sections/Overview'
import PersonalDataFileForm from './entry/pdfForm'
import CoreCharacteristicsForm from './entry/ccForm';
import LifePathForm from './entry/lpForm';
import getStatusOfSection from '@/utils/getStatusOfSection';

export default function CharacterSheet({ userData, character: inchar, gameState, room }) {
  const [activeSection, setActiveSection] = useState(null);
  const character = useSelector((state) => selectCharacter(state, inchar.id));
    
  //console.log('CharacterSheet gameState', gameState);

  const handleSectionClick = section => e => {
    const status = getStatusOfSection(section)(character);
    //console.log('handleSectionClick', section, status);
    if(status === 'disabled') return false;
    setActiveSection(section);
  };

  const showPdf = Boolean((activeSection === 'PersonalDataFile' || activeSection === 'PDF') && gameState?.dbGame?.id && character?.id)
  const showCc = Boolean((activeSection === 'CoreCharacteristics' || activeSection === 'CC') && gameState?.dbGame?.id && character?.id)
  const showLp = Boolean((activeSection === 'LifePath' || activeSection === 'LP') && gameState?.dbGame?.id && character?.id)

  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <main className="flex-1 min-w-0">
        {character && <div className="min-w-0 flex-1">
      { showPdf ? <PersonalDataFileForm gameId={gameState?.dbGame?.id} setActiveSection={setActiveSection} characterId={character?.id} />
          : showCc ? <CoreCharacteristicsForm userData={userData} room={room} gameState={gameState} setActiveSection={setActiveSection} characterId={character?.id} />
          : showLp ? <LifePathForm gameId={gameState?.dbGame?.id} userData={userData} room={room} gameState={gameState} setActiveSection={setActiveSection} characterId={character?.id} />
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
