import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api';
import skills from './skills';
import { useDispatch } from 'react-redux';
import { addModel } from '@/store/actions/models';



const PsionicsTest = ({ gameId, character, handleModalClose, termCount, gameState}) => {


  const currentRolls = (gameState?.players?.[userId]?.rollResults || [])
  const currentPdf = character?.personalDataFile || {};
  const currentAge = currentPdf?.age || 18;
  const lifePaths = character?.lifePaths || [];


  
  const modifiedTotal = currentRolls[0] ? currentRolls[0].sum + term.netModifier : 0;
  const success = modifiedTotal >= term.entryTarget;
  const failure = !success
  
  useEffect(() => {
      setRollMade(success)
  }, [success, rollAttempted, setRollMade])


  const onSubmit = (e) => {

  }

  const handleCancel = (event) => {
    event.preventDefault();
    handleModalClose();
};

  //console.log('maxSkills/checkedCount', maxSkills, checkedCount);
  return (
    <>
        <h4 className="flex items-center justify-around text-lg leading-6 font-medium text-gray-900">{`${checkedCount}/${maxSkills}`}</h4>
      
        <button disabled={checkedCount !== maxSkills} className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${checkedCount !== maxSkills ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`} onClick={onSubmit}>Save</button>
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleCancel}>Cancel</button>
    </>
  );
};

export default PsionicsTest;
