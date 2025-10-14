import { Alert, AppBar, Box, Grid } from "@mui/material";
import { Bird } from "lucide-react";
import MessageBox from "./components/MessageBox";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  interface Message {
    id: number;
    content: string;
    timestamp: string;
  }

  useEffect(() => {
    axios
      .get<Message[]>("http://localhost:3001/messages")
      .then((res) => {
        setMessages(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <AppBar component="nav" sx={{ bgcolor: "#767676ff" }}>
          <Box display="flex" alignItems="center">
            <Bird size={60} color="#62048eff" strokeWidth={0.9} />
            <p color="black">PIGEON WINGS</p>
          </Box>
        </AppBar>
        <Grid size={10}>
          {error !== "" && <Alert severity="error">{error}</Alert>}
          {messages.map((msg: Message) => (
            <MessageBox key={msg.id} timestamp={msg.timestamp}>
              {msg.content}
            </MessageBox>
          ))}

          <MessageBox timestamp={"15:10"}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga,
            error.
          </MessageBox>
          <MessageBox timestamp={"15:13"}>Text 1</MessageBox>
          <MessageBox timestamp={"15:14"}>One more dummy message</MessageBox>
        </Grid>
        <Grid size={12}>FOOTER</Grid>
      </Grid>
    </>
  );
}

export default App;
