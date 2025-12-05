import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { ISocialMedia } from "@/types/SocialMedia";
import { useQuery } from "@tanstack/react-query";

export const getSocialMedias = async (): Promise<{
  data: { data: Array<ISocialMedia> };
}> => {
  const result = await axiosInstance.get<ApiResponse<Array<ISocialMedia>>>(
    `/SocialMedias/getSocialMedias`
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

const useGetSocialMedias = () => {
  const query = useQuery<{ data: { data: ISocialMedia[] } }>({
    queryKey: ["getSocialMedias"],
    queryFn: () => getSocialMedias(),
  });

  return {
    ...query,
    data: query?.data?.data.data,
  };
};

export default useGetSocialMedias;
