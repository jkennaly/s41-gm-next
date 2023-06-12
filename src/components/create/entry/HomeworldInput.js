import React from 'react';
import { useSelector } from 'react-redux';
import { selectCampaignWorlds } from '@/store/selectors/contexts';

const HomeworldInput = ({ register, gameId, setValue }) => {
  const campaignWorlds = useSelector((state) => selectCampaignWorlds(state, gameId));
  
  const handleRandomClick = () => {
    const randomIndex = Math.floor(Math.random() * campaignWorlds.length);
    setValue('homeworld', campaignWorlds[randomIndex].name);
  };

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label htmlFor="homeworld" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Homeworld</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2 flex items-center">
        <input
          {...register('homeworld')}
          list="campaign-worlds"
          id="homeworld"
          name="homeworld"
          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md mr-4"
        />
        <datalist id="campaign-worlds">
          {campaignWorlds.map((world, index) => (
            <option key={world.id} value={world.name}>{world.name}</option>
          ))}
        </datalist>
        <button onClick={handleRandomClick} className="rounded-md py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Random
        </button>
      </div>
    </div>
  );
};

export default HomeworldInput;
