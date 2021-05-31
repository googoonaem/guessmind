import { getSocket } from "./sockets";

const board = document.getElementById("jsPlayerBoard");

const addPlayers = (players) => {
  board.querySelector("ul").remove();
  const ul = document.createElement("ul");
  players = players.filter((aSocket) => aSocket.pn !== getSocket().pn);
  players.forEach((player) => {
    const li = document.createElement("li");
    li.innerText = `${player.nickname} : ${player.score}점`;
    ul.appendChild(li);
  });
  board.appendChild(ul);
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
