import { Alert, AppBar, Box, Grid, Typography } from "@mui/material";
import { Bird } from "lucide-react";
import MessageBox from "./components/MessageBox";
import { useState, useEffect } from "react";
import axios from "axios";

import { formatTime } from "./utils/formatTime";
import Footer from "./components/Footer/Footer";

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
        <AppBar component="nav" sx={{ bgcolor: "#e1e1e1ff" }}>
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

          <MessageBox timestamp={"00:00"}>This is a static message.</MessageBox>
        </Grid>
        <Grid size={12}>
          <Footer></Footer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
