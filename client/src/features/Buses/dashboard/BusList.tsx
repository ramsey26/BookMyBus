import { Box, Typography } from "@mui/material";
import { useBuses } from "../../../lib/hooks/useBuses";
import BusCard from "./BusCard";
import { useEffect } from "react";

export default function BusList() {
    const { searchedBuses } = useBuses();

    useEffect(() => {
    }, [searchedBuses]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {searchedBuses!.length === 0 ? (
                <Typography variant="h6" textAlign="center" color="text.secondary">
                    No buses found.
                </Typography>
            ) : (
                searchedBuses!.map((bus: Bus) => (
                    <BusCard key={bus.id} bus={bus} />
                ))
            )}
        </Box>
    )
}