import { disableChat } from "./chat";
import {
  disableCanvas,
  enableCanvas,
  hideControls,
  resetCanvas,
  showControls,
} from "./painter";

const board = document.getElementById("jsPlayerBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = (players) => {
  board.querySelector("ul").remove();
  const ul = document.createElement("ul");
  players.forEach((player) => {
    const li = document.createElement("li");
    li.innerText = `${player.nickname} : ${player.score}점`;
    ul.appendChild(li);
  });
  board.appendChild(ul);
};

const setnotifs = (text) => {
  notifs.innerText = "";
  if (text !== null) notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  disableCanvas();
  hideControls();
};
export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  setnotifs(`Your turn, the word is : ${word}. draw it!`);
  disableChat();
};
export const handleGameEnded = () => {
  setnotifs("Game Ended");
  disableCanvas();
  hideControls();
  resetCanvas();
};
export const handleGameStarting = () => {
  let timing = 3;
  let startingTime = setInterval(() => {
    setnotifs(`Game will starting in ${timing} seconds...`);
    timing -= 1;
    if (timing === 0) {
      clearInterval(startingTime);
    }
  }, 1000);
};
