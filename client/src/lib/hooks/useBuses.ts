import { useQuery } from "@tanstack/react-query"
import agent from "../api/agent";

export const useBuses = () => {
    //const queryClient = useQueryClient();


    const { data: buses, isPending } = useQuery({
        queryKey: ['buses'],
        queryFn: async () => {
            const response = await agent.get<Bus[]>('/buses');
            return response.data;
        }
    });

    return {
        buses,
        isPending
    }
}