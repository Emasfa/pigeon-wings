import { Alert, AppBar, Box, Grid, Typography } from "@mui/material";
import { Bird } from "lucide-react";
import MessageBox from "./components/MessageBox";
import { useState, useEffect } from "react";
import axios from "axios";

import { formatTime } from "./utils/formatTime";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  interface Message {
    id: number;
    content: string;
    created_at: string;
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
          <Box display="flex" alignItems="center" gap={2} sx={{ padding: 0.5 }}>
            <Bird size={60} color="#62048eff" strokeWidth={1.5} />
            <Typography
              sx={{
                fontFamily: '"Bungee", sans-serif',
              }}
              variant="h3"
              color="#62048eff"
            >
              Pigeon Wings
            </Typography>
          </Box>
        </AppBar>
        <Grid size={10}>
          {error !== "" && <Alert severity="error">{error}</Alert>}
          {messages.map((msg: Message) => (
            <MessageBox key={msg.id} timestamp={formatTime(msg.created_at)}>
              {msg.content}
            </MessageBox>
          ))}

          <MessageBox timestamp={"00:00"}>That's a static message.</MessageBox>
        </Grid>
        <Grid size={12}>
          <Box sx={{ bgcolor: "#767676ff" }}> Footer</Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
