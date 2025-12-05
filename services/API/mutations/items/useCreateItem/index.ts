import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { IServiceItem } from "@/types/Section";
import { serviceItemSchema } from "@/validations/sections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const createServiceItem = async (body: z.infer<serviceItemSchema>) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  return {
    data: await axiosInstance.post<ApiResponse<IServiceItem>>(
      `/Items/addItem`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

const useCreateServiceItem = ({
  config,
}: {
  config?: MutationConfig<typeof createServiceItem>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getItems"] });
    },
    ...config,
    mutationFn: createServiceItem,
  });
};

export default useCreateServiceItem;
