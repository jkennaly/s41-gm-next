import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';
import { useSelector } from 'react-redux';
import { selectCharacter } from '@/store/selectors/characters';

const GearCard = ({ userData, gameState, clickHandler, characterId }) => {
    const selectedCharacter = useSelector((state) => selectCharacter(state, characterId));
    const equipment = selectedCharacter?.equipment;
    const status = getStatusOfSection('Equipment')(selectedCharacter);

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-12">
                <div className="text-sm font-medium leading-6 text-gray-900">Equipment</div>
            </div>
            <div className="p-6">
                {equipment?.length ? (
                    equipment.map((item, index) => (
                        <div key={index}>
                            <div>Item Name: {item.name}</div>
                            <div>Mass: {item.mass}</div>
                            {/* Add more fields as needed */}
                        </div>
                    ))
                ) : (
                    <div>No Equipment</div>
                )}
            </div>
        </li>
    );
};

export default GearCard;
