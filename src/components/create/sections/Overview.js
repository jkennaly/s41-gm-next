import React, { useState } from 'react';
import PDFC from './PersonalDataFileCard'
import CCC from './CoreCharacteristicsCard'
import LPC from './LifePathCard'
import ArmorCard from './ArmorCard';
import AugCard from './AugmentationCard';
import FinancesCard from './FinancesCard';
import SkillsCard from './SkillsCard';
import WeaponsCard from './WeaponsCard';
import GearCard from './GearCard';

export default function CharacterSheet({ character, gameState, userData, handleSectionClick }) {


  return (
          <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
            <PDFC clickHandler={handleSectionClick('PDF')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <CCC clickHandler={handleSectionClick('CC')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <LPC clickHandler={handleSectionClick('LP')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <ArmorCard clickHandler={handleSectionClick('Armor')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <AugCard clickHandler={handleSectionClick('Aug')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <FinancesCard clickHandler={handleSectionClick('Finances')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <SkillsCard clickHandler={handleSectionClick('Skills')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <WeaponsCard clickHandler={handleSectionClick('Weapons')} userData={userData} selectedCharacter={character} gameState={gameState} />
            <GearCard clickHandler={handleSectionClick('Gear')} userData={userData} selectedCharacter={character} gameState={gameState} />
          </ul>
  );
}
