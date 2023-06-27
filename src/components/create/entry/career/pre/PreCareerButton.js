import React from 'react';


const MyButton = ({ clickHandler, label, character, probabilities, disabled }) => {
    const chances = probabilities(character);
  return (
    <button
        disabled={disabled}
      onClick={clickHandler}
      className={disabled ? 
        "ml-3 inline-flex flex-col justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 cursor-not-allowed" 
        : 
        "ml-3 inline-flex flex-col justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      }
    >
        <div className="text-xs">
      {label}
        </div>
      <div className="ml-2 text-xs text-gray-300">
        {chances.map(([name, probability], index) => (
            <span key={index}>{name} {Math.round(probability * 100)}% </span>
        ))}
        </div>
    </button>
  );
};


export default MyButton;
