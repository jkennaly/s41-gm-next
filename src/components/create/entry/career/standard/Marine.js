
import { probabilizerBasic, calculateBonuses } from '@/utils/gameMethods';


export const commissionChance = (character, commissionModifier = 0) => {
    const { socialStanding } = calculateBonuses(character.coreCharacteristics);
    const netModifier = socialStanding + commissionModifier;
    return probabilizerBasic(netModifier, 8 );
}