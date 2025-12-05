import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { ISection } from "@/types/Section";
import { useQuery } from "@tanstack/react-query";

export const getSections = async (): Promise<{
  data?: ISection[] | null;
}> => {
  const result = await axiosInstance.get<ApiResponse<ISection[]>>(
    `/Sections/getSections`
  );

  if (result?.data?.success) {
    return { data: result?.data?.data };
  }

  return { data: [] };
};

const useGetSections = () => {
  const query = useQuery({
    queryKey: ["getSections"],
    queryFn: () => getSections(),
  });

  return {
    ...query,
    data: query?.data?.data,
  };
};

export default useGetSections;
