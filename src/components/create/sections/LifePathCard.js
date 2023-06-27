import React, { useEffect } from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';
import { useSelector } from 'react-redux';
import { selectCharacter } from '@/store/selectors/characters';
import { updateLifePath } from '@/store/actions/models';
import { useDispatch } from 'react-redux';

const LifePathCard = ({ userData, gameState, clickHandler, characterId }) => {
    const dispatch = useDispatch();
    const selectedCharacter = useSelector((state) => selectCharacter(state, characterId));
    const lifePaths = selectedCharacter?.lifePaths;
    const status = getStatusOfSection('LifePath')(selectedCharacter);
    const last = lifePaths.length - 1;
    const incompletePaths = lifePaths
        .filter((lp) => !lp.completed && !lp.careerTerms && !lp.preCareerTerms)
    
    useEffect(() => {
        dispatch(updateLifePath({characterId}));
    }, [incompletePaths.length]);
        

    //console.log('LifePathCard', selectedCharacter, { lifePaths, status, last });

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
