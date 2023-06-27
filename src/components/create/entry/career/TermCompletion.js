import React, { useEffect, useState } from 'react';
import { rollEnterMessage } from '@/utils/room';
import { useDispatch } from 'react-redux';
import RollResult from '../RollResult';
import { sendMessage } from '@/store/actions/rooms';
import { addModel } from '@/store/actions/models';
import { set } from 'react-hook-form';

const TermCompletion = ({ setModalContent, term, gameState, userId, room, gameId, character }) => {
    const dispatch = useDispatch();
    const [rollMade, setRollMade] = useState(false);
    const [rollAttempted, setRollAttempted] = useState(false);

    const currentRolls = (gameState?.players?.[userId]?.rollResults || [])
    const currentPdf = character?.personalDataFile || {};
    const currentAge = currentPdf?.age || 18;
    const lifePaths = character?.lifePaths || [];

    const modifiedTotal = currentRolls[0] ? currentRolls[0].sum + term.netModifier : 0;
    const success = modifiedTotal >= term.entryTarget;
    const failure = !success
    
    useEffect(() => {
        setRollMade(success)
    }, [success, rollAttempted, setRollMade])
    //when this is called, we send dispatch an action clearing the rollResults for the current user
    useEffect(() => {
        dispatch(sendMessage({
            room: room,
            msg: 'CLEAR_ROLL_RESULTS',
            roomId: gameId,
        }))
    }, [dispatch])

    useEffect(() => {
        if(!rollAttempted) return;
        if(rollMade) {
            //dispatch an action to create a lifePath and attached PreCareerTerm of the current term
            const modelData = {
                ownerId: character.id,
                finalAge: currentAge + 4,
                term: lifePaths.length + 1,
                preCareerTerm: {
                    ownerId: character.id,
                    name: term.name,
                    term: lifePaths.length + 1,
                    graduated: false,
                    honored: false,
                    accepted: true,
                    commissioned: false,
                    skillsAdded: false,
                    entryAttempted: true,
                    graduationAttempted: false,
                    completed:false,
                }
            }
    dispatch(addModel({modelData, modelName: 'lp', characterId: character.id}, 'lp'))
        } else {
            //dispatch an action to create a lifePath and attached PreCareerTerm of the current term
            const modelData = {
                ownerId: character.id,
                finalAge: currentAge + 4,
                term: lifePaths.length + 1,
                
                
                preCareerTerm: {
                    ownerId: character.id,
                    name: term.name,
                    term: lifePaths.length + 1,
                    accepted: false,
                    graduated: false,
                    honored: false,
                    commissioned: false,
                    skillsAdded: false,
                    entryAttempted: true,
                    graduationAttempted: false,
                    completed: true,
                }
            }
            dispatch(addModel({modelData, characterId: character.id, modelName: 'lp'}, 'lp'))
        }
    }, [dispatch, rollMade, rollAttempted])

    const handleRollEntry = (event) => {
        event.preventDefault();
        const {
            enterMessage
        } = term;
        console.log('handleRollEntry, enterMessage', enterMessage)
        rollEnterMessage(enterMessage);
        setRollAttempted(true);

    }

    const handleCancel = (event) => {
        event.preventDefault();
        setModalContent(term.cancelContent);
      };
    //console.log('TermCompletion currentRolls', JSON.parse(JSON.stringify(currentRolls)))
    

    
    return ( !character ||!character.id ? <div>Loading...</div> :
        <div className={`overflow-hidden rounded-xl border`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-24">
                <div className="text-sm font-medium leading-6 text-gray-900">Verify Term Selection</div>
            </div>
            <div className="p-6">
                <h2>Term Selection: {term.name}</h2>
                <h4>Entry Roll Required: {term.entryRequired ? 'Yes' : 'No'}</h4>
                { term.entryRequired && (
                    <div
                        className="text-sm font-medium leading-6 text-gray-900"
                    >
                        {term.entryDescription}
                    </div>
                )}
                {
                    term.entryRequired && (
                        <ul
                            className="text-sm font-medium leading-6 text-gray-900"
                        >
                            {term.modifiers
                                .map(([name, value]) => {
                                    return <li key={name}>{name}: {value}</li>
                                })
                            }
                        </ul>
                    )
                }
            </div>
            {(currentRolls.length === 1) && (<>
                <RollResult netModifier={term.netModifier} target={term.entryTarget} roll={currentRolls[0]} />
                {success && <>
                    <div className="p-6">You've been accepted into {term.name}!</div>
                    <div className="p-6">
                        {term.acceptContent}
                    </div>
                </>}
                {failure && <>
                    <div className="p-6">You've been rejected from {term.name}!</div>
                    <div className="p-6">
                        {term.failContent}
                    </div>
                </>}
            </>)}
            
            <div className="p-6">
            { term.entryRequired && (currentRolls.length !== 1) && (
                <button
                    onClick={handleRollEntry}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >Roll Entry</button>

            )}
            { !term.entryRequired && (
                <button
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >Enter</button>

            )}
            </div>
            <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleCancel}>Cancel</button>
    </div>
    );
};

export default TermCompletion;
