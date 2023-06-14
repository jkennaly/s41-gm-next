import React, { useState } from 'react';
import axios from 'axios';

const NameInput = ({ register, setValue }) => {

  const handleSuggestClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://randomuser.me/api/?inc=name');
      const suggestedName = `${response.data.results[0].name.first} ${response.data.results[0].name.last}`;
      setValue('name', suggestedName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2 flex items-center">
        <input
          {...register('name', { required: true })}
          id="name"
          name="name"
          type="text"
          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md mr-4"
        />
        <button onClick={handleSuggestClick} className="rounded-md py-2 px-3 bg-green-600 hover:bg-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Suggest
        </button>
      </div>
    </div>
  );
};

export default NameInput;
