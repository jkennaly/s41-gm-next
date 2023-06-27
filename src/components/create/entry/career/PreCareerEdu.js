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

const PreCareerEdu = ({ gameId, character, handleModalClose, setModalContent, room, termNumber, setTerm}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateLifePath({characterId: character.id}));
  }, [character.id]);
    

    const { lifePaths } = character;

    //console.log('PreCareerEdu', lifePaths)
    const currentPath = lifePaths.find(path => path.term === termNumber) || {};
    const { preCareerTerms, musteringOut, careerTerms } = currentPath;
    const allDisabled = Boolean(musteringOut || careerTerms);
    const onlyUniversity = Boolean(preCareerTerms && preCareerTerms.name === 'University');
    const onlyArmy = Boolean(preCareerTerms && preCareerTerms.name === 'Army Academy');
    const onlyMarine = Boolean(preCareerTerms && preCareerTerms.name === 'Marine Academy');
    const onlyNavy = Boolean(preCareerTerms && preCareerTerms.name === 'Navy Academy');
    const uniDisabled = Boolean(allDisabled || onlyArmy || onlyMarine || onlyNavy);
    const armyDisabled = Boolean(allDisabled || onlyUniversity || onlyMarine || onlyNavy);
    const marineDisabled = Boolean(allDisabled || onlyUniversity || onlyArmy || onlyNavy);
    const navyDisabled = Boolean(allDisabled || onlyUniversity || onlyArmy || onlyMarine);


    const handleCancel = (event) => {
      event.preventDefault();
      handleModalClose();
    };

    const handleChooseSkills = (event) => {
      event.preventDefault();
      setModalContent('universitySkills');
    };
    
    const handleUniversity = (event) => {
      event.preventDefault();
      //set nextPhase based on character state
      let nextPhase = ''
      if (lifePaths.length === 0) nextPhase = 'verify';
      else {
        const currentPath = lifePaths[lifePaths.length - 1];
        if(!currentPath.preCareerTerms) nextPhase = 'verify';
        else {
          const { preCareerTerms } = currentPath;
          const {
            graduated,
            honored,
            accepted,
            commissioned,
            skillsAdded,
            entryAttempted,
            graduationAttempted,
            completed,
            event
          } = preCareerTerms;
          if (!entryAttempted && !accepted) nextPhase = 'verify';
            else {
              if(!skillsAdded) nextPhase = 'universitySkills';
              else {
                if(!event) nextPhase = 'preCareerEvent'
                else nextPhase = 'graduation';
              }
            }
        }
      }
      //console.log('nextPhase', nextPhase)
      //console.log('lifePaths', lifePaths)
      

      if (nextPhase === 'verify') {
      const { education } = calculateBonuses(character.coreCharacteristics);
      const { socialStanding } = character.coreCharacteristics
      const termCount = character.lifePaths.length + 1;
      const termModifier = termCount === 2 ? -1 : termCount === 3 ? -2 : 0;
      const socModifier = socialStanding >= 9 ? 1 : 0;
      const netModifier = termModifier + socModifier + education;
      const modifiers = [
        ['Term Count', termModifier],
        ['Social Standing', socModifier],
        ['Education', education]
      ]

      const enterMessage = {
          roomId: gameId,
          game: `mgt2e`,
          type: `chargen`,
          room,
          msg: "ROLL_BASIC"
        };
      const term = {
        acceptContent: <button onClick={handleChooseSkills}>Choose Skills</button>,
        failContent: <button onClick={handleCancel}>Try for Career</button>,
        termContent: 'university',
        enterMessage,
        characterId: character.id,
        room,
        name: 'University',
        entryRequired: true,
        cancelContent: 'preCareer',
        modifiers,
        netModifier,
        entryDescription: `EDU 6+`,
        entryTarget: 6,
      }
      setTerm(term)
      setModalContent('verify');
    } else if(nextPhase === 'universitySkills') {
      setModalContent('universitySkills');
    } else if(nextPhase === 'preCareerEvent') {
      setModalContent('preCareerEvent');
    } else if(nextPhase === 'graduation') {
      setModalContent('graduation');
    }

    
    };
    
    const handleArmy = (event) => {
      event.preventDefault();
      setModalContent('army');

      handleModalClose();
    };
    
    const handleMarine = (event) => {
      event.preventDefault();
      setModalContent('marine');

      handleModalClose();
    };
    
    const handleNavy = (event) => {
      event.preventDefault();
      setModalContent('navy');

      handleModalClose();
    };

  //console.log('maxSkills/checkedCount', maxSkills, checkedCount);
  return (
    <div className={`flex flex-col`}>
        <h4 className="flex items-center justify-around text-lg leading-6 font-medium text-gray-900">{`Select Education or Cancel and Select Career`}</h4>
        <PreCareerButton
          disabled={uniDisabled}
          clickHandler={handleUniversity} 
          label="University"
          character={character}
          probabilities={uniProb}
        />
        <PreCareerButton
          disabled={armyDisabled}
          clickHandler={handleArmy} 
          label="Army Academy"
          character={character}
          probabilities={armyProb}
        />
        <PreCareerButton
          disabled={marineDisabled}
          clickHandler={handleMarine} 
          label="Marine Academy"
          character={character}
          probabilities={marineProb}
        />
        <PreCareerButton
          disabled={navyDisabled}
          clickHandler={handleNavy} 
          label="Navy Academy"
          character={character}
          probabilities={navyProb}
        />
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default PreCareerEdu;
