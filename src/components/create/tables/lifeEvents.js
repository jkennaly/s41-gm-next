


const events = [
    {
        roll: 2,
        title: `Sickness or Injury`,
        description: `You are injured or become sick.`,
        promptFill: `they become injured or sick`,
        interactive: true,
        effects: [
            'injuryEvent'
        ]
    },
    {
        roll: 3,
        title: `Birth or Death`,
        description: `Someone close to you dies or is born.`,
        interactive: false,
        effects: [
        ]
    },
    {
        roll: 4,
        title: `Ending of Relationship`,
        description: `A romantic relationship ends. Badly.`,
        promptFill: `they end a romantic relationship, badly`,
        interactive: true,
        effects: [
            'option::Gain a rival or an enemy::gainRival::gainEnemy'
        ]
    },
    {
        roll: 5,
        title: `Improved Relationship`,
        promptFill: `they improve a romantic relationship`,
        description: `A romantic relationship improves, possibly leading to marriage or another form of commitment.`,
        interactive: true,
        effects: [
            'gainAlly',
        ]
    },
    {
        roll: 6,
        title: `New Relationship`,
        promptFill: `they start a new romantic relationship`,
        description: `You meet someone new.`,
        interactive: true,
        effects: [
            'gainAlly',
        ]
    },
    {
        roll: 7,
        title: `New Contact`,
        promptFill: `they gain a new contact`,
        description: `You gain a new contact.`,
        interactive: true,
        effects: [
            'gainContact',
        ]
    },
    {
        roll: 8,
        title: `Betrayal`,
        promptFill: `they are betrayed by a friend or lover`,
        description: `You are betrayed by a friend or lover.`,
        interactive: true,
        effects: [
            'convertAssoc::contact,ally::enemy,rival'
        ]
    },
    {
        roll: 9,
        title: `Travel`,
        description: `You move to another world.`,
        interactive: false,
        effects: [
            'nextCareerEntry+2'
        ]
    },
    {
        roll: 10,
        title: `Good Fortune`,
        description: `Something good happens to you`,
        interactive: false,
        effects: [
            'benefit+2'
        ]
    },
    {
        roll: 11,
        title: `Crime`,
        description: `You commit a crime or become a victim of one.`,
        interactive: true,
        effects: [
            'option::Choose to commit a crime or become a victim::loseBenefitRoll::gotoJail'
        ]
    },
    {
        roll: 12,
        title: `Unusual Event`,
        description: `You experience an unusual event.`,
        interactive: true,
        effects: [
            'unusualEvent'
        ]
    },

]

export default events;