import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { ISocialMedia } from "@/types/SocialMedia";
import { addSocialMediaSchema } from "@/validations/socialMedia";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const addSocialMedia = async (body: z.infer<typeof addSocialMediaSchema>) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("displayOrder", body.displayOrder.toString());
  formData.append("unActive", body.unActive.toString());
  if (body.iconFile) {
    formData.append("iconFile", body.iconFile as File);
  }

  return {
    data: await axiosInstance.post<ApiResponse<ISocialMedia>>(
      `/socialMedias/addSocialMedia`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

type IUseAddSocialMedia = {
  mutationConfig?: MutationConfig<typeof addSocialMedia>;
};

const useAddSocialMedia = ({ mutationConfig }: IUseAddSocialMedia = {}) => {
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
    mutationFn: addSocialMedia,
  });
};

export default useAddSocialMedia;
