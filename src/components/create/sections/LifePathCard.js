import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';

const LifePathCard = ({ userData, selectedCharacter, gameState, clickHandler }) => {
    const lifePaths = selectedCharacter?.lifePaths;
    const status = getStatusOfSection('LifePath')(selectedCharacter);
    const last = lifePaths.length - 1;

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-24">
                <div className="text-sm font-medium leading-6 text-gray-900">Life Path</div>
            </div>
            <div className="p-6">
                {lifePaths && lifePaths.length && <div >
                    <div>Career Term: {lifePaths[last].careerTerm}</div>
                    <div>Pre-Career Term: {lifePaths[last].preCareerTerm}</div>
                    <div>Mustering Out: {lifePaths[last].musteringOut}</div>
                </div>}
            </div>
        </li>
    );
};

export default LifePathCard;
