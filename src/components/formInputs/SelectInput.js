import React from 'react';
import PropTypes from 'prop-types';

const toTitleCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toUpperCase() : word.toLowerCase();
  }).replace(/\s+/g, ' ');
}

const SelectInput = ({ name, label, description, options, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <select id={name} name={name} required={required} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        {options.map((option, index) => (
          <option value={option} key={index}>
            {toTitleCase(option)}
          </option>
        ))}
      </select>
    </div>
    <p className="mt-2 text-sm text-gray-500">
      {description}
    </p>
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};

export { SelectInput}
