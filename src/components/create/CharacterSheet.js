import React, { useState } from 'react';
import Overview from './sections/Overview'
import PersonalDataFileForm from './entry/pdfForm'
import getStatusOfSection from '@/utils/getStatusOfSection';

export default function CharacterSheet({ character, gameState, userData }) {
  const [activeSection, setActiveSection] = useState(null);

  console.log('CharacterSheet character', character);

  const handleSectionClick = section => e => {
    const status = getStatusOfSection(section)(character);
    if(status === 'disabled') return false;
    setActiveSection(section);
  };

  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <main className="flex-1 min-w-0">
        {character && <div className="min-w-0 flex-1">
      { activeSection === 'PersonalDataFile'|| activeSection === 'PDF' ? <PersonalDataFileForm setActiveSection={setActiveSection} character={character} />
          : <Overview 
            handleSectionClick={handleSectionClick} 
            character={character}
            gameState={gameState}
            userData={userData}
          />}
        </div>}
      </main>
    </div>
  );
}
