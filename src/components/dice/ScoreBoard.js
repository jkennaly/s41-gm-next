function ScoreBoard({ player, scores }) {
    console.log('Scorebaord player:', player);
    return (
        <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Player Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img className="mx-auto h-20 w-20 rounded-full" src={player.picture} alt="" />
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">Current Leader</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{player.username}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {scores.filter(Boolean).map((score) => (
            <div key={score.label} className="px-6 py-5 text-center text-sm font-medium">
              <span className="text-gray-900">{score.value}</span> <span className="text-gray-600">{score.label}</span>
            </div>
          ))}
        </div>
      </div>
  </>
    );
  }
  export default ScoreBoard;
  