import React, { useState } from 'react';
import sections from './sections.json';

export default function CharacterSheet({ character }) {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = section => {
    // Custom logic here...
    setActiveSection(section);
  };

  return (
    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={character.currentPortrait} alt="" />
      </div>
      <div className="min-w-0 flex-1">
        {sections.map(section => (
          <button
            key={section.name}
            onClick={() => handleSectionClick(section)}
            className="focus:outline-none"
            disabled={section.prerequisite && !section.prerequisite.isCompleted}>
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{section.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
