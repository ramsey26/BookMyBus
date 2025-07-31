import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccounts"
import { Box, CircularProgress } from "@mui/material";

export default function RequireAuth() {
    const { currentUser, loadingUserInfo } = useAccount();
    const location = useLocation();

    if (loadingUserInfo) return (<Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
    </Box>)

    if (!currentUser) return <Navigate to='/login' state={{ from: location }} />

    return (
        <Outlet />
    )
}