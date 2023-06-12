import React from 'react';

// Assuming that you fetch data and pass it as a prop
const FeatureLayout = ({ game, universe, parent, feature, display, setDisplay, subdivision }) => {
    //console.log('Game context:', context);

  
  const addFeatureDisplay = {
    scale: subdivision.scale || 'universe', 
    focus: 'form', 
    type: 'feature', 
    function: 'create',
    parentId: subdivision.id
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-md w-80">
        <h2 className="text-xl font-bold text-blue-700">{feature.name}</h2>
        <h4 className="text-large text-blue-700">{feature.type || feature.scale || 'Galaxy'}</h4>
        <h5 className="text-gray-700">{feature.uwp}</h5>
        <p className="text-gray-700">{feature.description}</p>
        <div className="flex justify-evenly mt-6">
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

export default FeatureLayout;
