import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addModel } from '../../../store/actions/models';
import { useDispatch, useSelector } from 'react-redux';
import { rollMgt2eChargen } from '../../../utils/room';
import BackgroundSkills from './career/BackgroundSkills';
import MyModal from '../../modals/AddTraitModal';
import { selectImgSrcForCharacter, selectCharacter } from '@/store/selectors/characters';
import RollResult from './RollResult';
import CharacteristicValue from './CharacteristicValue';
import SkillsLayout from '@/components/layouts/SkillLayout';
import CCLayout from '@/components/layouts/CCLayout';



const CoreCharacteristicsForm = ({ userData, setActiveSection, gameState, gameId, room, characterId }) => {
    const character = useSelector((state) => selectCharacter(state, characterId));
  
    const currentCc = character?.coreCharacteristics || {};
    const currentPdf = character?.personalDataFile || {};
    const currentSkills = character?.skills[0]?.skills;
    const currentPaths = character?.lifePaths || [];
    const { register, handleSubmit, setValue, getValues, control, watch, reset } = useForm();
    //set the default values for the form from the currentCc
    const portraitSrc = useSelector((state) => selectImgSrcForCharacter(state, character?.id));
    const dispatch = useDispatch();
  
    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleCancel = (event) => {
        event.preventDefault();
        setActiveSection(null)
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };
    
    const handleBackground = () => {

        setModalOpen(true);
      
  }
    
  const handlePreCareer = () => {
    
}
    
const handleCareer = () => {
  
}
    
const handleEnd = () => {
  
}
    
const backgroundSubmit = () => {
  
}
const content = <BackgroundSkills 
setValue={setValue} 
character={character} gameId={gameId} 
handleSubmit={handleSubmit} 
register={register} 
fieldName={"skills"} 
getValues={getValues} 
handleModalClose={handleModalClose} 
/> 


    // console.log('CoreCharacteristicsForm currentRolls', JSON.stringify(currentRolls))
    // console.log('CoreCharacteristicsForm gameState', JSON.parse(JSON.stringify(gameState)))

    return (
        <>  
        <MyModal
                heading={`Choose Background Skills`}
                content={content}
                modalIsOpen={isModalOpen}
                setModalIsOpen={setModalOpen}
                handleSubmit={backgroundSubmit}
            ></MyModal>
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Core Characteristics{`${currentPdf?.name ? `: ${currentPdf?.name}` : ''}`}</h3>
          { portraitSrc && <img src={portraitSrc} alt="portrait" className="h-60 w-60 rounded-full mx-auto" />}
        </div>
        <button disabled={!currentSkills || currentSkills.length} onClick={handleBackground} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${!currentSkills || currentSkills.length} ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>Assign Background</button>
        <button disabled={!currentSkills || !currentSkills.length} onClick={handlePreCareer} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${!currentSkills || !currentSkills.length ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>
        Pre-Career Education
      </button>
      <button disabled={!currentSkills || !currentSkills.length} onClick={handleCareer} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${!currentSkills || !currentSkills.length ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>
        Career Term
      </button>
      <button disabled={!currentSkills || !currentSkills.length} onClick={handleEnd} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${!currentSkills || !currentSkills.length ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>
        End Character Creation
      </button>

      <div className="pt-5">
        <div className="flex justify-end">
          <button onClick={handleCancel} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${false ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>Cancel</button>
        </div>
      </div>
      <div>
        <div className="mt-6 flex">
            <CCLayout chars={currentCc} />
            <SkillsLayout skills={currentSkills} />
            </div>
      </div>
        </>
    );
};

export default CoreCharacteristicsForm;
