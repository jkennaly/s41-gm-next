import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';

const WeaponsCard = ({ userData, selectedCharacter, gameState, clickHandler }) => {
    const weapons = selectedCharacter?.weapons;
    const status = getStatusOfSection('Weapons')(selectedCharacter);

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-12">
                <div className="text-sm font-medium leading-6 text-gray-900">Weapons</div>
            </div>
            <div className="p-6">
                {weapons?.length ? (
                    weapons.map((weapon, index) => (
                        <div key={index}>
                            <div>Weapon Name: {weapon.name}</div>
                            <div>Damage: {weapon.damage}</div>
                            <div>Range: {weapon.range}</div>
                            <div>Mass: {weapon.mass}</div>
                            {/* Add more fields as needed */}
                        </div>
                    ))
                ) : (
                    <div>No Weapons</div>
                )}
            </div>
        </li>
    );
};

export default WeaponsCard;
