import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { Link, useLocation } from "react-router";
import MenuItemLink from "../../features/Common/MenuItemLink";
import UserMenu from "./UserMenu";
import { useAccount } from "../../lib/hooks/useAccounts";

export default function NavBar() {
  const { currentUser } = useAccount();

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
              {currentUser &&
                <MenuItemLink to='/bookings' >
                  Bookings
                </MenuItemLink>
              }
            </Box>
            <Box display='flex' alignItems='center'>
              {currentUser ? (
                <UserMenu />
              ) : (
                <>
                  <MenuItemLink to='/login'>Login</MenuItemLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
