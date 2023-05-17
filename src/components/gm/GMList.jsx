import React from 'react';
import Row from './Row';

// const gmList = [
//   {
//     name: 'Game Master 1',
//     imageUrl: 'https://example.com/gm1.jpg',
//     experienceLevel: 'Advanced',
//     availability: 'Weekends',
//     language: 'English',
//     preferredGenre: 'Fantasy',
//     gameDuration: 'Ongoing campaigns',
//     playerExperience: 'Intermediate to Advanced',
//   },
//   {
//     name: 'Game Master 2',
//     imageUrl: 'https://example.com/gm2.jpg',
//     experienceLevel: 'Intermediate',
//     availability: 'Weekdays evenings',
//     language: 'Spanish',
//     preferredGenre: 'Sci-fi',
//     gameDuration: 'Short one-shots',
//     playerExperience: 'Beginner-friendly',
//   },
//   // More GMs...
// ];

const GMComponent = ({gmList}) => {
  return (
    <div className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-5">
        <div className="max-w-2xl xl:col-span-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Game Masters</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Meet our talented Game Masters who will guide you through exciting RPG adventures.
          </p>
        </div>
        <ul role="list" className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3">
          {gmList.map((gm) => (
            gm.gm && <Row key={gm.nickname} gm={gm.gm} /> || gm.nickname
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GMComponent;
