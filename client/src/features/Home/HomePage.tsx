import { Box, Button, Container, Stack } from "@mui/material";
import indianCities from "../../data/indianCities";
import ComboBox from "../Common/ComboBox";
import DateInput from "../Common/DateInput";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useBuses } from "../../lib/hooks/useBuses";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function HomePage() {
    const { buses } = useBuses();
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSearch = () => {
        const filtered = buses!.filter(
            (bus) =>
                bus.sourceCity.toLowerCase() === fromCity.toLowerCase() &&
                bus.destinationCity.toLowerCase() === toCity.toLowerCase() &&
                dayjs(bus.travelDate).format('YYYY-MM-DD') === selectedDate?.format('YYYY-MM-DD')
        );

        queryClient.setQueryData(['searchedBuses'], filtered);
        navigate(
            `/buses?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(
                toCity
            )}&date=${selectedDate?.format('YYYY-MM-DD')}`
        );
    };

    return (
        <Box
            sx={{
                minHeight: '50vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#fafafa',
            }}
        >
            <Container sx={{ mt: 5 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        backgroundColor: '#f9f9f9',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <ComboBox
                        label="FROM"
                        source={indianCities}
                        value={fromCity}
                        onChange={setFromCity}
                    />
                    <ComboBox
                        label="TO"
                        source={indianCities}
                        value={toCity}
                        onChange={setToCity}
                    />
                    <DateInput
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ height: 56, minWidth: 120 }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Stack>
            </Container>
        </Box>

    );
}
