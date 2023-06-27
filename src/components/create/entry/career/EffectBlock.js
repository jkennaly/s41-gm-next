import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import TargetSkillSelector from '@/components/dice/TargetSkillSelector';
import SkillSelector from '@/components/dice/SkillSelector';
import RollResult from '../../entry/RollResult';
import EventBlock from './EventBlock';
import { 
  parseEffect,
  parseInstruction,
  parseTargetNumber,
  parseNonInteractiveSkillGain,
  skillObjectToString,
  parseAssocGain,
  parseAssocLoss,
  hasSkillSelector,
  parseOption,
  parseCharacteristic,
} from '@/utils/parseEvent';
import {
  charBonus,
} from '@/utils/charFunctions';
import { rollPass } from '@/utils/rollFunctions';
import { rollEnterMessage } from '@/utils/room';
import GainAssocRow from './GainAssociateRow';
import ConvertAssocRow from './ConvertAssociateRow';
import allSkills from './skills';

const rollTypes = [
  'characteristic',
  'skill',
  'skillWithCharacteristic',
  'arbitrary'
]

const secondaryEffects = {
  gainRival: 'gainRival',
}




const basicSkillObject = {
  skill: '',
  characteristic: '',
  specialty: '',
  skillBonus: 0,
  characteristicBonus: 0,
  specialtyBonus: 0,
  otherBonus: 0,
  target: 0,
  selectorSet: false,
}

