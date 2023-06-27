import React, { useEffect, useState } from 'react';
import preCareerEventList from '../../tables/preEvents';
import lifeEventList from '../../tables/lifeEvents';
import injuryEventList from '../../tables/injuries';
import unusualEventList from '../../tables/unusualEvents';
import EffectBlock from './EffectBlock';

const eventHeaders = {
    'preCareerEvent': 'Pre-Career Event',
    'lifeEvent': 'Life Event',
    'injuryEvent': 'Injury Event',
    'unusualEvent': 'Unusual Event',
}

const EventBlock = ({ 
    setDraft, 
    eventCompleted, 
    suggestion, 
    handlePrompt, 
    hideNotes, 
    room, 
    gameId, 
    eventType, 
    number, 
    setBasicEvent, 
    character, 
    keyedRolls, 
    setEventCompleted, 
    setTermFailed 
}) => {
    const [effectResult, setEffectResult] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [effectsComplete, setEffectsComplete] = useState([]);
    const [addedEffects, setAddedEffects] = useState([]);
    const [completedAddedEffects, setCompletedAddedEffects] = useState([]);
    const skills = character?.skills[0]?.skills;
    
    useEffect(() => {
        //console.log('EventBlock useEffect, eventType, number');
        if (eventType === 'preCareerEvent') {
            //console.log('preCareerEventList', preCareerEventList);
            const event = preCareerEventList.find((event) => event.roll === number);
            setSelectedEvent(event);
            setBasicEvent(event);
        }
        if (eventType === 'lifeEvent') {
            //console.log('lifeEventList', lifeEventList);
            const event = lifeEventList.find((event) => event.roll === number);
            setSelectedEvent(event);
            setBasicEvent(event);
        }
        if (eventType === 'injuryEvent') {
            //console.log('injuryEventList', injuryEventList);
            const event = injuryEventList.find((event) => event.roll === number);
            setSelectedEvent(event);
            setBasicEvent(event);
        }
        if (eventType === 'unusualEvent') {
            //console.log('unusualEventList', unusualEventList);
            const event = unusualEventList.find((event) => event.roll === number);
            setSelectedEvent(event);
            setBasicEvent(event);
        }
    }, [eventType, number]);

    useEffect(() => {
        //console.log('EventBlock useEffect, effectResult', effectResult);
        //if(eventCompleted) return;
        const allEffectsComplete = !selectedEvent?.interactive || selectedEvent?.effects?.reduce((allComplete, effect, i) => {
            return allComplete && Boolean(effectsComplete[i])
        }, true)
        const failureEffect = selectedEvent?.effects?.find(effect => effect.startsWith('fail')) || addedEffects?.find(effect => effect.startsWith('fail'))
        const draftEffect = effectResult.some(r => r && r.mainEffects && r.mainEffects.includes && r.mainEffects.includes('draft'))
        console.log('allEffectsComplete', allEffectsComplete, effectsComplete, effectResult, selectedEvent?.effects);
        setEventCompleted(allEffectsComplete);
        if(failureEffect) setTermFailed(true)
        setDraft(draftEffect)

    }, [JSON.stringify(effectsComplete)]);

 


    const completeEffect = index => (effectValue) => {
        console.log('completeEffect', effectValue, index, effectsComplete);
        effectsComplete[index] = Boolean(effectValue);
        setEffectsComplete([...effectsComplete]);
    }
    const resultEffect = index => (effectValue) => {
        effectResult[index] = effectValue
        setEffectResult([...effectResult]);
    }

    const buildSuggestion = lowerPrompt => {
        const eventPrompt = selectedEvent?.promptFill || '';
        const prompt = `${eventPrompt}. ${lowerPrompt}`;
        handlePrompt(prompt);
      }

    //console.log('EventBlock', number, eventHeaders[eventType], eventType);
  return (
    <div 
      className={`bg-yellow-400 flex flex-col justify-between items-center border-2 border-gray-300 hover:border-indigo-500 p-2 m-2 rounded`}

    >
        { selectedEvent && <>
      <span className="text-xl mr-4">{eventHeaders[eventType]}</span>
      <div className="flex">
        {selectedEvent.description}
      </div>
      <div className="s41-effect-block-container flex flex-col">
        {
        selectedEvent.effects
            .map((effect, index) => {
                return (
                    <EffectBlock 
                        setEffectResult={resultEffect(index)}
                        setDraft={setDraft}
                        room={room}
                        key={index} 
                        gameId={gameId}
                        eventIndex={index}
                        effect={effect} 
                        skills={skills}  
                        setBasicEvent={setBasicEvent}
                        character={character}
                        keyedRolls={keyedRolls}
                        completeEffect={completeEffect(index)}
                        interactive={selectedEvent.interactive}
                        addEffect={effect => setAddedEffects([...addedEffects, effect])}
                        handlePrompt={buildSuggestion}
                        suggestion={suggestion}
                        effectCompleted={!selectedEvent?.interactive || effectsComplete[index]}
                    />
                );
            })
        }
      </div>
      {!hideNotes && <div className="flex flex-col">
        <label className="text-sm">Notes
            <textarea className="border-2 border-gray-500 rounded h-20 px-2 mx-1" />
        </label>
      </div>}
      </>}
    </div>
  );
};

export default EventBlock;
