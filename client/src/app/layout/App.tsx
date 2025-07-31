import { Box, Container, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { Outlet, useLocation } from "react-router";

function App() {
  const location = useLocation();
  const showSearchBar = location.pathname.startsWith('/buses');

  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
        <CssBaseline />
        <Navbar />
        {showSearchBar && (
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
        )}
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  )
}

export default App
