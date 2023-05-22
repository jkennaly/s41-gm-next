import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';

const GameHeading = ({ gameTitle, gameStatus, gameDescription, userData, gameData }) => {
  const userIsGm = userData?.id === gameData?.gmId;
  return (
  <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
    <div>
      <div className="flex items-center gap-x-3">
        <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
          <div className="h-2 w-2 rounded-full bg-current" />
        </div>
        <h1 className="flex gap-x-3 text-base leading-7">
          <span className="font-semibold text-white">{gameTitle}</span>
          <span className="font-semibold text-white"></span>
        </h1>
      </div>
      <p className="mt-2 text-xs leading-6 text-gray-400">{gameDescription}</p>
    </div>
    {userIsGm && <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
      Schedule a session
    </div>}
    {userIsGm && <Button href={`/prep/${gameData.id}`} className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
      Prepare for a session
    </Button>}
    <Button href={`/join/${gameData.id}`} className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
      Join the Game
    </Button>
    <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
      {gameStatus}
    </div>
  </div>
)};

GameHeading.propTypes = {
  gameTitle: PropTypes.string.isRequired,
  gameStatus: PropTypes.string.isRequired,
  gameDescription: PropTypes.string.isRequired,
};

export default GameHeading;
