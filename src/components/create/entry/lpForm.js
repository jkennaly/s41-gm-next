import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addModel } from '../../../store/actions/models';
import { useDispatch, useSelector } from 'react-redux';
import { rollMgt2eChargen } from '../../../utils/room';
import BackgroundSkills from './career/BackgroundSkills';
import PreCareerEdu from './career/PreCareerEdu';
import Draft from './career/Draft';
import University from './career/pre/University';
import UniversitySkills from './career/pre/content/UniversitySkills';
import MyModal from '../../modals/AddTraitModal';
import { selectImgSrcForCharacter, selectCharacter } from '@/store/selectors/characters';
import RollResult from './RollResult';
import CharacteristicValue from './CharacteristicValue';
import SkillsLayout from '@/components/layouts/SkillLayout';
import CCLayout from '@/components/layouts/CCLayout';
import VerifyTermAttempt from './career/VerifyTermAttempt';
import PreCareerEvent from './career/pre/PreCareerEvent';
import { updatePortraitSrc } from '@/store/actions/models';
import Prison from './career/Prison';

const headings = {
  background: 'Choose Background Skills',
  preCareer: 'Choose Pre-Career Education',
  university: 'University',
}


const LifePathsForm = ({ userData, setActiveSection, gameState, gameId, room, characterId }) => {
  const [modalContent, setModalContent] = useState('background');
  const character = useSelector((state) => selectCharacter(state, characterId));

  const [termNumber, setTermNumber] = useState(null);

  useEffect(() => {
    if (character) {
      const { lifePaths } = character;
      const incompletePaths = lifePaths.filter(p => !p.completed);
      const termCount = incompletePaths.length ? incompletePaths[0].term : lifePaths.length + 1;
      setTermNumber(termCount);
    }
  }, [character?.lifePaths?.length]);

  const currentCc = character?.coreCharacteristics || {};
  const currentPdf = character?.personalDataFile || {};
  const currentSkills = character?.skills[0]?.skills;
  const currentPaths = character?.lifePaths || [];


  const thisTermPath = termNumber && currentPaths.find((path) => path.term === termNumber);
  const thisTermPreCareer = thisTermPath?.preCareerTerms;
  const thisPreCareerCompleted = thisTermPreCareer?.completed
  const thisTermCareer = thisTermPath?.careerTerms;
  const thisTermCareerCompleted = thisTermCareer?.completed;
  const thisTermMuster = thisTermPath?.musteringOut;
  const thisTermMusterCompleted = !!thisTermMuster || thisTermMuster?.completed;
  const hasBackground = character?.skills ? Boolean(character.skills.length) : false;
  const backgroundDisabled = hasBackground;

  const preCareerPossible = hasBackground && termNumber < 4;
  const noTermInProgress = !thisTermPath;
  const preCareerDisabled = !preCareerPossible || thisTermCareer
  //console.log('preCareerDisabled', preCareerDisabled, 'preCareerPossible', preCareerPossible, 'thisTermCareer', thisTermCareer, 'noTermInProgress', noTermInProgress);
  const careerPossible = hasBackground && (thisTermCareer || noTermInProgress);
  //console.log('careerPossible', careerPossible, 'hasBackground', hasBackground, 'thisTermCareer', thisTermCareer, 'noTermInProgress', noTermInProgress);
  const careerDisabled = !careerPossible;
  const musterPossible = hasBackground && thisTermCareer;
  const musterDisabled = !musterPossible;
  const endPossible = hasBackground && (
    (!thisTermCareer || thisTermMusterCompleted) &&
    (!thisTermPreCareer || thisPreCareerCompleted)
  )
  const endDisabled = !endPossible;
  const { register, handleSubmit, setValue, getValues, control, watch, reset } = useForm();
  //set the default values for the form from the currentCc
  const [portraitSrc, portraitId] = useSelector((state) => selectImgSrcForCharacter(state, character?.id));
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
    setModalContent('background');
    setModalOpen(true);
  }
    
  const handlePreCareer = () => {
    setModalContent('preCareer');
    setModalOpen(true);
  }
    
  const handleCareer = () => {
    
  }
      
  const handleEnd = () => {
    
  }
      
  const backgroundSubmit = () => {
    
  }
  const content = (modalContent === 'university' || modalContent === 'universitySkills')  
    ? <University
      character={character}
      gameId={gameId}
      termNumber={termNumber}
      handleModalClose={handleModalClose}
      setModalContent={setModalContent}
    />
    : modalContent === 'verify'  
    ? <VerifyTermAttempt
      character={character}
      gameId={gameId}
      room={room}
      term={termNumber}
      handleModalClose={handleModalClose}
      setModalContent={setModalContent}
      gameState={gameState}
      userId={userData.id}
    />
    : modalContent === 'preCareerEvent'  
    ? <PreCareerEvent
      character={character}
      gameId={gameId}
      room={room}
      thisTermPath={thisTermPath}
      termNumber={termNumber}
      handleModalClose={handleModalClose}
      setModalContent={setModalContent}
      gameState={gameState}
      userId={userData.id}
    />
    : modalContent === 'preCareer'  
    ? <PreCareerEdu
      character={character}
      gameId={gameId}
      room={room}
      termNumber={termNumber}
      setTermNumber={setTermNumber}
      handleModalClose={handleModalClose}
      setModalContent={setModalContent}
    />
    : modalContent === 'prison'  
    ? <Prison
      draftType={modalContent}
      character={character}
      gameId={gameId}
      room={room}
      termNumber={termNumber}
      setTermNumber={setTermNumber}
      handleModalClose={handleModalClose}
      setModalContent={setModalContent}
    />
    : modalContent === 'warDraft'  
    ? <Draft
      draftType={modalContent}
      character={character}
      gameId={gameId}
      room={room}
      termNumber={termNumber}
      setTermNumber={setTermNumber}
      handleModalClose={handleModalClose}
      setModalContent={setModalContent}
    />
    : <BackgroundSkills 
      setValue={setValue} 
      character={character} gameId={gameId} 
      handleSubmit={handleSubmit} 
      register={register} 
      fieldName={"skills"} 
      getValues={getValues} 
      handleModalClose={handleModalClose} 
    /> 

    const handleImageError = async () => {
      dispatch(updatePortraitSrc({ portraitId}))
    };

    // console.log('LifePathsForm currentRolls', JSON.stringify(currentRolls))
    // console.log('LifePathsForm gameState', JSON.parse(JSON.stringify(gameState)))

    return (
        <>  
        <MyModal
            heading={headings[modalContent]}
            content={content}
            modalIsOpen={isModalOpen}
            setModalIsOpen={setModalOpen}
            handleSubmit={backgroundSubmit}
        ></MyModal>
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Life Path{`${currentPdf?.name ? `: ${currentPdf?.name}` : ''}`}</h3>
          { portraitSrc && <img onError={handleImageError} src={portraitSrc} alt="portrait" className="h-60 w-60 rounded-full mx-auto" />}
        </div>
        <button disabled={backgroundDisabled} onClick={handleBackground} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${backgroundDisabled ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>Assign Background</button>
        <button disabled={preCareerDisabled} onClick={handlePreCareer} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${preCareerDisabled ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>
        Pre-Career Education
      </button>
      <button disabled={careerDisabled} onClick={handleCareer} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${careerDisabled ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>
        Career Term
      </button>
      <button disabled={musterDisabled} onClick={handleCareer} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${musterDisabled ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>
        Muster Out
      </button>
      <button disabled={endDisabled} onClick={handleEnd} type="button" className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${endDisabled ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}>
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

export default LifePathsForm;
