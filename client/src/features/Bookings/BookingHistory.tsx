import { Box, Card, CardContent, Typography, CircularProgress, Stack } from "@mui/material";
import { useAccount } from "../../lib/hooks/useAccounts";
import { useBookings } from "../../lib/hooks/useBookings";

export default function BookingHistory() {
    const { currentUser } = useAccount();
    const { GetUserBookings } = useBookings();
    const { data: bookings, isLoading, isError } = GetUserBookings(currentUser!.id);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !bookings) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="error">Failed to load booking history.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Booking History
            </Typography>

            <Stack spacing={3}>
                {bookings?.map((booking) => (
                    <Card key={booking.id} variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {booking.busName}
                            </Typography>
                            <Typography color="textSecondary">
                                Booking Date: {new Date(booking.bookingDate).toDateString()}
                            </Typography>

                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Passengers:
                            </Typography>
                            <ul>
                                {booking.passengers.map((p, idx) => (
                                    <li key={idx}>
                                        {p.seatNumber} - {p.name}, {p.age} yrs, {p.gender}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
