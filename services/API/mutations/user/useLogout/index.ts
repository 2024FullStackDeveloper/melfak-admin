import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { ISettings } from "@/types/Settings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const userLogout = async () => {
  return {
    data: await axiosInstance.post<ApiResponse<ISettings>>(`/Users/logout`),
  };
};

const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};

export default useLogout;
