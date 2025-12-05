import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { ISocialMedia } from "@/types/SocialMedia";
import {
  editSocialMediaSchema,
  updateSocialMediaSchema,
} from "@/validations/socialMedia";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const updateSocialMedia = async (
  params: [string, { body: z.infer<typeof editSocialMediaSchema> }]
) => {
  const [id, body] = params;
  const formData = new FormData();
  formData.append("name", body.body.name.toString());
  formData.append("displayOrder", body.body.displayOrder.toString());
  formData.append("unActive", body.body.unActive.toString());
  if (body.body?.iconFile) {
    formData.append("iconFile", body.body.iconFile as File);
  }

  return {
    data: await axiosInstance.put<ApiResponse<ISocialMedia>>(
      `/SocialMedias/updateSocialMedia?id=${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

type IUseUpdateSocialMedia = {
  mutationConfig?: MutationConfig<typeof updateSocialMedia>;
};

const useUpdateSocialMedia = ({
  mutationConfig,
}: IUseUpdateSocialMedia = {}) => {
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
    mutationFn: updateSocialMedia,
  });
};

export default useUpdateSocialMedia;
