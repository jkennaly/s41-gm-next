


const events = [
    {
        roll: 1,
        title: `Nearly killed`,
        description: `You are nearly killed.`,
        interactive: true,
        effects: [
            'losePhysical::1D',
            'losePhysical::2',
            'losePhysical::2',
        ]
    },
    {
        roll: 2,
        title: `Severely injured`,
        description: `You are severely injured.`,
        interactive: true,
        effects: [
            'losePhysical::1D',
        ]
    },
    {
        roll: 3,
        title: `Missing Eye or Limb`,
        description: `You lose an eye or a limb.`,
        interactive: true,
        effects: [
            `option::Lose 2 STR or DEX::loseStr2::loseDex2`,
        ]
    },
    {
        roll: 4,
        title: `Scarred`,
        description: `You are scarred.`,
        interactive: true,
        effects: [
            'losePhysical::2',
        ]
    },
    {
        roll: 5,
        title: `Injured`,
        description: `You are injured.`,
        interactive: true,
        effects: [
            'losePhysical::1',
        ]
    },
    {
        roll: 6,
        title: `Lightly Injured`,
        description: `You are lightly injured.`,
        interactive: false,
        effects: [
        ]
    },

]

export default events;