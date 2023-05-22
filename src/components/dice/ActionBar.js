function ActionBar({ player, user, room }) {
    console.log('player', player)
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <h2 className="sr-only" id="profile-overview-title">
                Next Player
            </h2>
            {player && <div className="bg-white p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                        <div className="flex-shrink-0">
                            <img className="mx-auto h-20 w-20 rounded-full" src={player.picture} alt="" />
                        </div>
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-sm font-medium text-gray-600">Coming Up Next</p>
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{player.username}</p>
                            <p className="text-sm font-medium text-gray-600">Player ID: {player.id}</p>
                        </div>
                    </div>
                    {/* Render button if user.id matches player.id */}
                    {user.id === player.id && (
                        <div className="mt-5 flex justify-center sm:mt-0">
                            <button
                            onClick={() => room.send('roll_dice')}
                                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Roll Dice!
                            </button>
                        </div>
                    )}
                </div>
            </div>}
        </div>
    );
}

export default ActionBar;
