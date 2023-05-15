import React from 'react';
import PropTypes from 'prop-types';
import GameLobbyActivityRow from './GameLobbyActivityRow';

const ActivityTable = ({ activityItems }) => {
  // Ensure there are items and extract column keys from the first item
  const columnKeys = activityItems.length > 0 ? Object.keys(activityItems[0]) : [];

  return (
    <div className="border-t border-white/10 pt-11">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest activity</h2>
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            {columnKeys.map((key) => (
              <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8" key={key}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {activityItems.map((item) => (
            <GameLobbyActivityRow key={item.id} item={item} columnOrder={columnKeys} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ActivityTable.propTypes = {
  activityItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActivityTable;
