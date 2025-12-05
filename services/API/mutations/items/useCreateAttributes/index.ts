import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createAttributes = async (body: any) => {
  return {
    data: await axiosInstance.post<ApiResponse<null>>(
      `/Items/addAttribute`,
      body
    ),
  };
};

const useCreateAttributes = ({
  config,
}: {
  config?: MutationConfig<typeof createAttributes>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getItems"] });
    },
    ...config,
    mutationFn: createAttributes,
  });
};

export default useCreateAttributes;
