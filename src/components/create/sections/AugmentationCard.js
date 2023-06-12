import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';
import { useSelector } from 'react-redux';
import { selectCharacter } from '@/store/selectors/characters';

const AugmentationCard = ({ userData, gameState, clickHandler, characterId }) => {
    const selectedCharacter = useSelector((state) => selectCharacter(state, characterId));
    const augmentations = selectedCharacter?.augmentations;
    const status = getStatusOfSection('Augmentation')(selectedCharacter);

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-12">
                <div className="text-sm font-medium leading-6 text-gray-900">Augmentations</div>
            </div>
            <div className="p-6">
                {augmentations?.length ? (
                    augmentations.map((item, index) => (
                        <div key={index}>
                            <div>Augmentation Name: {item.name}</div>
                            <div>Description: {item.description}</div>
                            <div>Effect: {item.effect}</div>
                        </div>
                    ))
                ) : (
                    <div>No Augmentations</div>
                )}
            </div>
        </li>
    );
};

export default AugmentationCard;
