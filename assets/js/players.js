const board = document.getElementById("jsPlayerBoard");

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

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
