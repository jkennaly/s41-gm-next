export const menuItems = [
    { name: 'View', route: '/game', description: 'View game details', flags: [] },
    { name: 'Schedule Session', route: '/schedule', description: 'Schedule a new session', flags: ['gm'] },
    { name: 'Cancel Session', route: '/cancel', description: 'Cancel a session', flags: ['gm'] },
    { name: 'Complete Game', route: '/complete', description: 'Complete the game', flags: ['gm'] },
    { name: 'Join Game', route: '/join', description: 'Join the game', flags: ['~player', '~gm'] },
    { name: 'Leave Game', route: '/leave', description: 'Leave the game', flags: ['player'] },
  ]
  