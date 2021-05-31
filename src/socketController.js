import events from "./events";

let sockets = [];

const val = () => {
  let random = Math.floor(Math.random() * 16);
  switch (random) {
    case 10:
      random = "a";
      break;
    case 11:
      random = "b";
      break;
    case 12:
      random = "c";
      break;
    case 13:
      random = "d";
      break;
    case 14:
      random = "e";
      break;
    case 15:
      random = "f";
      break;
  }
  return random;
};

const randomColor = () => {
  const color = `#${val()}${val()}${val()}`;
  return color;
};

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () => {
    return superBroadcast(events.playerUpdate, { sockets });
  };
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    socket.userColor = randomColor();
    socket.playerNum = localStorage.getItem("pn");
    sockets.push({
      id: socket.id,
      score: 0,
      nickname: nickname,
      pn: socket.playerNum,
    });
    broadcast(events.newUser, { nickname });
    sendPlayerUpdate();
  });
  socket.on(events.disconnect, () => {
    sockets = sockets.filter((aSocket) => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });
  socket.on(events.sendMsg, ({ message }) => {
    broadcast(events.newMsg, {
      message,
      nickname: socket.nickname,
      color: socket.userColor,
    });
  });
  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );
  socket.on(events.strokePath, ({ x, y, color, lineWidth }) =>
    broadcast(events.strokedPath, { x, y, color, lineWidth })
  );
  socket.on(events.fill, ({ color }) => broadcast(events.filled, { color }));
};

export default socketController;
