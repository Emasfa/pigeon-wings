import { Box, Typography } from "@mui/material";
import { MessagePosition } from "./messagePosition";

interface Props {
  children: string;
  timestamp: React.ReactNode;
  color?: string;
  position: MessagePosition;
  timeColor?: string;
}

const MessageBox = ({
  children,
  color = "#62048eff",
  timestamp,
  position,
  timeColor = "#c45df3ff",
}: Props) => {
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
        maxWidth: 0.5,
        alignSelf: position === MessagePosition.Left ? "start" : "end",
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
        }}
      >
        <Typography variant="caption" sx={{ mr: 0.7, color: timeColor }}>
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBox;
