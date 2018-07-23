module.exports = function(io) {
  // collaboration sessions
  var collaborations = [];
  // map frpm socketId to sessionId
  var socketIdToSessionId = [];

  io.on('connection', socket => {
    let sessionId = socket.handshake.query['sessionId'];

    socketIdToSessionId[socket.id] = sessionId;

    // add socketId to corresponding collaboration session participants
    if (!(sessionId in collaborations)) {
      collaborations[sessionId] = {
        'participants' : []
      };
    }
  })
}
