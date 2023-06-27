

  // Calculate bonus - this is the attribute bonus for Traveller 
  const bonus = fieldValue => fieldValue ? (
    fieldValue < 1 ? -3 :
    fieldValue < 3 ? -2 :
    fieldValue < 6 ? -1 :
    fieldValue < 9 ? 0 :
    fieldValue < 12 ? 1 :
    fieldValue < 15 ? 2 :
    3
  ) : null;

export function charBonus(character = {}, characteristic) {
    const cc = character?.coreCharacteristics;
    if(!cc) return
    const fieldValue = cc[characteristic];
    if(!fieldValue) return
    const bonusValue = bonus(fieldValue);
    return bonusValue;
}

export function termSkills(character = {}, term) {
    const { lifePaths } = character;
    if(!lifePaths) return []
    const path = typeof term === 'number' ? lifePaths[term - 1] : lifePaths[lifePaths.length - 1]
    if(!path) return []
    const { preCareerTerms, careerTerms } = path;
    if(!preCareerTerms && !careerTerms) return []
    const skills = [...(preCareerTerms?.skills || []), ...(careerTerms?.skills || [])]
    return skills
}