import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { IUser } from "@/types/Auth";
import { useQuery } from "@tanstack/react-query";

export const getUserInfo = async (): Promise<{
  data?: IUser | null;
}> => {
  const result = await axiosInstance.get<ApiResponse<IUser>>(`/Users/me`);

  if (result?.data?.success) {
    return { data: result?.data?.data };
  }

  return { data: result?.data?.data };
};

const useGetUserInfo = ({
  enabled = true,
  onSuccess,
  onError,
}: {
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const query = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => getUserInfo(),
    refetchOnWindowFocus: false,
    enabled: enabled ?? true,
    onSuccess,
    onError,
  });

  return {
    ...query,
    data: query?.data?.data,
  };
};

export default useGetUserInfo;
