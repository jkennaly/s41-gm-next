import React, { useEffect, useState } from 'react';
import preCareerEventList from '../../tables/preEvents';
import EffectBlock from './EffectBlock';

const eventHeaders = {
    'preCareerEvent': 'Pre-Career Event',
}

const EventBlock = ({ eventType, number, setBasicEvent, character }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const skills = character?.skills[0]?.skills;
    
    useEffect(() => {
        if (eventType === 'preCareerEvent') {
            console.log('preCareerEventList', preCareerEventList);
            const event = preCareerEventList.find((event) => event.roll === number);
            setSelectedEvent(event);
            setBasicEvent(event);
        }
    }, [eventType, number]);

  return (
    <div 
      className={`bg-yellow-400 flex flex-col justify-between items-center border-2 border-gray-300 hover:border-indigo-500 p-2 m-2 rounded`}

    >
        { selectedEvent && <>
      <span className="text-xl mr-4">{eventHeaders[eventType]}</span>
      <div className="flex">
        {selectedEvent.description}
      </div>
      <div className="flex flex-col">
        {selectedEvent.effects.map((effect, index) => {
            return (
                <EffectBlock key={index} effect={effect} skills={skills} />
            );
        })}
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Notes
            <textarea className="border-2 border-gray-500 rounded h-20 px-2 mx-1" />
        </label>
      </div>
      </>}
    </div>
  );
};

export default EventBlock;
