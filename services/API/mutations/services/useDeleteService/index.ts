import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteService = async (id: string) => {
  return {
    data: await axiosInstance.delete<ApiResponse<boolean>>(
      `/Services/deleteService?id=${id}`
    ),
  };
};

const useDeleteService = ({
  config,
}: {
  config?: MutationConfig<typeof deleteService>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSections"] });
    },
    ...config,
    mutationFn: deleteService,
  });
};

export default useDeleteService;
