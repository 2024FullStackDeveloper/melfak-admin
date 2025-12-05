import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { IService } from "@/types/Section";
import { serviceSchema } from "@/validations/sections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const createService = async (body: z.infer<serviceSchema>) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  return {
    data: await axiosInstance.post<ApiResponse<IService>>(
      `/Services/addService`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

const useCreateService = ({
  config,
}: {
  config?: MutationConfig<typeof createService>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSections"] });
    },
    ...config,
    mutationFn: createService,
  });
};

export default useCreateService;
