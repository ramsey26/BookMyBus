import { Box } from "@mui/material";
import { useBuses } from "../../../lib/hooks/useBuses";
import BusCard from "./BusCard";

export default function BusList(){
    const {buses} = useBuses();
    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {buses!.map(bus => (
                <BusCard
                    key={bus.id}
                    bus={bus}
                />
            ))}
        </Box>
    )
}