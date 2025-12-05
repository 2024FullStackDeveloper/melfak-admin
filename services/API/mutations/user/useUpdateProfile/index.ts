import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { IUser } from "@/types/Auth";
import { UpdateUserProfileType } from "@/validations/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
const updateProfile = async (body: z.infer<UpdateUserProfileType>) => {
  return (
    await axiosInstance.put<ApiResponse<IUser>>(`/Users/updateProfile`, body)
  )?.data;
};

const useUpdateProfile = ({
  config,
}: {
  config?: MutationConfig<typeof updateProfile>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
    },
    ...config,
  });
};

export default useUpdateProfile;
