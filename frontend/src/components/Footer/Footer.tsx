import { IconButton, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Footer = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
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
      <IconButton sx={{ color: "#62048eff" }} aria-label="send">
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default Footer;
