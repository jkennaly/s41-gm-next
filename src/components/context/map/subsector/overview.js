import React, { useState } from 'react';
import Map from '@/components/context/map/subsector/main';
import { selectLowerDivisions } from '@/store/selectors/contexts';
import { useSelector, useDispatch } from 'react-redux';
import { updateSubdivision } from '@/store/actions/models';

// Assuming that you fetch data and pass it as a prop
const SubsectorOverview = ({ subdivision }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState('empty');
    const [toLocate, setToLocate] = useState(null);
    const [showAvailable, setShowAvailable] = useState(false);
    const lowerDivisions = useSelector((state) => selectLowerDivisions(state, subdivision.id));
    
    const located = lowerDivisions.filter((division) => division.superLocation);
    const unlocated = lowerDivisions.filter((division) => !division.superLocation);
    
    const assignedLocations = located.map((division) => division.superLocation);
    
    console.log('SubsectorOverview lowerDivisions:', lowerDivisions, subdivision);
    const handleHexClick = (hex) => {
        console.log('SubsectorOverview handleHexClick:', hex, type, toLocate);
        //if the type is empty, add to subdivision.emptyLocations
        //if the type is location, add the location to the lowerDivisions.superLocation
        if(type === 'location'){
            const lowerDivision = unlocated.find((division) => division.id === toLocate);
            if(!lowerDivision) return;
            const changes = { ...lowerDivision };
            changes.superLocation = `${hex.x + 0 > 9 ? '' : '0'}${hex.x + 0}${hex.y + 0 > 9 ? '' : '0'}${hex.y + 0}`
            dispatch(updateSubdivision({subdivisionId: lowerDivision.id, changes}));
        }
        //if the type is create, create a new hex and add it to the lowerDivisions
    }
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
        <div className="p-6 m-4 bg-white rounded shadow-md w-80">
            <div className="flex justify-between">
        <label>
        <h2 className="text-xl font-bold text-blue-700">Need Locations:</h2>
        <select
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onChange={e => {
                console.log('Select a Location e.target.value:', e.target.value);
                setToLocate(parseInt(e.target.value, 10))
            
            }}
        >
            <option value={null}>Select a Location</option>
        {
            unlocated.map((division) => {
                return (
                    <option 
                        className="p-6 m-4 bg-white rounded shadow-md w-80"
                        key={division.id}
                        value={division.id}
                    >
                        {division.name}
                    </option>
                )
            })

        }
        </select>
        </label>
        <button
            onClick={() => {
                setType('location')
                setShowAvailable(!showAvailable)
            
            }}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
            Assign Location
        </button>
        </div>
        <div className="flex justify-between">
            
        <button
            onClick={() => {
                setType('empty')
                setShowAvailable(!showAvailable)
            
            }}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
            Set Empty
        </button>
            </div>
        <div className="flex justify-between">
            
        <button
            onClick={() => {
                setType('create')
                setShowAvailable(!showAvailable)
            
            }}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
            Create Hex
        </button>
            </div>
        <div className="flex justify-between">
            <h2 className="text-xl font-bold text-blue-700">Assigned Locations:</h2>
            {
                located.map((location) => {
                    console.log('SubsectorOverview located:', location);
                    return (
                        <div 
                            className="p-6 m-4 bg-white rounded shadow-md w-80"
                            key={location.id}
                        >
                            {location.name}
                        </div>
                    )
                })
            } 
            </div>

        </div>
    <Map 
        located={located}
        assigned={assignedLocations} 
        emptyLocations={subdivision.emptyLocations || []} 
        focusAvailable={showAvailable}
        handleHexClick={handleHexClick}
    />
    </div>
  );
};

export default SubsectorOverview;
