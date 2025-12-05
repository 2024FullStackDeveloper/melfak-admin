import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { IContact } from "@/types/Contact";
import { useQuery } from "@tanstack/react-query";

export const getContacts = async (): Promise<{
  data: { data: Array<IContact> };
}> => {
  const result = await axiosInstance.get<ApiResponse<Array<IContact>>>(
    `/Contacts/getContacts`
  );

  if (result?.data?.success) {
    return {
      data: {
        data: result?.data?.data ?? [],
      },
    };
  }

  return {
    data: {
      data: [],
    },
  };
};

const useGetContacts = () => {
  const query = useQuery<{ data: { data: IContact[] } }>({
    queryKey: ["getContacts"],
    queryFn: () => getContacts(),
  });

  return {
    ...query,
    data: query?.data?.data.data,
  };
};

export default useGetContacts;
