import { probabilizerBasic as p } from '@/utils/gameMethods';
import { useEffect, useState } from 'react';

const basicSkillObject = {
    skill: '',
    characteristic: '',
    specialty: '',
    skillBonus: 0,
    characteristicBonus: 0,
    specialtyBonus: 0,
    otherBonus: 0,
    target: 0,
    selectorSet: false,
  }

function TargetSkillSelector({ skills, target, netModifier, setSelectedSkillset, setSkillObject }) {
    const [selectedSkill, setSelectedSkill] = useState(skills[0]);
    const [specialtyIndex, setSpecialtyIndex] = useState(0);
    useEffect(() => {
        let skillObject = {}
        let skillSet = {...selectedSkill};
        skillObject.skill = selectedSkill.name;
        skillObject.skillBonus = selectedSkill.value;
        skillObject.otherBonus = netModifier;
        skillObject.target = target;
        const specialty = selectedSkill.specialties ? selectedSkill.specialties[specialtyIndex] : undefined;
        if(specialty) { 
            skillSet.specialties = [specialty]
            skillObject.specialty = specialty.name;
            skillObject.specialtyBonus = specialty.value;
        }
        skillObject.selectorSet = true;
        setSkillObject(skillObject);
        setSelectedSkillset(skillSet);
    }, [selectedSkill, specialtyIndex])
    const skillValue = selectedSkill.specialties ? selectedSkill.specialties[specialtyIndex].value : selectedSkill.value;
    const modifier = typeof skillValue === 'number' ? skillValue : -3
    return (
        <>
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
            <select
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 appearance-none hover:border-gray-500 focus:outline-none focus:border-gray-500"
                onChange={(e) => {
                    const skill = skills.find((skill) => skill.name === e.target.value);
                    setSelectedSkill(skill)
                }}
            >
                {/* Each skill option will have a subselector if that skill has specialties */}
                {skills.map((skill) => (
                    <option key={skill.name} value={skill.name}>
                        {skill.name}:
                        {skill.specialties ? `` : skill.value}
                    </option>

                ))}
            </select>
            {selectedSkill.specialties ? <select
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 appearance-none hover:border-gray-500 focus:outline-none focus:border-gray-500"
                onChange={(e) => {
                    const specialtyIndex = selectedSkill.specialties.findIndex((specialty) => specialty.name === e.target.value);
                    setSpecialtyIndex(specialtyIndex)
                }}
            >
                {selectedSkill.specialties.map((specialty) => (
                    <option key={specialty.name} value={specialty.value}>
                        {specialty.name}:
                        {specialty.value || 0}
                    </option>
                ))}
            </select> : `` }
            </div>
            {`${selectedSkill.name}${selectedSkill.specialties ? `[${selectedSkill.specialties[specialtyIndex].name}]` : ``}: `} 
            {`${modifier} at: ${Math.round(p(modifier, target) * 100)}%`}
        </div>
        </>
    );
  }
  export default TargetSkillSelector;