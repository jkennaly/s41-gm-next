import React from 'react';
import Row from './Row';



const GMComponent = ({gmList}) => {
  return (
    <div className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-5">
        <ul role="list" className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3">
          {gmList.map((gm) => (
            gm.gm && <Row key={gm.username} gm={gm.gm} /> || gm.username
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GMComponent;
