import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";
import type { Message } from "../../types/message";

interface SenderFooterProps {
  onSend: (msg: Message) => void;
}

const SenderFooter = ({ onSend }: SenderFooterProps) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState();

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    axios
      .post<Message>("http://localhost:3001/messages", {
        content: trimmed,
        user_id: 1,
      })
      .then((res) => {
        onSend(res.data);
        setMessage("");
      })
      .catch((err) => {
        setError(err.message);
        console.log(error);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        p: 3,
        display: "flex",
        gap: 1,
        bgcolor: "#c7c6c6ff",
        borderRadius: 0,
      }}
    >
      <TextField
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        value={message}
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        size="medium"
        sx={{
          bgcolor: "#dbd9d9ff", // background color
          borderRadius: 2, // outer border radius
          "& .MuiOutlinedInput-root": {
            borderRadius: 2, // border radius for outline
            "& fieldset": {
              borderColor: "#62048eff", // normal border color
            },
            "&:hover fieldset": {
              borderColor: "#62048eff", // border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#62048eff", // border color when focused
              borderWidth: 2, // border width when focused
            },
          },
        }}
      />
      <IconButton
        onClick={sendMessage}
        sx={{ color: "#62048eff" }}
        aria-label="send"
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default SenderFooter;
