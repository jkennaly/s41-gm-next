import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAssoc } from '@/store/actions/models';
import NameInput from '../NameInput';
import TargetSkillSelector from '@/components/dice/TargetSkillSelector';
import RollResult from '../RollResult';
import EventBlock from './EventSubBlock';
import { 
  parseAssocGain,
  parseAssocLoss,
} from '@/utils/parseEvent';

const assocType = effect => {
  if(effect.toLowerCase().includes('ally')) return 'ally';
  if(effect.toLowerCase().includes('enemy')) return 'enemy';
  if(effect.toLowerCase().includes('contact')) return 'contact';
  if(effect.toLowerCase().includes('rival')) return 'rival';
  if(effect.toLowerCase().includes('romantic')) return 'romantic';
  if(effect.toLowerCase().includes('mentor')) return 'mentor';
  if(effect.toLowerCase().includes('patron')) return 'patron';
  
}

const GainAssocRow = ({ effectCompleted, completeEffect, effect, handlePrompt, suggestion, characterId }) => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [assocName, setAssocName] = useState("");
  const dispatch = useDispatch();
  //console.log('GainAssocRow suggestion', suggestion)

  useEffect(() => {
    if(suggestion) {
      setTextAreaValue(suggestion)
    }
  }, [suggestion])



  const handleSuggestion = (e) => {
    e.preventDefault()
    const prompt = `They gain a new ${assocType(effect)}. The new ${assocType(effect)}'s name is ${assocName}.
    Invent an interesting story of how they met and what their relationship is like.`
    console.log('GainAssocRow handleSuggestion prompt', prompt)
    handlePrompt(prompt)
  }

  const handleSaveAssociate = (e) => {
    e.preventDefault()
    //console.log('GainAssocRow handleSaveAssociate background', assocName, textAreaValue)

    const params = { 
      name: assocName, 
      origin: textAreaValue, 
      association: assocType(effect),
    }
    console.log('GainAssocRow handleSaveAssociate params', params)
    
    dispatch(createAssoc({modelData: params, characterId, modelName: 'assoc'}))
    setShowTextArea(false)
    completeEffect(true)
  }

  return (
    <div className="border-2 justify-around flex border-gray-500 rounded px-2 mx-1 w-full items-center">
      
      <div className="ml-4">
        {effect}
      </div>
      {effectCompleted ? assocName : <>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={(e) => {
          e.preventDefault()
          setShowTextArea(!showTextArea)
        
        }}
      >
        {showTextArea ? 'Hide' : 'Show'}
      </button>
      {showTextArea && (
        <div className="flex-grow">
        <NameInput name={assocName} register={() => {}} setValue={(fieldName, suggestedName) => {
          setAssocName(suggestedName)
        }} />
          <textarea 
            className="bg-gray-100 border rounded h-20 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={textAreaValue}
            onChange={(e) => {
              e.preventDefault()
              setTextAreaValue(e.target.value)
          }}
          />
          <div className="flex justify-end mt-2">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSuggestion}
            >Suggestion</button>
            <button 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              disabled={!assocName || !textAreaValue}
              onClick={handleSaveAssociate}
            >Save Associate</button>
          </div>
        </div>
      )}
      </>}
    </div>
  );
};

export default GainAssocRow;

