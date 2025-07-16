import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

type Props = {
    bus: Bus,
}

export default function BusCard({bus}: Props) {

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{bus.busName}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{bus.departureTime}</Typography>
                <Typography variant="body2">{bus.travelDate}</Typography>
                <Typography variant="subtitle1">{bus.sourceCity} To {bus.destinationCity}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={bus.availableSeats} variant="outlined" />
                <Box display='flex' gap={3}>
                    <Button size="medium" variant="contained">Select Seats</Button>
                </Box>
            </CardActions>
        </Card>
    )
}