


const events = [
    {
        roll: 2,
        title: `Psionic Potential`,
        description: `You are approached by an underground psionic organization who sense potential.`,
        interactive: true,
        effects: [
            'option::Do you want to test for Psionics?::testPSI::nothing'
        ]
    },
    {
        roll: 3,
        title: `Tragedy Strikes`,
        description: `You suffer a terrible tragedy and fail to graduate.`,
        interactive: false,
        effects: [
            'failTerm'
        ]
    },
    {
        roll: 4,
        title: `Prank Gone Wrong`,
        description: `A prank goes wrong and someone gets seriously hurt, physically or emotionally`,
        promptFill: `they seriously hurt someone ina prnak gone wrong`,
        interactive: true,
        effects: [
            'SOC8::gainRival::gainEnemy::on2::failTerm,gotoJail'
        ]
    },
    {
        roll: 5,
        completes: true,
        title: `Party Hard`,
        description: `You party hard at school.`,
        interactive: false,
        effects: [
            'skillGain::Carouse=1'
        ]
    },
    {
        roll: 6,
        completes: false,
        title: `You Make Friends`,
        description: `You make friends for life.`,
        promptFill: `they made friends for life`,
        interactive: true,
        effects: [
            'gainAllies::1D3'
        ]
    },
    {
        roll: 7,
        completes: true,
        title: `Major Life Event`,
        description: `Life Event`,
        promptFill: `they had a major life event`,
        interactive: true,
        effects: [
            'lifeEvent'
        ]
    },
    {
        roll: 8,
        completes: true,
        title: `Political Movement`,
        description: `You join a political movement.`,
        promptFill: `they join a political movement`,
        interactive: true,
        effects: [
            'SOC8::becomeLeader::nothing',
            'gainAlly',
            'gainEnemy'
        ]
    },
    {
        roll: 9,
        completes: true,
        title: `Hobby`,
        description: `You develop a hobby.`,
        interactive: true,
        effects: [
            'skillGain::any::0'
        ]
    },
    {
        roll: 10,
        title: `Dangerous Minds`,
        description: `You learn from a tutor you hate.`,
        promptFill: `they learn from a tutor they hate`,
        interactive: true,
        effects: [
            'rollAnySkill9::gainSkill+1,gainRival::nothing'
        ]
    },
    {
        roll: 11,
        completes: true,
        title: `War`,
        description: `War comes and the draft comes for you.`,
        interactive: true,
        effects: [
            'SOC9::nothing::warDraft::drifter'
        ]
    },
    {
        roll: 12,
        completes: true,
        title: `Recognition`,
        description: `You are recognized for your accomplishments.`,
        interactive: false,
        effects: [
            'charGain::SOC::1'
        ]
    },

]

export default events;