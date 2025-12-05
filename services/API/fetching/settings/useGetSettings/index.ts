import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { ISettings } from "@/types/Settings";
import { useQuery } from "@tanstack/react-query";

export const getSettings = async (): Promise<{
  data?: ISettings | null;
}> => {
  const result = await axiosInstance.get<ApiResponse<ISettings>>(
    `/Settings/getSettings`
  );

  if (result?.data?.success) {
    return { data: result?.data?.data };
  }

  return { data: result?.data?.data };
};

const useGetSettings = () => {
  const query = useQuery({
    queryKey: ["getSettings"],
    queryFn: () => getSettings(),
  });

  return {
    ...query,
    data: query?.data?.data,
  };
};

export default useGetSettings;
