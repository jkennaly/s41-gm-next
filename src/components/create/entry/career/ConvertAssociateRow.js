import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import GainAssocRow from './GainAssociateRow';
import { createAssoc } from '@/store/actions/models';
import NameInput from '../NameInput';
import AssociateSelector from '@/components/dice/AssociateSelector';
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

const effectToTypes = effect => {
  const types = []
  if(!effect) return types
  if(effect.toLowerCase().includes('ally')) types.push('ally');
  if(effect.toLowerCase().includes('enemy')) types.push('enemy');
  if(effect.toLowerCase().includes('contact')) types.push('contact');
  if(effect.toLowerCase().includes('rival')) types.push('rival');
  return types
}


const ConvertAssocRow = ({ effectCompleted, completeEffect, effect, handlePrompt, suggestion, character }) => {
  const [selectedAssociate, setSelectedAssociate] = useState(null);
  const [showTextArea, setShowTextArea] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [assocName, setAssocName] = useState("");
  const dispatch = useDispatch();
  //console.log('ConvertAssocRow suggestion', suggestion)

  useEffect(() => {
    if(suggestion) {
      setTextAreaValue(suggestion)
    }
  }, [suggestion])

  useEffect(() => {
    if(effectCompleted) {
    }
  }, [effectCompleted])

  
  const buildSuggestion = lowerPrompt => {
    const effectPrompt = ``
    const prompt = `${effectPrompt} ${lowerPrompt}`;
    handlePrompt(prompt);
  }
  
  const { associates } = character;
  const types = effectToTypes(effect)
  const selectableAssociates = associates.filter(assoc => types.includes(assoc.association))

  const newAssoc = Boolean(!selectableAssociates.length)

  console.log('ConvertAssocRow selectableAssociates', effect, types, selectableAssociates, character)
  
  return (
    <div className="border-2 justify-around flex border-gray-500 rounded px-2 mx-1 w-full items-center">
      
      <div className="ml-4">
        {effect}
      </div>
      
        // if the character has at least one ally or contact, show a selector showing them all
        {!newAssoc && <AssociateSelector
          character={character}
          selectableAssociates={selectableAssociates}
          setSelectedAssociate={setSelectedAssociate}
          selectedAssociate={selectedAssociate}

        />}
        //if the character has no allies or contacts, show gainAssocRow for an enemy or rival
        {newAssoc && <GainAssocRow 
          effectCompleted={effectCompleted} 
          completeEffect={completeEffect} 
          characterId={character.id} 
          effect={parseAssocGain(effect)} 
          suggestion={suggestion} 
          handlePrompt={buildSuggestion} 
        />}
          
      
      
    </div>
  );
};

export default ConvertAssocRow;

