import React from 'react';

const addSubDisplay = {
  scale: 'galaxy', 
  focus: 'form', 
  type: 'subdivision', 
  function: 'create',
  parentScale: 'universe'
}

const addFeatureDisplay = {
  scale: 'universe', 
  focus: 'form', 
  type: 'feature', 
  function: 'create'
}

// Assuming that you fetch data and pass it as a prop
const ContextLayout = ({ game, context, display, setDisplay }) => {
    //console.log('Game context:', context);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-md w-80">
        <h2 className="text-xl font-bold text-blue-700">{game.name}</h2>
        <p className="text-gray-700">{game.description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-blue-500">Universe Context:</h3>
          <p className="text-gray-700">{context && context.name}</p>
          <p className="text-gray-700">{context && context.description}</p>
        </div>
        <div className="flex justify-evenly mt-6">
          <button 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => {setDisplay(Object.assign({}, addSubDisplay, {parentId: context.id}))}}
          >
            Add Subdivision
          </button>
          <button 
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => {setDisplay(addFeatureDisplay)}}
          >
            Add Feature
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextLayout;
