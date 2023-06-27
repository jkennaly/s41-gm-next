import React from 'react';

const RollResult = ({ roll: rollResult, netModifier, target, micro, skillObject }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('rollResultId', rollResult.id.toString());
  };

let targetted;
let modifier;
let modifiedTotal;
let combinedString;
if(!skillObject || !skillObject.selectorSet) {
  targetted = Boolean(target);
  modifier = netModifier >= 0 ? `+${netModifier}` : netModifier;
  modifiedTotal = rollResult.sum + netModifier;
  combinedString = `${rollResult.sum} ${modifier}`;
} else {
  targetted = Boolean(skillObject.target);
  modifier = skillObject.otherBonus >= 0 ? `+${skillObject.otherBonus}` : skillObject.otherBonus;
  modifiedTotal = rollResult.sum + (skillObject.otherBonus || 0) + (skillObject.skillBonus || 0) + (skillObject.specialtyBonus || 0) + (skillObject.characteristicBonus || 0);
  combinedString = `${rollResult.sum} ${modifier}`;
}
//console.log('RollResult', skillObject, JSON.parse(JSON.stringify(rollResult)))
  return (
    <div 
      className={`${micro ? `w-16 h-12` : ``} ${targetted ? `${modifiedTotal >= target ? `bg-green-400` : `bg-red-400` } ` : ''}flex justify-between items-center border-2 border-gray-300 hover:border-indigo-500 p-2 m-2 rounded`}
      draggable 
      onDragStart={handleDragStart}
    >
      <span className="text-4xl mr-4">{targetted || modifier ? modifiedTotal : rollResult.sum}</span>
      {!micro && <>
      {targetted && <div className="flex flex-col">
        <span className="text-sm">Target: {target}</span>
        <span className="text-sm">{combinedString}</span>
      </div>}
      {!targetted && !!modifier && <div className={`flex flex-col`}>
        <span className="text-sm">{combinedString}</span>
      </div>}
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
      </>}
    </div>
  );
};

export default RollResult;
