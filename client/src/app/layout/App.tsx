import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useBuses } from "../../lib/hooks/useBuses"
import Navbar from "./Navbar";
import BusDashboard from "../../features/Buses/dashboard/BusDashboard";
import SearchBar from "./SearchBar";

function App() {
  const { isPending } = useBuses();

  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
        <CssBaseline />
        <Navbar />
        {/* SearchBar (directly below Navbar) */}
        <Box
          sx={{
            width: '100%',
            bgcolor: '#f5f5f5',
            boxShadow: 1,
            py: 0,
            px: 2,
          }}
        >
          <SearchBar />
        </Box>
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          {isPending ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <BusDashboard />
            </>
          )}
        </Container>
      </Box>
    </>
  )
}

export default App
