import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/api';
import skills from '../../skills';
import { useDispatch } from 'react-redux';
import { addModel } from '@/store/actions/models';

const universitySkills = [
    'Admin',
    'Advocate',
    'Animals',
    'Art',
    'Astrogation',
    'Electronics',
    'Engineer',
    'Language',
    'Medic',
    'Navigation',
    'Profession',
    'Science',
];



const termSkillOptions = universitySkills
    .map((skill) => skills.find((s) => s.name === skill))

const UniversitySkills = ({ register, setCheckedSkills}) => {

    

const handleCheckboxChange = (e) => {
    const [skillName, setType] = e.target.name.split('.');

    setCheckedSkills(prevState => ({
        ...prevState,
        [skillName]: {
            ...prevState[skillName],
            [setType]: e.target.checked
        }
    }));
};
  //console.log('maxSkills/checkedCount', maxSkills, checkedCount);
  return (
    <>
        <h4 className="text-lg leading-6 font-medium text-gray-900">Choose 1 skill at 0 and 1 at 1</h4>
        <span>0</span>
        <span>/</span>
        <span>1</span>
        {termSkillOptions.map((skill) => (
            <div 
                className="mt-1 flex items-center justify-between"
                key={skill.name}
            >
                <label className="block text-sm font-medium text-gray-700">
                    <input onClick={handleCheckboxChange} className='bg-skill' type="checkbox" {...register(`${skill.name}.set0`)} />
                    <input onClick={handleCheckboxChange} className='bg-skill' type="checkbox" {...register(`${skill.name}.set1`)} />
                    {skill.name}
                    {skill.specialties && <select {...register(`${skill.name}.specialty`)}>
                        {skill.specialties.map((specialty) => (
                            <option key={specialty.name} value={specialty.name}>{specialty.name}</option>
                        ))}
                        
                    </select>}
                </label>
            </div>
        ))}
    </>
  );
};

export default UniversitySkills;
