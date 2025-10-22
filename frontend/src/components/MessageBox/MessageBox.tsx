import { Box, Typography } from "@mui/material";
import { MessagePosition } from "./messagePosition";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  children: string;
  timestamp: React.ReactNode;
  color?: string;
  position: MessagePosition;
  secondaryColor?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const MessageBox = ({
  children,
  color = "#62048eff",
  timestamp,
  position,
  secondaryColor = "#c45df3ff",
  onEdit,
  onDelete,
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
        minHeight: "2rem",
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
        <Typography variant="caption" sx={{ mr: 0.7, color: secondaryColor }}>
          {timestamp}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          display: "flex",
          justifyContent: "space-between",
          m: 0.7,
          width: "2.15rem",
        }}
      >
        <EditIcon
          onClick={onEdit}
          aria-label="Edit message"
          sx={{
            color: secondaryColor,
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        ></EditIcon>
        <DeleteForeverIcon
          onClick={onDelete}
          aria-label="Edit message"
          sx={{
            color: secondaryColor,
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        ></DeleteForeverIcon>
      </Box>
    </Box>
  );
};

export default MessageBox;
