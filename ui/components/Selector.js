import React from 'react';
import { Texts } from '../../infra/constants';

export const Selector = ({ options, onSelect }) => {
    const handleChange = (event) => {
    const selectedOption = event.target.value;
    onSelect(selectedOption);
  };

  return (
    <div className="selector mt-10">
      <label htmlFor="selector" className='text-2xl font-bold mb-4 text-cyan-50'>{Texts.SELECTOR_TITLE}</label>
      <p/>
      <select id="selector" onChange={handleChange} className='bg-slate-600 rounded-lg p-4 text-1xl'>
        {options.map((option, index) => (
          <option key={index} value={option['name']}>
            {option['name']}
          </option>
        ))}
      </select>
    </div>
  );
};