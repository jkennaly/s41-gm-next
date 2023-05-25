import React, { useEffect } from 'react';
import PlayerCard from './PlayerCard';

function Table({ gameState }) {
  if (!gameState) return null;
  return (
    <div>
      <div>
        {
          [...gameState.players.entries()].map(([playerId, player]) => (
            <PlayerCard key={playerId} player={player} />
          ))
        }
      </div>
    </div>
  );
}

export default Table;
