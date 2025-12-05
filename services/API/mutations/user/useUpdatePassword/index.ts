import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { IUser } from "@/types/Auth";
import { UpdateUserPasswordType } from "@/validations/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
const updatePassword = async (body: z.infer<UpdateUserPasswordType>) => {
  return (
    await axiosInstance.put<ApiResponse<IUser>>(`/Users/updatePassword`, body)
  )?.data;
};

const useUpdatePassword = ({
  config,
}: {
  config?: MutationConfig<typeof updatePassword>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserInfo"] });
    },
    ...config,
  });
};

export default useUpdatePassword;
