import React from 'react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}  

// Function to convert camel case activity types to title case for display
const toTitleCase = (str) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

function isValidDateTime(dateTimeString) {
  const isoDateTimeRegex = /^(\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?|\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?)$/;
  return isoDateTimeRegex.test(dateTimeString);
}

const GameStats = ({ stats }) => (
  <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
  {stats
    .filter(s => !['id', 'gmId', 'status', 'name'].includes(s.name))
    .map((stat, statIdx) => (
      <div
        key={stat.name}
        className={classNames(
          statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
          'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'
        )}
      >
        <p className="text-sm font-medium leading-6 text-gray-400">
          {/\s/.test(stat.name) ? stat.name : toTitleCase(stat.name)}
        </p>
        <p className="mt-2 flex items-baseline gap-x-2">
          {isValidDateTime(stat.value) ? (
            <span className="text-4xl font-semibold tracking-tight text-white">
              {(new Date(stat.value)).toLocaleString()}
            </span>
          ) : (
            <span className="text-4xl font-semibold tracking-tight text-white">
              {stat.value}
            </span>
          )}
          {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
        </p>
      </div>
  ))}
</div>

);

GameStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      unit: PropTypes.string,
    })
  ).isRequired,
};

export default GameStats;
