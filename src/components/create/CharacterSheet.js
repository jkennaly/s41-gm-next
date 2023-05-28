import React, { useState } from 'react';
import PDFC from './sections/PersonalDataFileCard'
import CCC from './sections/CoreCharacteristicsCard'
import LPC from './sections/LifePathCard'
import sections from './sections.json';

export default function CharacterSheet({ character, gameState, userData }) {
  const [activeSection, setActiveSection] = useState(null);

  console.log('CharacterSheet character', character);

  const handleSectionClick = section => e => {
    console.log('handleSectionClick section', section);
    setActiveSection(section);
  };

  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <main className="flex-1 min-w-0">
        <div className="min-w-0 flex-1">
          <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
            <PDFC clickHandler={handleSectionClick('PDF')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <CCC clickHandler={handleSectionClick('CC')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <LPC clickHandler={handleSectionClick('LP')} userData={userData} selectedCharacter={character} gameState={gameState} />
          </ul>
        </div>
      </main>
    </div>
  );
}
