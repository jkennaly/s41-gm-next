const phrasingObject = {
    "rollAnySkill": "Roll any skill",
    "SOC": "Roll SOC",
    "gainSkill": "Gain a skill",
    "gainSkill+1": "Increase a skill by 1",
    "gainRival": "Gain a rival",
    "gainEnemy": "Gain an enemy",
    "becomeLeader": "Become a leader",
    "nothing": "",
    "gainAlly": "Gain an ally",
    "loseContact": "Lose a contact",
    "loseAlly": "Lose an ally",
    "gainContact": "Gain a contact",
    "nextCareerEntry": "Next career entry",
    "warDraft": "War draft",
    "drifter": "Drifter",
    "charGain": "Gain a characteristic",
    "option": "Option",
    "skillGain": "Gain a skill",
    "any": "any",
    "testPSI": "Roll for Psionic Strength"
}


//convert the string "rollAnySkill9+::gainSkill+1,gainRival" into: instruction, pass Effect, fail Effect
export function parseEffect(effectString) {
    if(!effectString.startsWith('option')){
    const [instruction, passEffects = '', failEffects = ''] = effectString.split('::');
    const combinedPassEffects = passEffects
    .split(',')
    .map(effect => phrasingObject[effect])
    .join(', ');
    const combinedFailEffects = failEffects
    .split(',')
    .map(effect => phrasingObject[effect])
    .join(', ');


    return { 
        instruction, 
        passEffects: combinedPassEffects,
        failEffects: combinedFailEffects
    };
    }
    const [option, instruction, passEffects = '', failEffects = ''] = effectString.split('::');
    const combinedPassEffects = passEffects
    .split(',')
    .map(effect => phrasingObject[effect])
    .join(', ');
    const combinedFailEffects = failEffects
    .split(',')
    .map(effect => phrasingObject[effect])
    .join(', ');


    return { 
        option,
        instruction, 
        passEffects: combinedPassEffects,
        failEffects: combinedFailEffects
    };


  }
  
  //convert the string "rollAnySkill9+" into "Roll any skill 9+"
  export function parseInstruction(instructionString = "rollAnySkill9", firstParam, secondParam) {
    if(instructionString.startsWith("rollAnySkill")) {
      const [_, targetNumber] = instructionString.split("rollAnySkill");
      return `Roll any skill ${targetNumber}+`;
    } else if(instructionString.startsWith("SOC")) {
      const [_, targetNumber] = instructionString.split("SOC");
      return `Roll SOC ${targetNumber}+`;
    } else if(instructionString.startsWith("skillGain") && secondParam) {
        return `Select a skill to gain at level ${secondParam}`;
    } else if(instructionString.startsWith("charGain") && firstParam && secondParam) {
        return `Gain ${secondParam} in ${firstParam}`;
    } else if(instructionString.startsWith("skillGain") && firstParam) {
        return `Gain skill`;
    }
  }
  
  // get the target number from the instruction string
  export function parseTargetNumber(instructionString = "rollAnySkill9") {
    if(instructionString.startsWith("rollAnySkill")) {
      const [_, targetNumber] = instructionString.split("rollAnySkill");
      return parseInt(targetNumber, 10);
    } else if(instructionString.startsWith("SOC")) {
        const [_, targetNumber] = instructionString.split("SOC");
        return parseInt(targetNumber, 10);
      }
  }
  
  // get the target number from the instruction string
  export function parseCharacteristic(instructionString = "rollAnySkill9") {
    if(instructionString.startsWith("SOC")) {
        const [_, targetNumber] = instructionString.split("SOC");
        return 'socialStanding';
      }
  }

  export function parseNonInteractiveSkillGain(effectString) {
    const [effectType, effect] = effectString.split('::');
    if(effectType !== 'skillGain') return [];
    //effect is a skill name, followed by +, - or =, depending on whether it's a gain, loss or set
    const [skillName, action, strValue] = effect.split(/(\+|-|=)/);
    const skillSet = [{ 
        name: skillName, 
        value: parseInt(strValue, 10), 
        add: action === '+'
    }]
    return skillSet
  }

  export function hasSkillSelector(effectString) {
    const [effectType, passResults, failResults] = effectString.split('::');
    if(effectType.startsWith('rollAnySkill')) return true;
    return false
  }

  export function skillObjectToString(skillObject) {
    if(!skillObject) return '';
    const { name, value, add } = skillObject;
    return `${name} ${add ? '+' : ''}${value}`;
  }

  export function parseAssocGain(effectString) {
    console.log('parseAssocGain effectString', effectString)
    const effects = effectString.join(',');
    const assocSet = effects.map(e => phrasingObject[e])
    return assocSet
  }

  //convert the string "option::Do you want to test for Psionics?::testPSI::nothing" into: prompt, pass Effect, fail Effect
    export function parseOption(optionString) {
        const [instruction, prompt, passEffects, failEffects] = optionString.split('::');
        if(!instruction.startsWith('option')) return;
        return { 
            instruction, 
            prompt,
            passEffects: phrasingObject[passEffects], 
            failEffects: phrasingObject[failEffects] 
        };
    }