import { initSockets } from "./sockets";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const nickname = localStorage.getItem(NICKNAME);

const logIn = (nickname) => {
  // eslint-disable-next-line no-undef
  const socket = io("/");
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value: nickname } = input;
  input.value = "";
  if (nickname === "Bot") {
    let div = document.createElement("div");
    div.classList.add("loginAlarm");
    div.innerText = "This name cannot be entered. Please use a different name.";
    body.appendChild(div);
    setTimeout(() => div.remove(), 1000);
  } else {
    localStorage.setItem(NICKNAME, { nickname });
    body.className = LOGGED_IN;
    logIn(nickname);
  }
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
