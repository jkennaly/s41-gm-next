import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';

const ArmorCard = ({ userData, selectedCharacter, gameState, clickHandler }) => {
    const armor = selectedCharacter?.armor;
    const status = getStatusOfSection('Armor')(selectedCharacter);

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-12">
                <div className="text-sm font-medium leading-6 text-gray-900">Armor</div>
            </div>
            <div className="p-6">
                {armor?.length ? (
                    armor.map((item, index) => (
                        <div key={index}>
                            <div>Armor Name: {item.name}</div>
                            <div>Armor Rating: {item.rating}</div>
                            <div>Armor Type: {item.type}</div>
                        </div>
                    ))
                ) : (
                    <div>No Armor</div>
                )}
            </div>
        </li>
    );
};

export default ArmorCard;
