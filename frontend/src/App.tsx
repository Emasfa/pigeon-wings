import { AppBar, Box, Grid } from "@mui/material";
import { Bird } from "lucide-react";
import MessageBox from "./components/MessageBox";

function App() {
  return (
    <>
      <Grid container spacing={2}>
        <AppBar component="nav" sx={{ bgcolor: "#767676ff" }}>
          <Box display="flex" alignItems="center">
            <Bird size={60} color="#62048eff" strokeWidth={0.9} />
            <p color="black">PIGEON WINGS</p>
          </Box>
        </AppBar>
        <Grid size={10}>
          <MessageBox>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga,
            error.
          </MessageBox>
          <MessageBox>Text 1</MessageBox>
          <MessageBox>Hello World !</MessageBox>
        </Grid>
        <Grid size={12}>FOOTER</Grid>
      </Grid>
    </>
  );
}

export default App;
