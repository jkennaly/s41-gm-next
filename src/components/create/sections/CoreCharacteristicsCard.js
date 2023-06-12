import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';
import { useSelector } from 'react-redux';
import { selectCharacter } from '@/store/selectors/characters';

const CoreCharacteristicsCard = ({ userData, gameState, clickHandler, characterId }) => {
    const selectedCharacter = useSelector((state) => selectCharacter(state, characterId));
    const coreCharacteristics = selectedCharacter?.coreCharacteristics;
    const status = getStatusOfSection('CoreCharacteristics')(selectedCharacter);

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-24">
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
