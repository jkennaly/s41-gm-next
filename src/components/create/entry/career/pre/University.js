
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api';
import { useDispatch } from 'react-redux';
import { addModel, changeCharacteristic, updateCurrentTerm } from '@/store/actions/models';
import UniversitySkills from './content/UniversitySkills';
import { probabilizerBasic, calculateBonuses, mergeSkillArrays } from '@/utils/gameMethods';
import events from '../../../tables/preEvents';

export const probabilities = character => {
    return [
        ['Entry', entryChance(character)],
        ['Graduation', graduationChance(character)],
        ['w/Honors', graduationHonorsChance(character)]
    ]
}

//entry
//EDU 6+, DM-1 if Term 2, DM-2 if Term 3, DM+1 if SOC 9+

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








//graduation
//INT 6+, 10+ Honors

export const graduationChance = (character, graduationModifier = 0) => {
    const { intelligence } = calculateBonuses(character.coreCharacteristics);
    const netModifier = intelligence + graduationModifier;
    return probabilizerBasic(netModifier, 6 );
}

export const graduationHonorsChance = (character, graduationModifier = 0) => {
    const { intelligence } = calculateBonuses(character.coreCharacteristics);
    const netModifier = intelligence + graduationModifier;
    return probabilizerBasic(netModifier, 10 );
}

//graduation benefits
//Gain +1 EDU
//Skills chosen previously gain +1 each
//Career Bonus for (+1 for graduation, +2 for honors)
const universityCareers = [
    'Agent',
    'Army',
    'Citizen',
    'Entertainer',
    'Marine',
    'Navy',
    'Scholar',
    'Scout',
]

//career bonus also applies to military career commission roll before first term




const UniversityContent = ({ termNumber, gameId, character, handleModalClose, setModalContent}) => {
    const [checkedSkills, setCheckedSkills] = useState({});
    const [universityContent, setUniversityContent] = useState('skills');
    const currentCc = character?.coreCharacteristics || {};
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    const dispatch = useDispatch();



    const handleCancel = (event) => {
        event.preventDefault();
        handleModalClose();
      };
      
    const handlePreCareerEvent = (event) => {
        event.preventDefault();
        
    };
    
    const handleSkillAccept = (event) => {
      event.preventDefault();
      setUniversityContent('event');
        const formData = getValues();
    
        //console.log('onSubmit formData', formData);
    
        //condense the form data to a SkillSet
        const skillSet0 = Object.keys(formData)
            .filter((key) => formData[key].set0)
            .map((key) => {
                return {
                    name: key,
                    value: !formData[key].specialty ? 0 : undefined,
                    specialties: formData[key].specialty ? [{name: formData[key].specialty, value: 0}] : undefined
                }
            });
        const skillSet1 = Object.keys(formData)
            .filter((key) => formData[key].set1)
            .map((key) => {
                return {
                    name: key,
                    value: !formData[key].specialty ? 1 : undefined,
                    specialties: formData[key].specialty ? [{name: formData[key].specialty, value: 1}] : undefined
                }
            });
        const skillSet = [...skillSet0, ...skillSet1]
        //get existing skills
        const existingSkills = character?.skills[0]?.skills
        
        // console.log('onSubmit existingSkills', existingSkills);
        // console.log('onSubmit skillSet', skillSet);
        const newSkills = mergeSkillArrays(existingSkills, skillSet)
        //console.log('onSubmit newSkills', newSkills);

        //skills
        //choose level 0 and level 1 from list
        //characteristics
        //Gain +1 EDU
        dispatch(addModel({
            modelData: newSkills, 
            modelName: 'ss', 
            characterId: character.id
        }, 
            'ss'
        ))
        dispatch(changeCharacteristic({
            char: 'education',
            amount: 1,
            characterId: character.id
        }))
        dispatch(updateCurrentTerm({
            term: termNumber,
            field: 'preCareerTerms',
            characterId: character.id,
            changes: {
                skillsSelected: skillSet,
                skillsAdded: true,
                accepted: true,
                entryAttempted: true,
            }
        }))

      

    };

    const eachChecked = () => {
        let set0Count = 0;
        let set1Count = 0;
    
        Object.values(checkedSkills).forEach(skill => {
            if (skill.set0) set0Count++;
            if (skill.set1) set1Count++;
        });
    
        return set0Count === 1 && set1Count === 1;
    };

  //console.log('maxSkills/checkedCount', maxSkills, checkedCount);

  const content = universityContent === 'event'
    ? 
    <button
        type="button"
        className="ml-3 inline-flex flex-col justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handlePreCareerEvent}
    >
        Save Skills
    </button>
    : <>
    <UniversitySkills 
        setCheckedSkills={setCheckedSkills} 
        register={register} 
    />
    <div className="mt-4">
    <button
        type="button"
        disabled={!eachChecked()}
        className={!eachChecked() ? 
            "ml-3 inline-flex flex-col justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 cursor-not-allowed" 
            : 
            "ml-3 inline-flex flex-col justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }
        onClick={handleSkillAccept}
    >
        Save Skills
    </button>
    </div>
    </>

  return (
    <>
        {content}
        <div className="mt-4">
        <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={handleCancel}
        >
            Cancel
        </button>
        </div>

    </>
  );
};

export default UniversityContent;

