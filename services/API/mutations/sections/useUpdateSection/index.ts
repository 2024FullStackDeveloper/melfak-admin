import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { ISection } from "@/types/Section";
import { sectionSchema } from "@/validations/sections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const updateSection = async (
  params: [string, { body: z.infer<sectionSchema> }]
) => {
  const [id, body] = params;
  return {
    data: await axiosInstance.put<ApiResponse<ISection>>(
      `/Sections/updateSection?id=${id}`,
      body
    ),
  };
};

const useUpdateSection = ({
  config,
}: {
  config?: MutationConfig<typeof updateSection>;
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSections"] });
    },
    ...config,
    mutationFn: updateSection,
  });
};

export default useUpdateSection;
