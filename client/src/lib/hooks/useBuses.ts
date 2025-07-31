import { useQuery } from "@tanstack/react-query"
import agent from "../api/agent";

export const useBuses = () => {
    const { data: buses, isPending } = useQuery({
        queryKey: ['buses'],
        queryFn: async () => {
            const response = await agent.get<Bus[]>('/buses');
            return response.data;
        },
        refetchOnWindowFocus: true,   // Refetch when tab/window gains focus
        refetchOnMount: true,         // Refetch when component mounts
    });

    const { data: searchedBuses = [] } = useQuery({
        queryKey: ['searchedBuses'],
        queryFn: () => [],
        staleTime: Infinity,
        refetchOnMount: true,          // ✅ auto-refetch when route mounts
        refetchOnWindowFocus: true,   // ✅ auto-refetch when tab regains focus
    })

    return {
        buses,
        isPending,
        searchedBuses
    }
}