import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { IService } from "@/types/Section";
import { serviceSchema } from "@/validations/sections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const updateItem = async (params: {
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
      `/Items/updateItem?id=${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

const useUpdateServiceItem = ({
  config,
}: {
  config?: MutationConfig<typeof updateItem>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getItems"] });
    },
    ...config,
    mutationFn: updateItem,
  });
};

export default useUpdateServiceItem;
