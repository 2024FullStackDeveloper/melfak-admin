import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { imageSchema } from "@/validations/sections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const addImages = async (params: {
  id: string;
  body: z.infer<imageSchema>;
}) => {
  const { id, body } = params;
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  return {
    data: await axiosInstance.post<ApiResponse<null>>(
      `/Services/addImages?id=${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

const useAddImages = ({
  config,
}: {
  config?: MutationConfig<typeof addImages>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSections"] });
    },
    ...config,
    mutationFn: addImages,
  });
};

export default useAddImages;
