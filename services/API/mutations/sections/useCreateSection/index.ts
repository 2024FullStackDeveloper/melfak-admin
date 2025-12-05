import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { ISection } from "@/types/Section";
import { sectionSchema } from "@/validations/sections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const createSection = async (body: z.infer<sectionSchema>) => {
  return {
    data: await axiosInstance.post<ApiResponse<ISection>>(
      `/Sections/addSection`,
      body
    ),
  };
};

const useCreateSection = ({
  config,
}: {
  config?: MutationConfig<typeof createSection>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSections"] });
    },
    ...config,
    mutationFn: createSection,
  });
};

export default useCreateSection;
