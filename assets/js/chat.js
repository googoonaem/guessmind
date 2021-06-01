import { getSocket } from "./sockets";

const sendMsg = document.getElementById("jsSendMsg");
const messages = document.getElementById("jsMessages");
const chats = document.getElementById("jsChat");

const appendMsg = (text, nickname, color = null) => {
  if (nickname === "Bot") {
    const div = document.createElement("div");
    div.classList.add("Bot");
    div.innerText = text;
    chats.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 1500);
  }
  const li = document.createElement("li");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  span1.innerText = `${nickname ? nickname : "You"} : `;
  if (color !== null) span1.style.color = color;
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

export const disableChat = () => (sendMsg.style.display = "none");

export const enableChat = () => (sendMsg.style.display = "block");

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
