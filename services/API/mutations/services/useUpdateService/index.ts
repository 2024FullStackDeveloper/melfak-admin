import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { IService } from "@/types/Section";
import { serviceSchema } from "@/validations/sections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const updateService = async (params: {
  id: string;
  body: z.infer<serviceSchema>;
}) => {
  const { id, body } = params;
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  return {
    data: await axiosInstance.put<ApiResponse<IService>>(
      `/Services/updateService?id=${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

const useUpdateService = ({
  config,
}: {
  config?: MutationConfig<typeof updateService>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSections"] });
    },
    ...config,
    mutationFn: updateService,
  });
};

export default useUpdateService;
