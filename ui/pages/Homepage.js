import React from 'react';
import { Texts } from '../../infra/constants';
import { Selector } from '../components/Selector';
import { Peoples } from '../components/Peoples';

export const HomePage = ({options, onSelect}) => {
    return (<div className='text-center'>
        <h1 className="text-3xl font-bold mb-4 text-cyan-50">{Texts.HOME_TITLE}</h1>
        <div className='space'></div>
        <Selector options={options} onSelect={onSelect} />
        {/* <Peoples/> */}
    </div>)
}