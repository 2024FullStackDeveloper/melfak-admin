import axiosInstance from "@/configs/API";
import { ApiResponse, MutationConfig } from "@/services/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const deleteContact = async (id: string) => {
  const result = await axiosInstance.delete<ApiResponse<null>>(
    `/Contacts/deleteContact?id=${id}`
  );
  return result?.data;
};

type IUseDeleteContact = {
  mutationConfig?: MutationConfig<typeof deleteContact>;
};

const useDeleteContact = ({ mutationConfig }: IUseDeleteContact = {}) => {
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
    mutationFn: deleteContact,
  });
};

export default useDeleteContact;
