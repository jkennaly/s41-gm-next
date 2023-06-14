import React from 'react';

const FormInputField = ({ fieldName, label, register, watch, handleDrop, handleReset, characteristics, setCharacteristics }) => {
  const fieldValue = watch(fieldName);

  // Calculate bonus - this is the attribute bonus for Traveller 
  const bonus = fieldValue ? (
    fieldValue < 1 ? -3 :
    fieldValue < 3 ? -2 :
    fieldValue < 6 ? -1 :
    fieldValue < 9 ? 0 :
    fieldValue < 12 ? 1 :
    fieldValue < 15 ? 2 :
    3
  ) : null;

  // Define bonusColor based on the value of bonus
  const bonusColor = bonus < -2 ? `bg-red-600 text-white` : 
  bonus < -1 ? `bg-red-400 text-white` : 
  bonus < 0 ? `bg-red-200 text-black` : 
  bonus > 2 ? `bg-blue-600 text-white` : 
  bonus > 1 ? `bg-blue-400 text-white` : 
  bonus > 0 ? `bg-blue-200 text-black` : 
                     'bg-gray-200 text-black';

  return (
    <div 
      className="bg-gray-100 p-3 sm:grid sm:grid-cols-4 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5"
      onDragOver={(event) => event.preventDefault()}
      onDrop={fieldValue ? null : handleDrop(fieldName)}
    >
      <label htmlFor={fieldName} className="block text-xl font-medium text-gray-700 sm:mt-px sm:pt-2">{label}</label>
      <div className="mt-1 sm:mt-0 sm:col-span-2 bg-gray-200 p-2 rounded flex items-center">
        <input
          type="number"
          {...register(fieldName, { required: true })}
          className="max-w-xs block w-12 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-xl border-gray-300 rounded-md h-10"
        />
        <button 
          className="bg-gray-800 text-gray-100 px-2 ml-2 rounded" 
          onClick={() => handleReset(fieldName)}
        >
          Reset
        </button>
      {!!bonus && (
        <div className={`border-2 w-8 border-gray-500 rounded px-2 mx-1 ${bonusColor}`}>
          {bonus}
        </div>
      )}
      </div>
    </div>
  );
};

export default FormInputField;
