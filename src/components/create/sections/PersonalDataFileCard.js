import React from 'react';
import statuses from '../../lobby/statuses';
import { useSelector, useDispatch } from 'react-redux';
import { selectPortraitForCharacter, selectCharacter } from '@/store/selectors/characters';
import getStatusOfSection from '@/utils/getStatusOfSection';
import { updatePortraitSrc } from '@/store/actions/models';

const PersonalDataFileCard = ({ userData, gameState, clickHandler, characterId }) => {
    const dispatch = useDispatch();
  const selectedCharacter = useSelector((state) => selectCharacter(state, characterId));
  const personalData = selectedCharacter?.personalDataFile;
  const portrait = useSelector((state) => selectPortraitForCharacter(state, selectedCharacter.id));
  const status = getStatusOfSection('CoreCharacteristics')(selectedCharacter);

  const handleImageError = async () => {
    dispatch(updatePortraitSrc({ portraitId: portrait.id}))
  };

  return (
      <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <img
                 onError={handleImageError}
                  src={portrait.imageUrl}
                  alt={personalData?.name}
                  className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
              />
              <div className="text-sm font-medium leading-6 text-gray-900">{personalData?.name}</div>
          </div>
          <div className="p-6">
              <div>Species: {personalData?.species}</div>
              <div>Age: {personalData?.age}</div>
              <div>Title: {personalData?.title}</div>
              <div>Homeworld: {personalData?.homeworld}</div>
              {/* Add more fields as needed */}
          </div>
      </li>
  );
};

export default PersonalDataFileCard;
