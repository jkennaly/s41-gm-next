import React, { useState } from 'react';
import api from '@/api';

const TraitContent = ({ fields, append, remove, gameId, character, fieldName, setValue, handleModalClose, getValues, register }) => {


  const handleSuggestClick = async (data) => {
    const formData = getValues();
    const ctx = {
        formData,
        gameId,
        character,
        characterId: character.id,
        request: fieldName
    }
    try {
      const { data } = await api.post(`/suggestions`, ctx);
      setValue(fieldName, data.suggestion);
    } catch (error) {
        console.log('error', error);
    }
  }

  const onSubmit = (data) => {
    append({ trait: getValues(fieldName) })
    setValue(fieldName, '');

    handleModalClose();
  }

  return (
    <>
      <textarea 
        className='mt-1 block w-full h-20' 
        {...register(fieldName)}
      />
      {fields.map((item, index) => (
        <div key={item.id}>
          <input defaultValue={item.trait} {...register(`${fieldName}s.${index}.trait`)} />
          <button type="button" onClick={() => remove(index)}>X</button>
        </div>
      ))}
      <button type="button" onClick={handleSuggestClick} className="rounded-md py-2 px-3 bg-green-600 hover:bg-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Suggest
      </button>
      <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleModalClose}>Cancel</button>
      <button className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={onSubmit}>Save</button>
    </>
  );
};

export default TraitContent;
