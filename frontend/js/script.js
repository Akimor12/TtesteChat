const login = document.querySelector(".login");
const loginForm = login.querySelector(".login_form");
const loginInput = login.querySelector(".login_input");

const chat = document.querySelector(".chat");
const chat_form = chat.querySelector(".chat_form");
const chat_input = chat.querySelector(".chat_input");



const colors = [
  "gold",
  "cadetblue",
  "darkkhaki",
  "hotpink"
];

const user = { id: "", name: "", color: "" };

let websocket;

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const handleSubmit = (event) => {
  event.preventDefault();

  user.id = crypto.randomUUID();
  user.name = loginInput.value;
  user.color = getRandomColor();
  console.log(user);

  login.style.display = "none";
  chat.style.display = "flex";

  websocket = new WebSocket("ws://localhost:8080");

  websocket.onopen = () => {
    console.log("WebSocket is connected.");
    // Send user data to the server if needed
    websocket.send(JSON.stringify(user));
  };

  websocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  websocket.onclose = () => {
    console.log("WebSocket is closed.");
  };

  websocket.onmessage = (message) => {
    console.log("Message from server:", message.data);
    // Handle incoming messages from the server
  };
};

loginForm.addEventListener("submit", handleSubmit);



