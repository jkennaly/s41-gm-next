import React from 'react';

const attr = {
    strength: 'Strength',
    dexterity: 'Dexterity',
    endurance: 'Endurance',
    intelligence: 'Intelligence',
    education: 'Education',
    socialStanding: 'Social Standing',
}

const CCLayout = ({ chars }) => {

    return (
        <div className={`overflow-hidden rounded-xl border w-60 `}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-12">
                <div className="text-sm font-medium leading-6 text-gray-900">Core Characteristics</div>
            </div>
            <div className="p-6">
                {Object.entries(chars)
                    .filter(([name, value]) => attr[name])
                    .map(([name, value], index) => (
                    <div key={index}>
                        <div>{attr[name]}: {value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CCLayout;
