import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteItem = async (id: string) => {
  return {
    data: await axiosInstance.delete<ApiResponse<boolean>>(
      `/items/deleteItem?id=${id}`
    ),
  };
};

const useDeleteItem = ({
  config,
}: {
  config?: MutationConfig<typeof deleteItem>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getItems"] });
    },
    ...config,
    mutationFn: deleteItem,
  });
};

export default useDeleteItem;
