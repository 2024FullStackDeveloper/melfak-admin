import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { IContact } from "@/types/Contact";
import { editContactSchema } from "@/validations/contacts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const updateContact = async (
  params: [string, { body: z.infer<typeof editContactSchema> }]
) => {
  const [id, body] = params;
  const formData = new FormData();
  formData.append("isPrimary", body.body.isPrimary.toString());
  formData.append("unActive", body.body.unActive.toString());
  if (body.body?.iconFile) {
    formData.append("iconFile", body.body.iconFile as File);
  }

  return {
    data: await axiosInstance.put<ApiResponse<IContact>>(
      `/Contacts/updateContact?id=${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

type IUseUpdateContact = {
  mutationConfig?: MutationConfig<typeof updateContact>;
};

const useUpdateContact = ({ mutationConfig }: IUseUpdateContact = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["getContacts"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateContact,
  });
};

export default useUpdateContact;
