import { getSocket } from "./sockets";

const sendMsg = document.getElementById("jsSendMsg");
const messages = document.getElementById("jsMessages");

const appendMsg = (text, nickname, color) => {
  const li = document.createElement("li");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  span1.innerText = `${nickname ? nickname : "You"} : `;
  span1.style.color = color;
  span2.classList.add("author");
  if (nickname) {
    span2.classList.add("out");
  } else {
    span2.classList.add("self");
  }
  span2.innerText = text;
  li.appendChild(span1);
  li.appendChild(span2);
  messages.appendChild(li);
};

const handleSendMsg = (event) => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, { message: value });
  input.value = "";
  appendMsg(value);
};

export const handleNewMessage = ({ message, nickname, color }) =>
  appendMsg(message, nickname, color);

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
