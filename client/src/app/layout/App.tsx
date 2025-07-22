import { Box, Container, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { Outlet } from "react-router";

function App() {
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
          <Outlet />
        </Container>
      </Box>
    </>
  )
}

export default App
