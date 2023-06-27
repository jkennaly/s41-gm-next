export const moveRoom = ({ roomId, game, room, type, msg }) => async (event) => {
    // Here we're assuming you have some kind of `room` object you can use to send messages.
    // You'll need to replace this with whatever you're using to interact with your Colyseus room.
    console.log('moveRoom', roomId, game, room, type, msg)
    
    const resp = room.send(msg, { roomId });
    console.log('moveRoom resp', resp)
}

export const rollMgt2eChargen = ({ roomId, game, room, type, msg }) => {
    // Here we're assuming you have some kind of `room` object you can use to send messages.
    // You'll need to replace this with whatever you're using to interact with your Colyseus room.
    console.log('rollMgt2eChargen', roomId, game, room, type, msg)
    
    const resp = room.send(msg, { roomId });
    console.log('rollMgt2eChargen resp', resp)
}

export const rollEnterMessage = ({ roomId, room, msg, options }) => {
    console.log('rollEnterMessage', roomId, msg)
    return room.send(msg, { roomId, options });
}
