import { probabilizerBasic as p } from '@/utils/gameMethods';
import { useEffect, useState } from 'react';

const allAssociates = [
    'ally',
    'enemy',
    'contact',
    'rival',
]

function AssociateSelector({ 
    character, 
    selectableAssociates,
    setSelectedAssociate, 
    selectedAssociate
}) {
   
    return (
        <>
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <select
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 appearance-none hover:border-gray-500 focus:outline-none focus:border-gray-500" 
                onChange={(e) => {
                    const associate = selectableAssociates.find((assoc) => assoc.name === e.target.value);
                    setSelectedAssociate(associate)
                }}
            >
                {
                    selectableAssociates
                        .map((assoc) => (
                            <option key={assoc.name} value={assoc.name}>
                                {assoc.name}
                            </option>
                        ))
                }
                </select>
        </div>
        </>
    );
  }
  export default AssociateSelector;