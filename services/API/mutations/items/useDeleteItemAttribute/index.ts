import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteItemAttribute = async (id: string) => {
  return {
    data: await axiosInstance.delete<ApiResponse<boolean>>(
      `/items/deleteAttribute?id=${id}`
    ),
  };
};

const useDeleteItemAttribute = ({
  config,
}: {
  config?: MutationConfig<typeof deleteItemAttribute>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getItems"] });
    },
    ...config,
    mutationFn: deleteItemAttribute,
  });
};

export default useDeleteItemAttribute;
