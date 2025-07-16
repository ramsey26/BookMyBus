import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useBuses } from "../../lib/hooks/useBuses"
import Navbar from "./Navbar";
import BusDashboard from "../../features/Buses/dashboard/BusDashboard";

function App() {
  const { buses, isPending } = useBuses();

  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          {!buses || isPending ? (
            <Typography>Loading...</Typography>
          ) : (
            <BusDashboard />
          )}
        </Container>
      </Box>
    </>
  )
}

export default App
