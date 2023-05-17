import React from 'react';


const GMRow = ({gm}) => {
  return (

<li key={gm.name} className="flex flex-col gap-10 pt-12 sm:flex-row">
    <img className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src={gm.imageUrl} alt="" />
    <div className="max-w-xl flex-auto">
    <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{gm.name}</h3>
    <p className="text-base leading-7 text-gray-600">Experience Level: {gm.experienceLevel}</p>
    <p className="text-base leading-7 text-gray-600">Availability: {gm.availability}</p>
    <p className="text-base leading-7 text-gray-600">Language: {gm.language}</p>
    <p className="text-base leading-7 text-gray-600">Preferred Genre/Setting: {gm.preferredGenre}</p>
    <p className="text-base leading-7 text-gray-600">Game Duration: {gm.gameDuration}</p>
    <p className="text-base leading-7 text-gray-600">Player Experience: {gm.playerExperience}</p>
    </div>
</li>
  )
}

export default GMRow;
