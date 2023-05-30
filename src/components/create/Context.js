import React from 'react';
import Game from '@/components/context/Game';

const Context = ({ gameId }) => {
  // Fetch game data from your API, use hardcoded data for now
  const game = {
    name: 'Game Title',
    description: 'Game Description',
    universe: {
      name: 'Universe Name',
      description: 'Universe Description',
    },
  };

  return <Game game={game} />;
};

export default Context;
