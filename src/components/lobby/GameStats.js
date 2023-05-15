import React from 'react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const GameStats = ({ stats }) => (
  <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat, statIdx) => (
      <div
        key={stat.name}
        className={classNames(
          statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
          'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'
        )}
      >
        <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
        <p className="mt-2 flex items-baseline gap-x-2">
          <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
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
