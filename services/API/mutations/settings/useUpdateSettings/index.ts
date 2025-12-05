import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { ISettings } from "@/types/Settings";
import { editSettingsSchema } from "@/validations/settings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const updateSettings = async (body: z.infer<typeof editSettingsSchema>) => {
  return {
    data: await axiosInstance.put<ApiResponse<ISettings>>(
      `/Settings/updateSettings`,
      body
    ),
  };
};

type IUseUpdateSettings = {
  mutationConfig?: MutationConfig<typeof updateSettings>;
};

const useUpdateSettings = ({ mutationConfig }: IUseUpdateSettings = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["getSettings"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateSettings,
  });
};

export default useUpdateSettings;
