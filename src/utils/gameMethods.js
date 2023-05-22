export function determineCurrentLeader(gameState) {
    let currentLeader = null;
    let highestRoll = 0;
  
    for (let [playerId, player] of gameState.players.entries()) {
      if (player.roll > highestRoll) {
        highestRoll = player.roll;
        currentLeader = player;
      }
    }
  
    return currentLeader;
  }
  export const getPlayerIds = (gameState) => {
    return Object.values(gameState.players).filter(Boolean).map(player => player.id);
  };
    