import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { Link } from "react-router";
type Props = {
    bus: Bus,
}

export default function BusCard({ bus }: Props) {

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold">{bus.busName}</Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Operated by: {bus.operatorName}
                </Typography>

                <Typography sx={{ my: 1 }}>
                    <strong>Type:</strong> {bus.type}
                </Typography>

                <Typography sx={{ my: 1 }}>
                    <strong>Route:</strong> {bus.sourceCity} → {bus.destinationCity}
                </Typography>

                <Typography sx={{ my: 1 }}>
                    <strong>Departure:</strong> {bus.departureTime} &nbsp;|&nbsp;
                    <strong>Arrival:</strong> {bus.arrivalTime}
                </Typography>

                <Typography sx={{ my: 1 }}>
                    <strong>Travel Date:</strong> {new Date(bus.travelDate).toLocaleDateString()}
                </Typography>

                <Typography sx={{ my: 1 }}>
                    <strong>Fare per seat:</strong> ₹{bus.farePerSeat}
                </Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <EventSeatIcon /> {bus.availableSeats} seats left
                </Box>
                <Button
                    component={Link}
                    to={`/bookingPage/${bus.id}`}
                    size="medium"
                    variant="contained"
                    disabled={!bus.isActive || bus.availableSeats === 0}
                >
                    Select Seats
                </Button>
            </CardActions>
        </Card>
    )
}