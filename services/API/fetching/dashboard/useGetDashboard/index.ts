import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { IDashboard } from "@/types/Dashboard";
import { useQuery } from "@tanstack/react-query";

export const getDashboard = async (): Promise<{
  data?: IDashboard | null;
}> => {
  const result = await axiosInstance.get<ApiResponse<IDashboard>>(
    `/dashboard/getDashboard`
  );

  if (result?.data?.success) {
    return { data: result?.data?.data };
  }

  return { data: null };
};

const useGetDashboard = () => {
  const query = useQuery({
    queryKey: ["getDashboard"],
    queryFn: () => getDashboard(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    data: query?.data?.data,
  };
};

export default useGetDashboard;
