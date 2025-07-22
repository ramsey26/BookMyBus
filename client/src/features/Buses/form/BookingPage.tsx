import React, { useState } from 'react';
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
import { useParams } from 'react-router';

const seatMap = [
  { id: '1A' }, { id: '1B' }, { id: '1C' },
  { id: '2A' }, { id: '2B' }, { id: '2C' },
  { id: '3A' }, { id: '3B' }, { id: '3C' },
];

const genderOptions = ['Male', 'Female'];

export default function BookingPage() {
  const { id } = useParams();
  console.log('Booking ID:', id);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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
    console.log('Selected Passengers:', passengers);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Select Your Seats
      </Typography>

      {/* 🟦 Seat Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, mb: 4 }}>
        {seatMap.map(seat => (
          <Button
            key={seat.id}
            variant={selectedSeats.includes(seat.id) ? 'contained' : 'outlined'}
            color={selectedSeats.includes(seat.id) ? 'primary' : 'inherit'}
            onClick={() => handleSeatToggle(seat.id)}
            sx={{ minWidth: 80, height: 50 }}
          >
            {seat.id}
          </Button>
        ))}
      </Box>

      {/* 🧍 Passenger Details Form */}
      {selectedSeats.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
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
  );
}
