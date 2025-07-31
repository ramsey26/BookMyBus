import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useBookings } from '../../lib/hooks/useBookings';
import { useAccount } from '../../lib/hooks/useAccounts';

type BusRow = {
  id: string;
}

const genderOptions = ['Male', 'Female'];

export default function BookingPage() {
  const { id } = useParams();

  const seatMap = useMemo(() => {
    const map: BusRow[] = [];
    const rows = 10;
    const columns = ['A', 'B', 'C'];

    for (let i = 1; i <= rows; i++) {
      for (const col of columns) {
        map.push({ id: `${i}${col}` });
      }
    }

    return map;
  }, []);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { GetBookingsByBus, CreateBooking } = useBookings();

  const { data: takenSeats } = GetBookingsByBus(id!);
  const { mutate: bookNow } = CreateBooking();
  const { currentUser } = useAccount();
  const navigate = useNavigate();
  const handleSeatToggle = (seatId: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const [passengers, setPassengers] = useState<{ seat: string; name: string; age: string; gender: string }[]>([]);

  // Update passengers when selectedSeats change
  React.useEffect(() => {
    setPassengers(
      selectedSeats.map(seat => ({
        seat,
        name: '',
        age: '',
        gender: '',
      }))
    );
  }, [selectedSeats]);

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index][field as keyof typeof updated[0]] = value;
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateBookingDto = {
      userId: currentUser!.id,
      passengers: passengers,
    };

    bookNow(
      { busId: id!, booking: payload },
      {
        onSuccess: () => {
          console.log('Booking successful!');
          navigate('/bookings');
        },
        onError: (error) => {
          console.error('Booking failed', error);
        }
      }
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Select Your Seats
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left: Seat Layout */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
          {Array.from({ length: 10 }).map((_, rowIdx) => (
            <Box key={rowIdx} sx={{ display: 'flex', gap: 1 }}>
              {seatMap
                .slice(rowIdx * 3, rowIdx * 3 + 3)
                .map((seat) => (
                  <Button
                    key={seat.id}
                    variant={selectedSeats.includes(seat.id) ? 'contained' : 'outlined'}
                    color={selectedSeats.includes(seat.id) ? 'primary' : 'inherit'}
                    onClick={() => handleSeatToggle(seat.id)}
                    sx={{ minWidth: 80, height: 50 }}
                    disabled={takenSeats?.includes(seat.id)}
                  >
                    {seat.id}
                  </Button>
                ))}
            </Box>
          ))}
        </Box>

        {/* Right: Passenger Form */}
        {selectedSeats.length > 0 && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              flex: 1,
              maxHeight: 'calc(100vh - 64px)', // adjust for top padding/header
              overflowY: 'auto',
              flexShrink: 0,
              position: 'sticky',
              top: 0,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Traveller Details
            </Typography>

            <form onSubmit={handleSubmit}>
              {passengers.map((p, index) => (
                <Box key={p.seat} sx={{ mb: 3 }}>
                  <Typography fontWeight="bold" mb={1}>Seat {p.seat}</Typography>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                      label="Name"
                      value={p.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      required
                    />

                    <TextField
                      label="Age"
                      type="number"
                      value={p.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      required
                    />

                    <Box>
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup
                        row
                        value={p.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                      >
                        {genderOptions.map(gender => (
                          <FormControlLabel
                            key={gender}
                            value={gender}
                            control={<Radio />}
                            label={gender}
                          />
                        ))}
                      </RadioGroup>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Button variant="contained" type="submit">
                Confirm Passengers
              </Button>
            </form>
          </Paper>
        )}
      </Box>
    </Box>

  );

}
