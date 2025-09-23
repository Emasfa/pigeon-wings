import "./App.css";
import { List } from "@mui/material";
import logo from "./assets/logo.png";

function App() {
  fetch("/api/messages")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  const messages = [
    "Hello world!",
    "Second message.",
    "test, test",
    "And another one",
  ];

  return (
    <>
      <div className="title">
        <h1>Pigeon Wings</h1>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <List
        sx={{
          bgcolor: "#fca368",
          paddingLeft: "1rem",
          color: "black",
          borderRadius: "5px",
        }}
      >
        {messages.map((message) => (
          <p>{message}</p>
        ))}
      </List>
    </>
  );
}

export default App;
