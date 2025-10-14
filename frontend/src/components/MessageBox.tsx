import { Box } from "@mui/material";

interface Props {
  children: string;
  color?: string;
}

const MessageBox = ({ children, color = "#62048eff" }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: "6px",
        padding: "10px",
        marginY: "1.5rem",
        bgcolor: color,
      }}
    >
      {children}
    </Box>
  );
};

export default MessageBox;
