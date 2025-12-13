import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { IPage } from "@/types/Page";
import { useQuery } from "@tanstack/react-query";

export const getPages = async (): Promise<{
  data?: IPage[] | null;
}> => {
  const result = await axiosInstance.get<ApiResponse<IPage[]>>(
    `/Pages/getPages`
  );

  if (result?.data?.success) {
    return { data: result?.data?.data };
  }

  return { data: [] };
};

const useGetPages = () => {
  const query = useQuery({
    queryKey: ["getPages"],
    queryFn: () => getPages(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 60 * 60 * 1000,
  });

  return {
    ...query,
    data: query?.data?.data,
  };
};

export default useGetPages;
