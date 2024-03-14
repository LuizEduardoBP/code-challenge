import React, { useEffect, useState } from 'react';
import { SlArrowDown } from "react-icons/sl";

import { Texts } from '../../infra/constants';

export const Peoples = ({ peoples, atualCommunity, communities, setTurnCheck }) => {
  const [community, setAtualCommunity] = useState('');
  const [loadData, setLoadData] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const [peopleInAtualEvent, setPeopleInAtualEvent] = useState('Loading');
  const [peopleNotCheckin, setPeopleNotCheckin] = useState('Loading');
  const [peopleCheckinByCompany, setPeopleCheckinByCompany] = useState([]);

  const loadAtualCommunity = () => {
    communities.map((options, index) => {
      if (options['name'] == atualCommunity) {
        setAtualCommunity(options['_id']);
      }
    })
    setLoadData(true);
  }

  useEffect(() => {
    loadAtualCommunity();
    loadAtualEvent();
  }, [atualCommunity, communities])

  const hideMenu = () => {
    if (isHide) {
      setIsHide(false);
    } else {
      setIsHide(true);
    }
  }

  const turnCheckEvent = (userId, communityId, isCheckin) => {
    Meteor.call('peoples.updateCommunityId', (error, result) => {
      if (error) {
        console.error('Error when get community id:', error);
      } else {
        setTurnCheck(result);
        setLoadData(true);
        console.log("Deu Bom");
      }
    });

  };

  const loadAtualEvent = () => {
    var cont = 0;
    peoples.map((people, index) => {
      if (people['communityId'] == community) {
        cont++;
      }
    })
    console.log(peoples);
    setPeopleInAtualEvent(cont);
    setPeopleNotCheckin(peoples.length - cont);
    checkinEventCompany();
  };

  const checkinEventCompany = () => {
    var companies = [];
    peoples.map((people) => {
      if (people['companyName'] != undefined) {
        if (people['communityId'] == community) {
          companies.push(people['companyName']);
        }
      }
    })

    const occurrences = {};
    companies.forEach(company => {
      occurrences[company] = (occurrences[company] || 0) + 1;
    });

    const result = [];
    for (let company in occurrences) {
      result.push({ name: company, occurrences: occurrences[company] });
    }

    // result.map((company)=>{

    // })
    setPeopleCheckinByCompany(result);
    console.log(result);
  };

  const returnString = () => {
    var names = '';
    peopleCheckinByCompany.map((company) => {
      names = names + company['name'] + ' (' + company['occurrences'] + ')' + ', ';
    })
    return names;
  }

  return (
    <div className="container mx-auto mt-8">
      <button className="text-2xl font-bold text-cyan-50 text-left" onClick={() => { hideMenu() }}>{'Checkin peoples'}</button>
      <div className='whitespace-normal'/>
      <button className="text-2xl font-bold text-cyan-50 text-left" onClick={() => { hideMenu() }}>{ <SlArrowDown/>}</button>

      <h1 className="text-1xl font-bold text-cyan-50 text-left" hidden={isHide}>{Texts.PEOPLE_EVENT + peopleInAtualEvent}</h1>
      <h1 className="text-1xl font-bold text-cyan-50 text-left" hidden={isHide}>{Texts.PEOPLE_COMPANY + returnString()}</h1>
      <h1 className="text-1xl font-bold mb-5 text-cyan-50 text-left" hidden={isHide}>{Texts.PEOPLE_NOT_CHECKIN + peopleNotCheckin}</h1>

      <ul className='list-none m-0'>
        {peoples.map((people, index) => (

          <li className='bg-slate-600 p-4 mb-1 ml-5 mr-5rounded-lg text-2xl text-start font-bold text-cyan-50' key={index} value={people['firstName']}>
            {people['lastName'] != '-' ? people['firstName'] + ' ' + people['lastName'] : people['firstName']}
            <div className='space'></div>

            {people['title'] != '' ? people['title'] : ''}
            <div className='space'></div>
            {people['companyName'] != '' ? people['companyName'] : ''}

            <li className='text-right'>
              <ul>
                <button className={people['communityId'] == community ? ' bg-red-400 p-1 rounded-lg' : ' bg-green-400 p-1 rounded-lg'} type="button" onClick={() => turnCheckEvent(people['_id'], people['communityId'] == community ? '' : community)}>
                  {people['communityId'] == community ? 'Check out' : 'Check in'}
                </button>
              </ul>
            </li>
          </li>
        ))}
      </ul>
    </div>
  );
};
