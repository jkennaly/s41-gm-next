import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';
import { useSelector } from 'react-redux';
import { selectCharacter } from '@/store/selectors/characters';

const SkillsCard = ({ userData, gameState, clickHandler, characterId }) => {
    const selectedCharacter = useSelector((state) => selectCharacter(state, characterId));
    const skills = selectedCharacter?.skills;
    const status = getStatusOfSection('Skills')(selectedCharacter);

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-12">
                <div className="text-sm font-medium leading-6 text-gray-900">Skills</div>
            </div>
            <div className="p-6">
                {skills?.map((skill, index) => (
                    <div key={index}>
                        <div>Name: {skill.name}</div>
                        <div>Level: {skill.level}</div>
                        <div>Category: {skill.category}</div>
                        <div>Specializations: {skill.specializations.join(', ')}</div>
                    </div>
                ))}
            </div>
        </li>
    );
};

export default SkillsCard;
