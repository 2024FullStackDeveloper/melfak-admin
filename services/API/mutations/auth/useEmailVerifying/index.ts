import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { IEmailVerifyingResponse } from "@/types/Auth";
import { emailVerifyingSchema } from "@/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
const emailVerifying = async (body: z.infer<typeof emailVerifyingSchema>) => {
  return (
    await axiosInstance.post<ApiResponse<IEmailVerifyingResponse | null>>(
      `/Authentication/verify`,
      {
        email: body.email,
      }
    )
  )?.data;
};

const useEmailVerifying = () => {
  return useMutation((body: z.infer<typeof emailVerifyingSchema>) =>
    emailVerifying(body)
  );
};

export default useEmailVerifying;