const EffectBlock = ({ 
  addEffect, 
  room, 
  gameId, 
  interactive, 
  setBasicEvent, 
  effect, 
  skills, 
  keyedRolls, 
  character, 
  completeEffect,
  effectCompleted,
  handlePrompt,
  suggestion,
  setDraft,
  setEffectResult,
}) => {
  console.log('EffectBlock effect', effect)
  const [key, setKey] = useState('');
  const [subEffectsCompleted, setSubEffectsCompleted] = useState([]);
  const [eventCompleted, setEventCompleted] = useState(false);
  const [newSkillSet, setNewSkillSet] = useState([]);
  const [effectsAdded, setEffectsAdded] = useState([]);
  const [specialRolled, setSpecialRolled] = useState(false);
  const [skillObject, setSkillObject] = useState(basicSkillObject);
  const { instruction, passEffects, failEffects } = parseEffect(effect);
  const target = parseTargetNumber(instruction);
  const rollCharacteristic = parseCharacteristic(instruction);
  const rollCharBonus = charBonus(character, rollCharacteristic);
  const showSubevent = instruction.includes("Event");
  const injuryEvent = showSubevent && instruction === 'injuryEvent';
  const unusualEvent = showSubevent && instruction === 'unusualEvent';
  const rollSpecial = instruction === 'gainAllies';
  const specialRoll = `Gain Ally Count`
  const gainAllies = instruction === 'gainAllies';
  const convertAssoc = instruction === 'convertAssoc';
  const specialRolls = (effect.split('::')[1] || '')
    .split(',')
    .map(effect => secondaryEffects[effect])
    .filter(Boolean);

  const specialConsequences = (effect.split('::')[2] || '')
    .split(',')
    .map(effect => secondaryEffects[effect])
    .filter(Boolean);
  
  const criticalRollEffect = effect.includes('::on')
  const rollConditionString = criticalRollEffect && criticalRollEffect.split ? (criticalRollEffect.split('::on')[1]).split('::')[0] : ''
  const rollConditionValue = rollConditionString && parseInt(rollConditionString, 10)
  const rollConditionEffects = rollConditionValue ? ((criticalRollEffect.split('::on')[1]).split('::')[1]).split(',') : []
  
  //console.log('EffectBlock rollConditionEffects', effect, rollConditionValue, rollConditionEffects)

  const [currentRolls, setCurrentRolls] = useState([]);

  //console.log('EffectBlock keyedRolls', effect, keyedRolls && JSON.parse(JSON.stringify(keyedRolls)), key)

  useEffect(() => {
    //console.log('EffectBlock useEffect, keyedRolls, key')
    if (key && keyedRolls && keyedRolls[key]) {
      setCurrentRolls([keyedRolls[key]]);
    }
  }, [JSON.stringify(keyedRolls), key]);

  useEffect(() => {
    //console.log('EffectBlock effectCompleted, eventCompleted')
    if(eventCompleted) {
      completeEffect(true);
    }
  }, [eventCompleted])

  useEffect(() => {
    //console.log('EffectBlock eventCompleted', eventCompleted)
    if(eventCompleted) {
      completeEffect(true);
    }
  }, [])

  //console.log('EffectBlock effect eventComplete', effect, eventCompleted)

  useEffect(() => {
    //console.log('EffectBlock useEffect, currentRolls, skillObject, specialRolls, specialConsequences')
    if(skillObject.selectorSet && currentRolls && currentRolls[0]?.sum) {
      const passed = rollPass(skillObject)(currentRolls[0])
      const addEffects = passed ? passEffects.split(',') : failEffects.split(',');
      //for each element in effectsAdded, take away a corresponding element from addEffects
      //if there are any elements left in addEffects, add them to effectsAdded
      //if there are no elements left in addEffects, completeEffect(true)
      for(let i = 0; i < effectsAdded.length; i++) {
        const index = addEffects.indexOf(effectsAdded[i]);
        if(index !== -1) {
          addEffects.splice(index, 1);
        }
      }
      
      if(addEffects.length > 0) {
        setEffectsAdded(effectsAdded.concat(addEffects))
      }
      
      else {
        completeEffect(true);
      }


      addEffects.forEach(effect => {
        addEffect(effect);
      })
      //console.log('passed', specialRolls, specialConsequences, passed)
    }

  }, [JSON.stringify(currentRolls), JSON.stringify(skillObject), JSON.stringify(specialRolls), JSON.stringify(specialConsequences)]);

  const buildSuggestion = lowerPrompt => {
    const effectPrompt = ``
    const prompt = `${effectPrompt} ${lowerPrompt}`;
    handlePrompt(prompt);
  }

  const handleRollEffect = (event) => {
    event.preventDefault();
    const msg ='ROLL_KEYED';
    const rollKey = uuid()
    const options = {
      key: rollKey,
    }
    setKey(rollKey);
    rollEnterMessage({ roomId: gameId, room, msg, options });
    

  }

  const handleSingleRollEvent = (event) => {
    event.preventDefault();
    const msg ='ROLL_KEYED_1D6';
    const rollKey = uuid()
    const options = {
      key: rollKey,
    }
    setKey(rollKey);
    rollEnterMessage({ roomId: gameId, room, msg, options });
  }

  const handleRollEvent = (event) => {
    event.preventDefault();
    //console.log('EffectBlock handleRollEvent')
    const msg ='ROLL_KEYED';
    const rollKey = uuid()
    const options = {
      key: rollKey,
    }
    setKey(rollKey);
    rollEnterMessage({ roomId: gameId, room, msg, options });
    

  }

  const handleRollSpecial = (event) => {
    event.preventDefault();
    const msg ='ROLL_KEYED_1D3';
    const rollKey = uuid()
    const options = {
      key: rollKey,
    }
    //console.log('EffectBlock handleRollSpecial', effect, rollKey)
    setKey(rollKey);
    rollEnterMessage({ roomId: gameId, room, msg, options });
    setSpecialRolled(true);

  }
  const basicSkillSet = parseNonInteractiveSkillGain(effect);
  //console.log('basicSkillSet', basicSkillSet);
  const basicSkillStrings = basicSkillSet.map(skillObjectToString);

  const handleSkillGain = (event) => {
    event.preventDefault();
    if(!newSkillSet.value) newSkillSet.value = 0; 
    //console.log('EffectBlock handleSkillGain', newSkillSet)
    setBasicEvent(newSkillSet)
    completeEffect(true)
  }



  //console.log('currentRolls', currentRolls);
  const parsedOption = parseOption(effect);
  const hasPassFail = Boolean(passEffects || failEffects || parsedOption?.passEffects || parsedOption?.failEffects);
  const showPassFail = Boolean(interactive && !showSubevent && hasPassFail);
  
  const assocSection = [
    'gainAlly',
    'gainContact',
    'gainEnemy',
    'gainRival',
  ]
  const assocGain = assocSection.includes(effect);
  const newSkill = instruction === 'skillGain';
  const newSkillValue = newSkill ? parseInt(effect.split('::')[2], 10) : null;
  const newSkillSelected = Boolean(newSkill && (effect.split('::')[1] === 'any'))
  const rollEffect = Boolean(showPassFail && (currentRolls.length === 0) && !parsedOption && !newSkill)
  const effectRolled = Boolean(showPassFail && (currentRolls.length === 1) && !parsedOption && !newSkill)
  
  const assignAllies = Boolean(gainAllies && specialRolled && currentRolls.length === 1)
  const subEffects = assignAllies && currentRolls[0] && Array(currentRolls[0].sum).fill()
  const allSubEffectsComplete = subEffects.length === subEffectsCompleted.filter(Boolean).length;

  
  //console.log('EffectBlock allSubEffectsComplete', allSubEffectsComplete);


const subEffectCompleted = index => (effectValue) => {
  console.log('subEffectCompleted', effectValue, index, subEffectsCompleted);
  subEffectsCompleted[index] = Boolean(effectValue);
  setSubEffectsCompleted([...subEffectsCompleted]);
}


  useEffect(() => {
    //console.log('EffectBlock useEffect, currentRolls, effectRolled, eventCompleted')

    const result = {}
    const roll = currentRolls[0];
    const pass = roll + rollCharBonus >= target;
    result.mainEffects = pass ? passEffects : failEffects;
    if(allSubEffectsComplete && effectRolled && (!showSubevent || (showSubevent && eventCompleted))) {
      //console.log('EffectBlock effectRolled true', result)
      setEffectResult(result);
      completeEffect(true);
    } else {
      //console.log('EffectBlock effectRolled A')
      setEffectResult(result);
      completeEffect(false);
    }
  }, [currentRolls, effectRolled, eventCompleted, allSubEffectsComplete]);
  const knownSkills = character?.skills[0]?.skills;
    
  const parsedInstruction = parseInstruction(instruction, effect.split('::')[1], effect.split('::')[2]);
  //console.log('EffectBlock parsedInstruction', currentRolls[0] && JSON.parse(JSON.stringify(currentRolls[0])), instruction, effect, parsedInstruction)

  return (
    <div 
      className={"border-2 flex items-center border-gray-500 rounded px-2 mx-1"}
    >
      
      <div>
        <span className="text-xl mr-4">{parsedOption ? parsedOption.prompt : parsedInstruction}</span>
      </div>
      {
        convertAssoc && <div className={`w-full`}>
          <ConvertAssocRow 
            effectCompleted={effectCompleted} 
            completeEffect={completeEffect} 
            character={character} 
            effect={parseAssocGain(passEffects)} 
            suggestion={suggestion} 
            handlePrompt={buildSuggestion} 
          />
        </div>
      }
      {
        assocGain && <div className={`w-full`}>
          <GainAssocRow 
            effectCompleted={effectCompleted} 
            completeEffect={completeEffect} 
            characterId={character.id} 
            effect={parseAssocGain(effect)} 
            suggestion={suggestion} 
            handlePrompt={buildSuggestion} 
          />
        </div>
      }
      {
        assignAllies && currentRolls[0] && Array(currentRolls[0].sum).fill().map((_, i) => (
          <div key={i} className={`w-full`} >
            <GainAssocRow 
              effectCompleted={subEffectsCompleted[i]} 
              completeEffect={subEffectCompleted(i)} 
              characterId={character.id} 
              effect={'Gain an ally'} 
              suggestion={suggestion} 
              handlePrompt={buildSuggestion} 
            />
          </div>
        ))
      }
      {!interactive && basicSkillStrings && basicSkillStrings.map((str, i) => <div key={i}>
        <span className="text-xl mr-4">{str}</span>
      </div>)}
      {!convertAssoc && showPassFail && !newSkill && <div className='flex flex-col'>
        <span className="text-xl mr-4">{parsedOption ? `Yes: ` : `Pass: `}{parsedOption ? parsedOption.passEffects : passEffects}</span>
        <span className="text-xl mr-4">{parsedOption ? `No: ` : `Fail: `}{parsedOption ? parsedOption.failEffects : failEffects}</span>
      </div>}
      {(hasSkillSelector(effect)) && <TargetSkillSelector setSkillObject={setSkillObject} setSelectedSkillset={setNewSkillSet} newSkill={newSkill} value={newSkillValue} skills={skills} target={target} />}
      {(newSkillSelected) && <SkillSelector knownSkills={knownSkills} setSkillObject={setSkillObject} setSelectedSkillset={setNewSkillSet} skills={allSkills} />}
      {
        <>
        {showSubevent && (currentRolls.length === 1) && (<>
          <div className="flex flex-col bg-gray-200">
          <RollResult roll={currentRolls[0]} />
          <EventBlock 
              hideNotes={true}
              room={room}
              character={character}
              eventType={effect} 
              number={currentRolls[0].sum} 
              setBasicEvent={setBasicEvent}
              eventCompleted={eventCompleted}
              setEventCompleted={setEventCompleted}
              handlePrompt={buildSuggestion} 
              setDraft={setDraft}
              suggestion={suggestion}
          />
          </div>
          </>)}
          {showSubevent && !injuryEvent && !unusualEvent && (currentRolls.length === 0) && <button
              onClick={handleRollEvent}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >Roll Event</button>}
          {injuryEvent && (currentRolls.length === 0) && <button
              onClick={handleSingleRollEvent}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >Roll Injury</button>}
          {unusualEvent && (currentRolls.length === 0) && <button
              onClick={handleSingleRollEvent}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >Roll Unusual Event</button>}
          {!convertAssoc && rollEffect && <button
              onClick={handleRollEffect}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >Roll Effect</button>}
          {effectRolled && <div
             
          >
            {
              //console.log('Effect block micro RollResult', target, rollCharBonus, currentRolls[0], effectRolled)
            }
            <RollResult 
              micro={true} 
              roll={currentRolls[0]} 
              target={target} 
              netModifier={rollCharBonus}
              skillObject={skillObject}
            />
          </div>}
          {rollSpecial && !specialRolled && <button
              onClick={handleRollSpecial}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >Roll {`${specialRoll}`}</button>}
          {newSkill && !effectCompleted && <button
              onClick={handleSkillGain}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >Add Skill</button>}
          {parsedOption && (
            <div className="flex">
              <button
                onClick={() => {

                }}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >Yes</button>
              <button
                onClick={() => {completeEffect(true)}}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >No</button>
            </div>
          )}
          
      

          </>}
              
    </div>
  );
};

export default EffectBlock;
