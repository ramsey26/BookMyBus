import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import EventSeatIcon from '@mui/icons-material/EventSeat';
type Props = {
    bus: Bus,
}

export default function BusCard({ bus }: Props) {

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{bus.busName}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{bus.departureTime}</Typography>
                <Typography variant="body2">{bus.travelDate}</Typography>
                <Typography variant="subtitle1">{bus.sourceCity} To {bus.destinationCity}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Box display='flex' gap={2}>
                    <EventSeatIcon /> {bus.availableSeats} Seats Left
                </Box>
                <Box display='flex' gap={3}>
                    <Button size="medium" variant="contained">Select Seats</Button>
                </Box>
            </CardActions>
        </Card>
    )
}