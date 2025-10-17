import { Alert, AppBar, Box, Grid, Typography } from "@mui/material";
import { Bird } from "lucide-react";
import MessageBox from "./components/MessageBox";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { formatTime } from "./utils/formatTime";
import SenderFooter from "./components/Footer/SenderFooter";
import type { Message } from "./types/message";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar
        component="nav"
        position="static"
        sx={{ bgcolor: "#c7c6c6ff", top: 0 }}
      >
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
      <Box flexGrow={1} overflow="auto" px={2} pb={2}>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {messages.map((msg: Message) => (
          <MessageBox key={msg.id} timestamp={formatTime(msg.created_at)}>
            {msg.content}
          </MessageBox>
        ))}
        <div ref={bottomRef} />
      </Box>
      <SenderFooter
        onSend={(newMessage: Message) => {
          setMessages((prev) => [...prev, newMessage]);
        }}
      ></SenderFooter>
    </Box>
  );
}

export default App;
