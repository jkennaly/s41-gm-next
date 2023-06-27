
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api';
import skills from '../skills';
import { useDispatch } from 'react-redux';
import { addModel } from '@/store/actions/models';

import { probabilizerBasic, calculateBonuses } from '@/utils/gameMethods';
import { commissionChance } from '../standard/Navy';


export const probabilities = character => {
    return [
        ['Entry', entryChance(character)],
        ['Graduation', graduationChance(character)],
        ['w/Honors', graduationHonorsChance(character)],
        ['Commission', commissionChance(character, 2)]
    ]
}



//entry
//END 7+, DM-2 if Term 2, DM-4 if Term 3, DM+1 if SOC 9+

export const entryChance = (character, entryModifier = 0) => {
    const { intelligence } = calculateBonuses(character.coreCharacteristics);
    const term = character.lifePaths.length + 1;
    if (term > 3) return 0;
    const termModifier = term === 2 ? -2 : term === 3 ? -4 : 0;
    const netModifier = termModifier + intelligence + entryModifier;
    const result = probabilizerBasic(netModifier, 8 );
    //console.log('entryChance', result, education, termModifier, socModifier, netModifier)
    return result
}


//graduation
//

export const graduationChance = (character, graduationModifier = 0) => {
    const { intelligence } = calculateBonuses(character.coreCharacteristics);
    const { socialStanding, endurance } = character.coreCharacteristics
    const socModifier = socialStanding >= 8 ? 1 : 0;
    const endModifier = endurance >= 8 ? 1 : 0;
    const netModifier = intelligence + socModifier + endModifier + graduationModifier;
    return probabilizerBasic(netModifier, 7 );
}

export const graduationHonorsChance = (character, graduationModifier = 0) => {
    const { intelligence } = calculateBonuses(character.coreCharacteristics);
    const { socialStanding, endurance } = character.coreCharacteristics
    const socModifier = socialStanding >= 8 ? 1 : 0;
    const endModifier = endurance >= 8 ? 1 : 0;
    const netModifier = intelligence + socModifier + endModifier + graduationModifier;
    return probabilizerBasic(netModifier, 11 );
}