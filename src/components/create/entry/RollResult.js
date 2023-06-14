import React from 'react';

const RollResult = ({ roll: rollResult }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('rollResultId', rollResult.id.toString());
  };

  return (
    <div 
      className="flex justify-between items-center border-2 border-gray-300 hover:border-indigo-500 p-2 m-2 rounded"
      draggable 
      onDragStart={handleDragStart}
    >
      <span className="text-4xl mr-4">{rollResult.sum}</span>
      <div className="flex">
        {rollResult.rolls.map((roll, index) => (
          <div key={index} className="border-2 border-gray-500 rounded px-2 mx-1">
            {roll}
          </div>
        ))}
        {rollResult.drops.map((drop, index) => (
          <div key={index} className="border-2 border-gray-500 rounded px-2 mx-1 relative">
            <span>{drop}</span>
            <div className={"absolute inset-0 cross-line"}></div>
            <div className={"absolute inset-0 cross-line cross-line-rotate"}></div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default RollResult;
