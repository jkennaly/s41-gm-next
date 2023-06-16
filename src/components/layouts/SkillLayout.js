import React from 'react';

const SkillsLayout = ({ skills }) => {

    return (
        <div className={`overflow-hidden rounded-xl border w-60 `}>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6 h-12">
                <div className="text-sm font-medium leading-6 text-gray-900">Skills</div>
            </div>
            <div className="p-6">
                {skills?.map((skill, index) => (
                    skill.specialties ?
                    skill.specialties.map((spec, index) => (
                    <div key={index}>
                        <div>{skill.name}[{spec.name}]: {spec.value}</div>
                    </div>)) :
                    <div key={index}>
                        <div>{skill.name}: {skill.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsLayout;
