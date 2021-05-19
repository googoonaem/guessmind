const body = document.querySelector("body");

const fireNotification = (text) => {
  const noti = document.createElement("div");
  noti.innerText = text;
  setTimeout(() => noti.remove(), 2000);
  body.appendChild(noti);
};

export const handleNewUser = ({ nickname }) => {
  fireNotification(`${nickname} just joined!`);
};

export const handleDisconnected = ({ nickname }) => {
  fireNotification(`${nickname} just disconnected!`);
};
