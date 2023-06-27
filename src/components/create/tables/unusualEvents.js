


const events = [
    {
        roll: 1,
        title: `Psionics`,
        description: `You are approached by an underground psionic organization who sense potential.`,
        interactive: true,
        effects: [
            'option::Do you want to test for Psionics?::testPSI::nothing'
        ]
    },
    {
        roll: 2,
        title: `Aliens`,
        promptFill: `they spent time among aliens`,
        description: `You spend time among aliens.`,
        interactive: true,
        effects: [
            'gainContact',
            'skillGain::Science::1'
        ]
    },
    {
        roll: 3,
        title: `Alien Artefact`,
        description: `You find a strange alien artefact.`,
        interactive: false,
        effects: [
        ]
    },
    {
        roll: 4,
        title: `Amnesia`,
        description: `Something happened to you, but you don't remember what.`,
        interactive: false,
        effects: [
        ]
    },
    {
        roll: 5,
        title: `Government Contact`,
        description: `You have an encounter with the upper echelons of the government, such as the Emperor or Imperial Intelligence.`,
        interactive: false,
        effects: [
        ]
    },
    {
        roll: 6,
        title: `Ancient Technology`,
        promptFill: `they encountered ancient technology`,
        description: `You encounter technology from before the Imperium.`,
        interactive: true,
        effects: [
            'gainAlly',
        ]
    },

]

export default events;