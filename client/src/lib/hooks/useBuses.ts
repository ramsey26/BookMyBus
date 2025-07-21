import { useQuery } from "@tanstack/react-query"
import agent from "../api/agent";

export const useBuses = () => {
    const { data: buses, isPending } = useQuery({
        queryKey: ['buses'],
        queryFn: async () => {
            const response = await agent.get<Bus[]>('/buses');
            return response.data;
        }
    });

    const { data: searchedBuses = [] } = useQuery({
        queryKey: ['searchedBuses'],
        queryFn: () => [],
        staleTime: Infinity
    })

    return {
        buses,
        isPending,
        searchedBuses
    }
}