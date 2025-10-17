import { Box, Typography } from "@mui/material";

interface Props {
  children: string;
  timestamp: React.ReactNode;
  color?: string;
}

const MessageBox = ({ children, color = "#62048eff", timestamp }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "fit-content",
        borderRadius: "6px",
        padding: "10px",
        marginY: "0.8rem",
        pr: 8,
        bgcolor: color,
      }}
    >
      <Typography variant="body1">{children}</Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: 1,
          right: 1,
          display: "flex",
          alignItems: "center",
          color: "#c45df3ff",
        }}
      >
        <Typography variant="caption" sx={{ mr: 0.7 }}>
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBox;
