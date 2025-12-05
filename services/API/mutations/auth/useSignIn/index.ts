import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { ILoginResponse } from "@/types/Auth";
import { signInSchema } from "@/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
const signingIn = async (body: z.infer<typeof signInSchema>) => {
  const result = await axiosInstance.post<ApiResponse<ILoginResponse>>(
    `/Authentication/login`,
    {
      email: body.email,
      password: body.password,
    }
  );
  return result?.data;
};

const useSigningIn = () => {
  return useMutation((body: z.infer<typeof signInSchema>) => signingIn(body));
};

export default useSigningIn;
