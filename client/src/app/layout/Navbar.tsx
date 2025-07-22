import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { Link } from "react-router";
import MenuItemLink from "../../features/Common/MenuItemLink";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={Link}
                to="/" sx={{ display: 'flex', gap: 2 }}>
                <DirectionsBusIcon fontSize="large" color="primary" />
                <Typography variant="h4" fontWeight='bold'>BookMyBus</Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuItemLink to='/buses' >
                Search Buses
              </MenuItemLink>
              <MenuItemLink to='/bookings' >
                Bookings
              </MenuItemLink>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
