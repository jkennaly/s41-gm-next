import React from 'react';
import { useRouter } from 'next/router';

// Assuming that you fetch data and pass it as a prop
const SubdivisionLayout = ({ game, universe, parent, subdivision, display, setDisplay }) => {
    //console.log('Game context:', context);

  const router = useRouter();

  const openMap = async (event) => {
    event.preventDefault();
    router.push(`/games/mgt2e/maps/subdivision/${subdivision.id}`);
  };

const addSubDisplay = {
    scale: subdivision.scale || 'Galaxy', 
    focus: 'form', 
    type: 'subdivision', 
    function: 'create',
    parentScale: parent.scale
  }
  
  const addFeatureDisplay = {
    scale: subdivision.scale || 'universe', 
    focus: 'form', 
    type: 'feature', 
    function: 'create',
    parentId: subdivision.id
  }
  
  const subsectorMapDisplay = {
    scale: subdivision.scale || 'subsector', 
    focus: 'overview', 
    type: 'map', 
    function: 'view',
    parentId: subdivision.id
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-md w-80">
        <h2 className="text-xl font-bold text-blue-700">{subdivision.name}</h2>
        <h4 className="text-large text-blue-700">
          {subdivision.scale || 'Galaxy'}
          {subdivision.scale === 'Subsector' ? 
          <button 
            className="bg-red-500 text-white font-bold px-4 rounded"
            onClick={openMap}
          >
            Map
          </button>
            
          : ''}
          </h4>
        <h5 className="text-gray-700">{subdivision.uwp}</h5>
        <p className="text-gray-700">{subdivision.description}</p>
        <div className="flex justify-evenly mt-6">
          <button 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => {setDisplay(Object.assign({}, addSubDisplay, {parentId: subdivision.id}))}}
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

export default SubdivisionLayout;
