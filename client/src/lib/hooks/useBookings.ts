import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';

export const useBookings = () => {
    const queryClient = useQueryClient();

    // 1. Get bookings by userId
    const GetUserBookings = (userId: string) => useQuery({
        queryKey: ['userBookings', userId],
        queryFn: async () => {
            const res = await agent.get<BookingDto[]>(`/bookings/${userId}`);
            return res.data;
        },
        enabled: !!userId
    });

    // 2. Get bookings (seat numbers) for a bus
    const GetBookingsByBus = (busId: string) => useQuery({
        queryKey: ['bookingsByBus', busId],
        queryFn: async () => {
            const res = await agent.get<string[]>(`/bookings/bus/${busId}`);
            return res.data;
        },
        enabled: !!busId
    });

    // 3. Create new booking
    const CreateBooking = () => useMutation({
        mutationFn: async ({
            busId, booking
        }: {
            busId: string;
            booking: CreateBookingDto;
        }) => {
            const res = await agent.post<string>(`/bookings/add/${busId}`, booking);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userBookings'] });
            queryClient.invalidateQueries({ queryKey: ['bookingsByBus'] });
            queryClient.invalidateQueries({ queryKey: ['buses'] });
            queryClient.invalidateQueries({ queryKey: ['searchedBuses'] });
        }
    });

    return {
        GetUserBookings,
        GetBookingsByBus,
        CreateBooking
    };
};
