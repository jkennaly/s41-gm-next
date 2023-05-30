import React from 'react';

// Assuming that you fetch data and pass it as a prop
const ContextLayout = ({ game }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 m-4 bg-white rounded shadow-md w-80">
        <h2 className="text-xl font-bold text-blue-700">{game.name}</h2>
        <p className="text-gray-700">{game.description}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-blue-500">Universe Context:</h3>
          <p className="text-gray-700">{game.universe.name}</p>
          <p className="text-gray-700">{game.universe.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ContextLayout;
