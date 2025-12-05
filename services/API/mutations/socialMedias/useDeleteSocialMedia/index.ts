import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const deleteSocialMedia = async (id: string) => {
  const result = await axiosInstance.delete<ApiResponse<null>>(
    `/SocialMedias/deleteSocialMedia?id=${id}`
  );
  return result?.data;
};

type IUseDeleteSocialMedia = {
  mutationConfig?: MutationConfig<typeof deleteSocialMedia>;
};

const useDeleteSocialMedia = ({
  mutationConfig,
}: IUseDeleteSocialMedia = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["getSocialMedias"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteSocialMedia,
  });
};

export default useDeleteSocialMedia;
