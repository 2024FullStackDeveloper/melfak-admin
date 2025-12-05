import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { IContact } from "@/types/Contact";
import { addContactSchema } from "@/validations/contacts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";

const addContact = async (body: z.infer<typeof addContactSchema>) => {
  const formData = new FormData();
  formData.append("phoneNumber", body.phoneNumber);
  formData.append("isPrimary", body.isPrimary.toString());
  formData.append("unActive", body.unActive.toString());
  if (body.iconFile) {
    formData.append("iconFile", body.iconFile as File);
  }

  return {
    data: await axiosInstance.post<ApiResponse<IContact>>(
      `/contacts/addContact`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  };
};

type IUseAddContact = {
  mutationConfig?: MutationConfig<typeof addContact>;
};

const useAddContact = ({ mutationConfig }: IUseAddContact = {}) => {
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
    mutationFn: addContact,
  });
};

export default useAddContact;
