import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import ComboBox from '../../features/Common/ComboBox';
import indianCities from '../../data/indianCities';
import { Button, Stack } from '@mui/material';
import { useBuses } from '../../lib/hooks/useBuses';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import DateInput from '../../features/Common/DateInput';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default function SearchBar() {
    const { buses } = useBuses();
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const queryClient = useQueryClient();

    const handleSearch = () => {
        const filtered = buses!.filter(
            (bus) =>
                bus.sourceCity.toLowerCase() === fromCity.toLowerCase() &&
                bus.destinationCity.toLowerCase() === toCity.toLowerCase() &&
                dayjs(bus.travelDate).format('YYYY-MM-DD') === selectedDate?.format('YYYY-MM-DD')
        );
        // Set filtered result in React Query cache
        queryClient.setQueryData(['searchedBuses'], filtered);

        if (filtered.length === 0) {
            console.log("Query removed")
            queryClient.removeQueries({ queryKey: ['searchedBuses'] });
        }

        console.log(selectedDate?.format('YYYY-MM-DD'));
        filtered?.map(bus => {
            console.log("Map fn" + new Date(bus.travelDate).toISOString().split('T')[0]);
        })
    };

    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems="left"
                justifyContent="left"
                sx={{ px: 50, py: 2 }}
            >
                <ComboBox
                    label="FROM"
                    source={indianCities}
                    value={fromCity}
                    onChange={setFromCity} />
                <ComboBox
                    label="TO"
                    source={indianCities}
                    value={toCity}
                    onChange={setToCity} />
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
            <ScrollTop >
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
}
