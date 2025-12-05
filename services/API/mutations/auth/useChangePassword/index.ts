import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { changePasswordSchema } from "@/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
const changePassword = async (body: z.infer<typeof changePasswordSchema>) => {
  return (
    await axiosInstance.post<ApiResponse<null>>(
      `/Authentication/changePassword`,
      {
        email: body.email,
        newPassword: body.newPassword,
        otp: body.otp,
      }
    )
  )?.data;
};

const useChangePassword = () => {
  return useMutation((body: z.infer<typeof changePasswordSchema>) =>
    changePassword(body)
  );
};

export default useChangePassword;
