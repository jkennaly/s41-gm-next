import React, { useEffect } from 'react';
import PlayerCard from './PlayerCard';

function Table({ gameState }) {
  if (!gameState) return null;
  useEffect(() => {
    if (gameState) {
      console.log('gameState:', JSON.parse(JSON.stringify(gameState)));
    }
  }, [gameState]);
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
