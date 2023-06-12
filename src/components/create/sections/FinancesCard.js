import React from 'react';
import statuses from '../../lobby/statuses';
import getStatusOfSection from '@/utils/getStatusOfSection';
import { useSelector } from 'react-redux';
import { selectCharacter } from '@/store/selectors/characters';

const FinancesCard = ({ userData, gameState, clickHandler, characterId }) => {
    const selectedCharacter = useSelector((state) => selectCharacter(state, characterId));
    const finances = selectedCharacter?.finances;
    const status = getStatusOfSection('Finances')(selectedCharacter);

    return (
        <li onClick={clickHandler} className={`overflow-hidden rounded-xl border ${status !== 'disabled' ? `cursor-pointer` : ''} ${statuses[status]}`}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-12">
                <div className="text-sm font-medium leading-6 text-gray-900">Finances</div>
            </div>
            <div className="p-6">
                <div>Cash: {finances?.cash}</div>
                <div>Income: {finances?.income}</div>
                <div>Debt: {finances?.debt}</div>
                <div>Expenditure: {finances?.expenditure}</div>
            </div>
        </li>
    );
};

export default FinancesCard;
