export function determineCurrentLeader(gameState) {
    let currentLeader = null;
    let highestRoll = 0;
  
    for (let [playerId, player] of gameState.players.entries()) {
      if (player.roll > highestRoll) {
        highestRoll = player.roll;
        currentLeader = player;
      }
    }
  
    return currentLeader;
  }
  export const getPlayerIds = (gameState) => {
    return Object.values(gameState.players).filter(Boolean).map(player => player.id);
  };
  export const getCharacterIds = (gameState) => {
    return Object.values([...gameState.npcs, ...gameState.pcs]).filter(Boolean).map(char => char.id);
  };

    
  export function probabilizerBasic(netModifier, target) {
    let favorableOutcomes = 0;
    let totalOutcomes = 0;
  
    // Loop for each possible outcome of the first dice (1-6)
    for(let i = 1; i <= 6; i++) {
      // Loop for each possible outcome of the second dice (1-6)
      for(let j = 1; j <= 6; j++) {
        totalOutcomes++;
        // If the sum of dice rolls and the netModifier is greater than or equal to the target
        // then we consider it as a favorable outcome
        if(i + j + netModifier >= target) {
          favorableOutcomes++;
        }
      }
    }
  
    // The probability is the ratio of favorable outcomes to the total possible outcomes
    return Math.round((favorableOutcomes / totalOutcomes) * 100) / 100;

  }

  export function probabilizerBoon(netModifier, target) {
    let favorableOutcomes = 0;
    let totalOutcomes = 0;
  
    // Loop for each possible outcome of the first dice (1-6)
    for(let i = 1; i <= 6; i++) {
      // Loop for each possible outcome of the second dice (1-6)
      for(let j = 1; j <= 6; j++) {
        // Loop for each possible outcome of the third dice (1-6)
        for(let k = 1; k <= 6; k++) {
          totalOutcomes++;
  
          // Calculate the sum of the two highest rolls
          let diceValues = [i, j, k];
          diceValues.sort((a, b) => b - a); // Sort in descending order
          let sumHighest = diceValues[0] + diceValues[1]; // Sum the two highest values
  
          // If the sum of the two highest rolls plus the netModifier is greater than or equal to the target
          // then we consider it as a favorable outcome
          if(sumHighest + netModifier >= target) {
            favorableOutcomes++;
          }
        }
      }
    }
  
    // The probability is the ratio of favorable outcomes to the total possible outcomes
    return Math.round((favorableOutcomes / totalOutcomes) * 100) / 100;

  }
  
  export function probabilizerBane(netModifier, target) {
    let favorableOutcomes = 0;
    let totalOutcomes = 0;
  
    // Loop for each possible outcome of the first dice (1-6)
    for(let i = 1; i <= 6; i++) {
      // Loop for each possible outcome of the second dice (1-6)
      for(let j = 1; j <= 6; j++) {
        // Loop for each possible outcome of the third dice (1-6)
        for(let k = 1; k <= 6; k++) {
          totalOutcomes++;
  
          // Calculate the sum of the two lowest rolls
          let diceValues = [i, j, k];
          diceValues.sort((a, b) => a - b); // Sort in ascending order
          let sumLowest = diceValues[0] + diceValues[1]; // Sum the two lowest values
  
          // If the sum of the two lowest rolls plus the netModifier is greater than or equal to the target
          // then we consider it as a favorable outcome
          if(sumLowest + netModifier >= target) {
            favorableOutcomes++;
          }
        }
      }
    }
  
    // The probability is the ratio of favorable outcomes to the total possible outcomes
    return Math.round((favorableOutcomes / totalOutcomes) * 100) / 100;

  }
  
  export function calculateBonuses(coreCharacteristics) {
    const bonusObject = {};
  
    for(const characteristic in coreCharacteristics) {
      const value = coreCharacteristics[characteristic];
      
      // Skip characteristics with a zero value
      if(value === 0) continue;
  
      // Skip non-characteristic properties
      if(["id", "ownerId", "createdAt", "updatedAt"].includes(characteristic)) continue;
      
      // Calculate bonus
      const bonus = value < 1 ? -3 :
                    value < 3 ? -2 :
                    value < 6 ? -1 :
                    value < 9 ? 0 :
                    value < 12 ? 1 :
                    value < 15 ? 2 :
                    3;
  
      bonusObject[characteristic] = bonus;
    }
  
    return bonusObject;
  }
  
export function mergeSkillArrays(array1, array2) {
  return array1.map(x => ({...x})).concat(array2).reduce((acc, skill) => {
      // Find if this skill already exists in the accumulator
      const existingSkill = acc.find(({ name }) => name === skill.name);

      if (existingSkill) {
          // If the skill exists, compare and update the value (point 2 and 3)
          if (skill.add) {
              existingSkill.value = (existingSkill.value || 0) + skill.value;
              delete skill.add;
          } else {
            //console.log("existingSkill.value", existingSkill);
            //console.log("skill.value", skill);
            const hasValue = !Boolean(existingSkill.specialties);
            //console.log("hasValue", hasValue);
            if(hasValue) existingSkill.value = Math.max(existingSkill.value || 0, skill.value)
          }

          // Merge specialties if they exist (point 1)
          if (skill.specialties) {
              skill.specialties.forEach(specialty => {
                  const existingSpecialty =  existingSkill.specialties.find(({ name }) => name === specialty.name)

                  if (existingSpecialty) {
                    //remove the specialty from the array
                    existingSkill.specialties = existingSkill.specialties.filter(({ name }) => name !== specialty.name);
                    const revisedSpecialty = {...existingSpecialty, value: Math.max(existingSpecialty.value, specialty.value)};
                    existingSkill.specialties.push(revisedSpecialty);
                  } else {
                      // If it doesn't exist, add it to the specialties array
                      existingSkill.specialties.push(specialty);
                  }
              });
          }

      } else {
          // If the skill doesn't exist in the accumulator, add it
          acc.push(skill);
      }

      return acc;
  }, []);
}

export function secondsUntilExpiry(signedS3Url) {
  const url = new URL(signedS3Url);
  const amzDate = url.searchParams.get('X-Amz-Date');
  const expiresInSeconds = parseInt(url.searchParams.get('X-Amz-Expires'));

  const amzDateTime = Date.UTC(
      parseInt(amzDate.slice(0, 4)),  // Year
      parseInt(amzDate.slice(4, 6)) - 1,  // Month
      parseInt(amzDate.slice(6, 8)),  // Day
      parseInt(amzDate.slice(9, 11)),  // Hour
      parseInt(amzDate.slice(11, 13)),  // Minute
      parseInt(amzDate.slice(13, 15))  // Second
  );

  const expiryTime = new Date(amzDateTime + expiresInSeconds * 1000);
  const currentTime = new Date();

  // Calculate the difference between the expiry time and current time
  const diffInSeconds = Math.floor((expiryTime - currentTime) / 1000);

  // If the URL has expired, return 0
  return diffInSeconds > 0 ? diffInSeconds : 0;
}