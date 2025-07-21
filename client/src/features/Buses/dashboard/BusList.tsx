import { Box, Typography } from "@mui/material";
import { useBuses } from "../../../lib/hooks/useBuses";
import BusCard from "./BusCard";

export default function BusList() {
    const { buses, searchedBuses } = useBuses();
    const filtered = searchedBuses.length > 0 ? searchedBuses : buses;
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {filtered!.length === 0 ? (
                <Typography variant="h6" textAlign="center" color="text.secondary">
                    No buses found.
                </Typography>
            ) : (
                filtered!.map((bus) => (
                    <BusCard key={bus.id} bus={bus} />
                ))
            )}
        </Box>
    )
}