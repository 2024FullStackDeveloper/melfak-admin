import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { IServiceItem } from "@/types/Section";
import { useQuery } from "@tanstack/react-query";

export const getServiceItems = async ({
  serviceId,
}: {
  serviceId?: string;
}): Promise<IServiceItem[]> => {
  let query = "";
  if (serviceId) {
    query += `?serviceId=${serviceId}`;
  }

  const result = await axiosInstance.get<ApiResponse<IServiceItem[]>>(
    `/Items/getItems${query}`
  );

  if (result?.data?.success) {
    return result?.data?.data ?? [];
  }

  return [];
};

const useGetServiceItems = ({ serviceId }: { serviceId?: string }) => {
  const query = useQuery({
    queryKey: ["getItems", serviceId],
    queryFn: () => getServiceItems({ serviceId }),
  });
  return {
    ...query,
    data: query?.data ?? [],
  };
};

export default useGetServiceItems;
