import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addModel } from '../../../store/actions/models';
import { useDispatch, useSelector } from 'react-redux';
import { rollMgt2eChargen } from '../../../utils/room';
import { selectImgSrcForCharacter, selectCharacter } from '@/store/selectors/characters';
import RollResult from './RollResult';
import CharacteristicValue from './CharacteristicValue';

const attr = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    endurance: 'Endurance',
    intelligence: 'Intelligence',
    education: 'Education',
    socialStanding: 'Social Standing',
}
const baseAttr = {
    strength: '',
    dexterity: '',
    endurance: '',
    intelligence: '',
    education: '',
    socialStanding: '',
}

const CoreCharacteristicsForm = ({ userData, setActiveSection, gameState, gameId, room, characterId }) => {
    const [characteristics, setCharacteristics] = useState(baseAttr);
    const character = useSelector((state) => selectCharacter(state, characterId));
    const [rollResults, setRollResults] = useState([]);
  
    const currentCc = character?.coreCharacteristics || {};
    const currentPdf = character?.personalDataFile || {};
    const currentSkills = character?.skills || [];
    const { register, handleSubmit, setValue, getValues, control, watch, reset } = useForm();
    //set the default values for the form from the currentCc
    const [portraitSrc, portraitId] = useSelector((state) => selectImgSrcForCharacter(state, character?.id));
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data);
        dispatch(addModel({
            modelData: data, 
            modelName: 'cc', 
            characterId: character.id
        }, 
            'cc'
        ))
    
        setActiveSection(null)
    };

    const handleResetAll = () => {
        // Reset all fields
        reset();
    
        // Unhide all RollResult components
        setRollResults(rollResults.map(result => ({...result, hidden: false})));
        setCharacteristics(baseAttr);
      };


    const handleRoll = () => {
        const msg = {
            roomId: gameId,
            game: `mgt2e`,
            type: `chargen`,
            room,
            msg: "ROLL_MGT2E_CHARGEN"
          };
            rollMgt2eChargen(msg);
            handleResetAll();
    };

    const handleDrop = (fieldName) => (event) => {
        const rollResultId = event.dataTransfer.getData('rollResultId');
        
        // Find the RollResult based on its id
        const rollResult = rollResults.find(result => result.id === rollResultId);
      
        if (rollResult) {
          setValue(fieldName, rollResult.sum);
      
          // Hide the roll result
          setRollResults(rollResults.map(result => 
            result.id === rollResultId ? { ...result, hidden: true, assignedTo: fieldName } : result
          ));
          setCharacteristics(prev => ({ ...prev, [fieldName]: rollResult.id }));
        }
      };
      
      const handleReset = (fieldName) => {
        // Find the RollResult that was assigned to this field
        const rollResult = rollResults.find(result => result.assignedTo === fieldName);
      
        if (rollResult) {
          // Unhide the corresponding RollResult
          setRollResults(rollResults.map(result => 
            result.id === rollResult.id ? { ...result, hidden: false, assignedTo: null } : result
          ));

        setCharacteristics(prev => ({ ...prev, [fieldName]: '' }));
        }
      
        // Reset the field value
        setValue(fieldName, null);
      };  
    
    const handleCancel = (event) => {
        event.preventDefault();
        setActiveSection(null)
    };
    
      const handleRandomizeRemaining = () => {
        // Get unassigned rollResults and characteristics
        const unassignedRollResults = rollResults.filter((rollResult) => !rollResult.hidden);
        const unassignedCharacteristics = Object.entries(characteristics).filter(([key, value]) => !value);
        // console.log('unassignedCharacteristics', unassignedCharacteristics);
        // console.log('unassignedRollResults', unassignedRollResults);
        // console.log('characteristics', characteristics);
        // console.log('rollResults', JSON.parse(JSON.stringify(rollResults)));
        // If either array is empty, exit the function
        if (unassignedRollResults.length === 0 || unassignedCharacteristics.length === 0) return;
    
        // Iterate over the shorter array
        const length = Math.min(unassignedRollResults.length, unassignedCharacteristics.length);
        let updatedCharacteristic = {...characteristics};
        let updatedRollResults = [...rollResults];
        for (let i = 0; i < length; i++) {
            // Randomly pick an unassigned rollResult and characteristic
            const rollResultIndex = Math.floor(Math.random() * unassignedRollResults.length);
            const characteristicIndex = Math.floor(Math.random() * unassignedCharacteristics.length);
            // console.log('rollResultIndex', rollResultIndex);
            // console.log('characteristicIndex', characteristicIndex);

            // Assign the rollResult to the characteristic
            const rollResult = unassignedRollResults[rollResultIndex];
            const characteristicKey = unassignedCharacteristics[characteristicIndex][0];

            // console.log('rollResult', JSON.parse(JSON.stringify(rollResult)));
            // console.log('characteristicKey', characteristicKey);

            updatedCharacteristic = {
                ...updatedCharacteristic,
                [characteristicKey]: rollResult.id
            };
            updatedRollResults = updatedRollResults.map(item =>
                item.id === rollResult.id
                ? {...item, hidden: true}
                : item
            );
            // Remove the assigned items from the unassigned arrays
            unassignedRollResults.splice(rollResultIndex, 1);
            unassignedCharacteristics.splice(characteristicIndex, 1);
            setValue(characteristicKey, rollResult.sum);
        }
        // Update the state
        setCharacteristics(updatedCharacteristic);
        setRollResults(updatedRollResults);
    }
    
    useEffect(() => {
      setValue('strength', currentCc.strength);
      setValue('dexterity', currentCc.dexterity);
      setValue('endurance', currentCc.endurance);
      setValue('intelligence', currentCc.intelligence);
      setValue('education', currentCc.education);
      setValue('socialStanding', currentCc.socialStanding);
    }, [
      currentCc.strength,
      currentCc.dexterity,
      currentCc.endurance,
      currentCc.intelligence,
      currentCc.education,
      currentCc.socialStanding,
    ])
    const currentRolls = (gameState?.players?.[userData.id]?.rollResults || [])
    useEffect(() => {
        setRollResults(currentRolls)
    }, [currentRolls])

    // console.log('CoreCharacteristicsForm currentRolls', JSON.stringify(currentRolls))
    // console.log('CoreCharacteristicsForm gameState', JSON.parse(JSON.stringify(gameState)))

    return (
        <>  
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Core Characteristics{`${currentPdf?.name ? `: ${currentPdf?.name}` : ''}`}</h3>
          { portraitSrc && <img src={portraitSrc} alt="portrait" className="h-60 w-60 rounded-full mx-auto" />}
        </div>
        <button onClick={handleRoll} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Roll Dice</button>
        <button onClick={handleResetAll} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Reset All
      </button>
      <button 
        onClick={handleRandomizeRemaining} 
        type="button" 
        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Randomize Remaining
      </button>
        <div className="flex-container flex">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        {Object.entries(attr).map(([key, value]) => (
            <CharacteristicValue 
                key={key}
                fieldName={key}
                label={value} 
                register={register} 
                watch={watch} 
                handleDrop={handleDrop} 
                handleReset={handleReset}
                characteristics={characteristics}
                setCharacteristics={setCharacteristics}
            />
        ))}
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
          <button onClick={handleCancel} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
        </div>
      </div>
    </form>
    <div className="w-1/2">
        {rollResults.map(result => !result.hidden && <RollResult key={result.id} roll={result} />)}
      </div>
    </div>
        </>
    );
};

export default CoreCharacteristicsForm;
