import React, { useEffect, useState } from 'react';
import { rollEnterMessage } from '@/utils/room';
import { useDispatch } from 'react-redux';
import RollResult from '../../RollResult';
import { sendMessage } from '@/store/actions/rooms';
import { updateCurrentTerm } from '@/store/actions/models';
import PsionicsTest from '../PsionicsTest';
import EventBlock from '../EventBlock';
import api from '@/api';


const PreCareerEvent = ({ 
        setModalContent, 
        handleModalClose,
        gameState, 
        userId, 
        room, 
        gameId, 
        character,
        termNumber,
        thisTermPath,
        educationType = 'University',
    }) => {
    const dispatch = useDispatch();
    const [eventCompleted, setEventCompleted] = useState(false);
    const [graduationFailed, setGraduationFailed] = useState(false);
    const [drafted, setDrafted] = useState(false);
    const [rollMade, setRollMade] = useState(false);
    const [rollAttempted, setRollAttempted] = useState(false);
    const [basicEvent, setBasicEvent] = useState(null);
    const [eventDisplay, setEventDisplay] = useState('roll');
    const [suggestion, setSuggestion] = useState('');
    const [effectResult, setEffectResult] = useState(null);

    const currentCc = character?.coreCharacteristics || {};
    const currentRolls = (gameState?.players?.[userId]?.rollResults || [])
    const keyedRolls = (gameState?.players?.[userId]?.keyedRolls || {})
    const currentPdf = character?.personalDataFile || {};
    const currentAge = currentPdf?.age || 18;
    const lifePaths = character?.lifePaths || [];

    //console.log('gamesState', gameState)

    const { psionics } = currentCc;

    
    const modifiedTotal = currentRolls[0] ? currentRolls[0].sum - termNumber : 0;
    const success = modifiedTotal >= 8;

    useEffect(() => {
        setRollMade(success)
    }, [success, setRollMade])

    //when this is called, we send dispatch an action clearing the rollResults for the current user
    useEffect(() => {
        dispatch(sendMessage({
            room: room,
            msg: 'CLEAR_ROLL_RESULTS',
            roomId: gameId,
        }))
    }, [])


    const completeEvent = (event) => {
        event.preventDefault();
        dispatch(updateCurrentTerm({
            term: termNumber,
            field: 'preCareerTerms',
            characterId: character.id,
            changes: {
                event: basicEvent,
            }
        }))
    }


    console.log('PreCareerEvent')
    const handleSuggestion = async (lowerPrompt) => {
        const charName = character?.personalDataFile?.name || 'your character'
        const preCareerPrompt = `During the ${educationType} education of ${charName}: `
        const prompt = `${preCareerPrompt} ${lowerPrompt}`
        //console.log('handleSuggestion prompt', prompt)
        
        const ctx = {
            characterId: character.id,
            termId: thisTermPath.id,
            gameId: gameId,
            prompt: prompt,
        }
        try {
            //console.log('getting a suggestion', ctx);
            const { data } = await api.post(`/suggestions/pce`, ctx);
            //console.log('suggestion', data);
            setSuggestion(data.suggestion);
        } catch (error) {
            console.log('error', error);
        } 
    }

    const handleRollEvent = (event) => {
        event.preventDefault();
        const msg ='ROLL_BASIC'
        rollEnterMessage({ roomId: gameId, room, msg });
        setRollAttempted(true);

    }

    const handleEventCompletion = (event) => {
        event.preventDefault();
        setModalContent('graduation')
    }

    const handleGradFailure = (event) => {
        event.preventDefault();
        handleModalClose()
    }

    const handleDraftDiversion = (event) => {
        event.preventDefault();
        setModalContent('graduation')
    }

    const handleCancel = (event) => {
        event.preventDefault();
        handleModalClose()
      };

    const setDraft = (draftEffect) => {
        //console.log('PreCareerEvent setDraft effectResult', effectResult, draftEffect)
        setDrafted(draftEffect);
      };

    //console.log('PreCareerEvent currentRolls', JSON.parse(JSON.stringify(currentRolls)))
    

    //console.log('PreCareerEvent eventCompleted', eventCompleted)

    
    return ( !character ||!character.id ? <div>Loading...</div> :
        eventDisplay === 'psionics' ? <PsionicsTest setEventDisplay={setEventDisplay} /> : (
        <div className={`overflow-hidden rounded-xl border`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-24">
                <div className="text-sm font-medium leading-6 text-gray-900">Roll PreCareerEvent</div>
            </div>
            {(currentRolls.length === 1) && (<>
                <RollResult roll={currentRolls[0]} />
                <EventBlock 
                    setEffectResult={setEffectResult}
                    setDraft={setDraft}
                    room={room}
                    gameId={gameId}
                    keyedRolls={keyedRolls}
                    character={character}
                    eventType={'preCareerEvent'} 
                    number={currentRolls[0].sum} 
                    setBasicEvent={setBasicEvent}
                    eventCompleted={eventCompleted}
                    setEventCompleted={setEventCompleted}
                    setTermFailed={setGraduationFailed}
                    handlePrompt={handleSuggestion} 
                    suggestion={suggestion}
                />
                
            </>)}
            
            { !eventCompleted && (currentRolls.length !== 1) && (
                <button
                    onClick={handleRollEvent}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >Roll PreCareerEvent</button>

            )}
            { !graduationFailed && !drafted && eventCompleted && (
                <button
                    onClick={handleEventCompletion}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >Attempt Graduation</button>

            )}
            { drafted && eventCompleted && (
                <button
                    onClick={handleDraftDiversion}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >You won the Lottery!</button>

            )}
            { !drafted && graduationFailed && eventCompleted && (
                <button
                    onClick={handleGradFailure}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >College is for nerds anyway</button>

            )}
            <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleCancel}>Cancel</button>
    </div>
    ) 
    );
};

export default PreCareerEvent;
