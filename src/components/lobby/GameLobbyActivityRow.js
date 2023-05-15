import React from 'react';
import PropTypes from 'prop-types';
import statuses from './statuses';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const GameLobbyActivityRow = ({ activity, columnOrder }) => {
  const { type, player, message, time } = activity;

  // Function to convert camel case activity types to title case for display
  const toTitleCase = (str) => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  // Status colors based on activity type

  return (
    <tr>
    {columnOrder.map((columnKey) => {
      switch (columnKey) {
        case 'user':
          return (
            <td key={columnKey} className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div className="flex items-center gap-x-4">
                <img src={item.user.imageUrl} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
                <div className="truncate text-sm font-medium leading-6 text-white">{item.user.name}</div>
              </div>
            </td>
          );

        case 'status':
          return (
            <td key={columnKey} className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                  <div className="h-1.5 w-1.5 rounded-full bg-current" />
                </div>
                <div className="hidden text-white sm:block">{item.status}</div>
              </div>
            </td>
          );

        case 'activity':
          return (
            <td key={columnKey} className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
              {item.activity}
            </td>
          );

        case 'dateTime':
          return (
            <td key={columnKey} className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
              <time dateTime={item.dateTime}>{item.date}</time>
            </td>
          );

        default:
          return null;
      }
    })}
  </tr>
  );
};

GameLobbyActivityRow.propTypes = {
    item: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
      status: PropTypes.oneOf(Object.keys(statuses)).isRequired,
      activity: PropTypes.string.isRequired,
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

export default GameLobbyActivityRow;
