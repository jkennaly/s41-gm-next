import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { moveRoom } from '../../utils/room';

const LobbyHeading = ({ 
  gameState, 
  userData,
  gameData, 
  room,
}) => {
  const userIsGm = userData?.id === gameData?.gmId;
  return (
  <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
    <div>
      <div className="flex items-center gap-x-3">
        <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
          <div className="h-2 w-2 rounded-full bg-current" />
        </div>
        <h1 className="flex gap-x-3 text-base leading-7">
          <span className="font-semibold text-white">{gameData.name}</span>
          <span className="font-semibold text-white"></span>
        </h1>
      </div>
      <p className="mt-2 text-xs leading-6 text-gray-400">{gameData.description || ''}</p>
    </div>
    {userIsGm && <Button onClick={moveRoom({
      roomId: gameData.id,
      game: `mgt2e`,
      type: `chargen`,
      room,
      msg: "START_GAME"
    })} className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
      Move Group to Character Creation
    </Button>}
    <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
      {gameData.status}
    </div>
  </div>
)};

LobbyHeading.propTypes = {
  userData: PropTypes.string.isRequired,
  gameData: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default LobbyHeading;
