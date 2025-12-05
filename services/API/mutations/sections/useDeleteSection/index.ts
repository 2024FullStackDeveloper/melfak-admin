import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteSection = async (id: string) => {
  return {
    data: await axiosInstance.delete<ApiResponse<boolean>>(
      `/Sections/deleteSection?id=${id}`
    ),
  };
};

const useDeleteSection = ({
  config,
}: {
  config?: MutationConfig<typeof deleteSection>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSections"] });
    },
    ...config,
    mutationFn: deleteSection,
  });
};

export default useDeleteSection;
