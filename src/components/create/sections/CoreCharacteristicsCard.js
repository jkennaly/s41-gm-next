import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';

const CoreCharacteristicsCard = ({ userData, selectedCharacter, gameState, clickHandler }) => {
    const coreCharacteristics = selectedCharacter?.coreCharacteristics;
    const status = getStatusOfSection('CoreCharacteristics')(selectedCharacter);

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                    src={selectedCharacter?.personalDataFile?.currentPortrait?.imageUrl}
                    alt={selectedCharacter?.personalDataFile?.name}
                    className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                <div className="text-sm font-medium leading-6 text-gray-900">Core Characteristics</div>
            </div>
            <div className="p-6">
                <div>Strength: {coreCharacteristics?.strength}</div>
                <div>Dexterity: {coreCharacteristics?.dexterity}</div>
                <div>Endurance: {coreCharacteristics?.endurance}</div>
                <div>Intelligence: {coreCharacteristics?.intelligence}</div>
                <div>Education: {coreCharacteristics?.education}</div>
                <div>Social Standing: {coreCharacteristics?.socialStanding}</div>
            </div>
        </li>
    );
};

export default CoreCharacteristicsCard;
