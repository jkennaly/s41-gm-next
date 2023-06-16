import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api';
import skills from './skills';
import { useDispatch } from 'react-redux';
import { addModel } from '@/store/actions/models';

const backgroundSkills = [
    'Admin',
    'Animals',
    'Art',
    'Athletics',
    'Carouse',
    'Drive',
    'Electronics',
    'Flyer',
    'Language',
    'Mechanic',
    'Medic',
    'Profession',
    'Science',
    'Seafarer',
    'Streetwise',
    'Survival',
    'Vacc Suit'
];

const backgroundDetail = backgroundSkills
    .map((skill) => skills.find((s) => s.name === skill))

const TraitContent = ({ gameId, character, handleModalClose}) => {

    const currentCc = character?.coreCharacteristics || {};
    const [checkedCount, setCheckedCount] = useState(0);
    const [maxSkills, setMaxSkills] = useState(0);
    const { register, handleSubmit, setValue, getValues, reset } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        const bonus = currentCc.education ? (
          currentCc.education < 1 ? -3 :
          currentCc.education < 3 ? -2 :
          currentCc.education < 6 ? -1 :
          currentCc.education < 9 ? 0 :
          currentCc.education < 12 ? 1 :
          currentCc.education < 15 ? 2 :
          3
        ) : -3;
        setMaxSkills(bonus + 3);
      }, [currentCc.education]);

      const handleCheckboxChange = (e) => {
        //console.log('handleCheckboxChange', e.target.checked, e.target.name, checkedCount)
        setCheckedCount(prevCount => e.target.checked ? prevCount + 1 : prevCount - 1);
      };

  const onSubmit = (e) => {
    const formData = getValues();

    //console.log('onSubmit', formData);

    //condense the form data to a SkillSet
    const skillSet = Object.keys(formData)
        .filter((key) => formData[key].set0)
        .map((key) => {
            return {
                name: key,
                value: !formData[key].specialty ? 0 : undefined,
                specialties: formData[key].specialty ? [{name: formData[key].specialty, value: 0}] : undefined
            }
        });

    //console.log('onSubmit skillSet', skillSet);
    dispatch(addModel({
        modelData: skillSet, 
        modelName: 'ss', 
        characterId: character.id
    }, 
        'ss'
    ))
    handleModalClose();
  }

  const handleCancel = (event) => {
    reset();
    event.preventDefault();
    handleModalClose();
};

  //console.log('maxSkills/checkedCount', maxSkills, checkedCount);
  return (
    <>
        <h4 className="flex items-center justify-around text-lg leading-6 font-medium text-gray-900">{`${checkedCount}/${maxSkills}`}</h4>
      {backgroundDetail.map((skill) => (
        <div 
        className="mt-1 flex items-center justify-between"
        key={skill.name}
    >
        <label className="block text-sm font-medium text-gray-700">
        <input onClick={handleCheckboxChange} className='bg-skill' type="checkbox" {...register(`${skill.name}.set0`)} />
        {skill.name}
        {skill.specialties && <select {...register(`${skill.name}.specialty`)}>
            {skill.specialties.map((specialty) => (
                <option key={specialty.name} value={specialty.name}>{specialty.name}</option>
            ))}
        </select>
        }
        </label>
    </div>
        ))}
        <button disabled={checkedCount !== maxSkills} className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${checkedCount !== maxSkills ? 'text-gray-400 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`} onClick={onSubmit}>Save</button>
        <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleCancel}>Cancel</button>
    </>
  );
};

export default TraitContent;
