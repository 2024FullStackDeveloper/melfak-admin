import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteImage = async (id: string) => {
  return {
    data: await axiosInstance.delete<ApiResponse<null>>(
      `/Services/deleteImage?id=${id}`
    ),
  };
};

const useDeleteImage = ({
  config,
}: {
  config?: MutationConfig<typeof deleteImage>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSections"] });
    },
    ...config,
    mutationFn: deleteImage,
  });
};

export default useDeleteImage;
