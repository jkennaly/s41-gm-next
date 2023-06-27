import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateLifePath } from '@/store/actions/models';

import { probabilities as uniProb } from './pre/University';
import { probabilities as armyProb } from './pre/ArmyAcademy';
import { probabilities as marineProb } from './pre/MarineAcademy';
import { probabilities as navyProb } from './pre/NavyAcademy';
import PreCareerButton from './pre/PreCareerButton';
import { probabilizerBasic, calculateBonuses, mergeSkillArrays } from '@/utils/gameMethods';


export const entryChance = (character, entryModifier = 0) => {
  const { education } = calculateBonuses(character.coreCharacteristics);
  const { socialStanding } = character.coreCharacteristics
  const term = character.lifePaths.length + 1;
  if (term > 3) return 0;
  const termModifier = term === 2 ? -1 : term === 3 ? -2 : 0;
  const socModifier = socialStanding >= 9 ? 1 : 0;
  const netModifier = termModifier + socModifier + education + entryModifier;
  const result = probabilizerBasic(netModifier, 6 );
  //console.log('entryChance', result, education, termModifier, socModifier, netModifier)
  return result
}

const Draft = ({ draftType, gameId, character, handleModalClose, setModalContent, room, termNumber, setTerm}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateLifePath({characterId: character.id}));
  }, [character.id]);
    

    const { lifePaths } = character;

    //console.log('Draft', lifePaths)
    const currentPath = lifePaths.find(path => path.term === termNumber) || {};
    const { preCareerTerms, musteringOut, careerTerms } = currentPath;
    

  //console.log('maxSkills/checkedCount', maxSkills, checkedCount);
  return (
    <div className={`flex flex-col`}>
        <h4 className="flex items-center justify-around text-lg leading-6 font-medium text-gray-900">{`You've been drafted: Determine Branch`}</h4>
        { draftType === 'warDraft' && <div className="flex flex-col items-center justify-around text-lg leading-6 font-medium text-gray-900">
            <div>1-3 Army</div>
            <div>4-5 Marines</div>
            <div>6 Navy</div>
                    </div>}
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Draft;
