import React, { useEffect, useState } from 'react';
import { Texts } from '../infra/constants';
import { Selector } from './components/Selector';
import { Peoples } from './components/Peoples';

export const App = () => {
  const [communities, setCommunities] = useState([]);
  const [peoples, setPeoples] = useState([]);
  const [atualCommunity, setAtualCommunity] = useState('Challenge');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [peoplesLoaded, setPeoplesLoaded] = useState(false);
  const [turnCheckEvent, setTurnCheckEvent] = useState(false);


  // Load Communities from database with error validation 
  const loadCommunities = () => {
    Meteor.call('communities.getAll', (error, result) => {
      if (error) {
        console.error('Error when get communities:', error);
      } else {
        setCommunities(result);
        setDataLoaded(true);
      }
    });
  };

  const loadPeoples = () => {
    Meteor.call('peoples.getAll', (error, result) => {
      if (error) {
        console.error('Error when get peoples');
      } else {
        setPeoples(result);
        setPeoplesLoaded(true);
        console.log(peoples[0]['firstName'] + " " + peoples[0]['lastName'] + '----' + peoples[0]['CommunityId']);
      }
    })
  }

  useEffect(() => {
    if (!dataLoaded) {
      loadCommunities();
      loadPeoples();
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (!peoplesLoaded) {
      loadPeoples();
      loadCommunities();

    }
  }, [peoplesLoaded, turnCheckEvent]);

  const handleOptionSelect = (option) => {
    setAtualCommunity(option);
  };

  return (<div className='text-center'>
    <h1 className="text-3xl font-bold mb-4 text-cyan-50">{Texts.HOME_TITLE}</h1>
    <div className='space'></div>
    <Selector options={communities} onSelect={handleOptionSelect} />
    <Peoples peoples={peoples} atualCommunity={atualCommunity} communities={communities} setTurnCheck={setTurnCheckEvent}/>
  </div>)
}