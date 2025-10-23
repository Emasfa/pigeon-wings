import { Alert, AppBar, Box, Stack, Typography } from "@mui/material";
import { Bird } from "lucide-react";
import MessageBox from "./components/MessageBox/MessageBox";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { formatTime } from "./utils/formatTime";
import SenderFooter from "./components/Footer/SenderFooter";
import type { Message } from "./types/message";
import { MessagePosition } from "./components/MessageBox/messagePosition";

const LOGGED_USER_ID = 1;
const OTHER_USER_ID = 2;

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  console.log(messages);
  useEffect(() => {
    axios
      .get<Message[]>("http://localhost:3001/messages", {
        params: { user_1_id: LOGGED_USER_ID, user_2_id: OTHER_USER_ID },
      })
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

  const deleteMessage = (msg: Message) => {
    const originalMessages = [...messages];
    setMessages(messages.filter((m) => m.id !== msg.id));

    axios.delete("http://localhost:3001/messages/" + msg.id).catch((err) => {
      console.log(err);
      setError(err.message);
      setMessages(originalMessages);
    });
  };

  const editMessage = (msg: Message, newContent: string) => {
    const originalMessages = [...messages];

    setMessages(
      messages.map((m) => (m.id === msg.id ? { ...m, content: newContent } : m))
    );

    axios
      .patch("http://localhost:3001/messages/" + msg.id, {
        content: newContent,
      })
      .then((res) =>
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? res.data : m)))
      )
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setMessages(originalMessages);
      });
  };

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
      <Stack
        flexGrow={1}
        overflow="auto"
        px={2}
        pb={2}
        sx={{ scrollBehavior: "smooth" }}
      >
        {error !== "" && <Alert severity="error">{error}</Alert>}
        {messages.map((msg) => (
          <MessageBox
            onEdit={() => {
              const newContent = prompt("Edit message:", msg.content);
              if (
                newContent &&
                newContent.trim() !== "" &&
                newContent !== msg.content
              ) {
                editMessage(msg, newContent);
              }
            }}
            onDelete={() => deleteMessage(msg)}
            position={
              msg.from_user_id === LOGGED_USER_ID
                ? MessagePosition.Left
                : MessagePosition.Right
            }
            key={msg.id}
            timestamp={formatTime(msg.created_at)}
            color={msg.from_user_id === OTHER_USER_ID ? "#54425d" : "#62048eff"}
            secondaryColor={
              msg.from_user_id === OTHER_USER_ID ? "#d68af8" : "#c45df3ff"
            }
          >
            {msg.content}
          </MessageBox>
        ))}
        <div ref={bottomRef} />
      </Stack>
      <SenderFooter
        onSend={(newMessage) => {
          setMessages((prev) => [...prev, newMessage]);
        }}
      ></SenderFooter>
    </Box>
  );
}

export default App;
