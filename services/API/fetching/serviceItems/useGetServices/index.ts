import axiosInstance from "@/configs/API";
import { ApiResponse } from "@/services/API";
import { IService } from "@/types/Section";
import { useQuery } from "@tanstack/react-query";

export const getServices = async ({
  id,
  page = 1,
  size = 10,
  sectionId,
  arTitle,
  enTitle,
  lang = "ar",
  all = false,
}: {
  id?: string;
  page?: number;
  size?: number;
  sectionId?: string;
  arTitle?: string;
  enTitle?: string;
  lang?: string;
  all?: boolean;
}): Promise<IService[]> => {
  let query = `?page=${page}&size=${size}`;

  if (id) {
    query += `&id=${id}`;
  }

  if (sectionId) {
    query += `&sectionId=${sectionId}`;
  }

  if (arTitle && lang === "ar") {
    query += `&arTitle=${arTitle}`;
  }

  if (enTitle && lang === "en") {
    query += `&enTitle=${enTitle}`;
  }

  if (all) {
    query += `&all=true`;
  }

  const result = await axiosInstance.get<ApiResponse<IService[]>>(
    `/Services/getServices${query}`
  );

  if (result?.data?.success) {
    return result?.data?.data ?? [];
  }

  return [];
};

const useGetServices = ({
  id,
  page = 1,
  size = 10,
  sectionId,
  arTitle,
  enTitle,
  lang = "ar",
  all = false,
}: {
  id?: string;
  page?: number;
  size?: number;
  sectionId?: string;
  arTitle?: string;
  enTitle?: string;
  lang?: string;
  all?: boolean;
}) => {
  const query = useQuery({
    queryKey: [
      "getServices",
      page,
      size,
      sectionId,
      arTitle,
      enTitle,
      lang,
      id,
      all,
    ],
    queryFn: () =>
      getServices({ page, size, sectionId, arTitle, enTitle, lang, all, id }),
  });
  return {
    ...query,
    data: query?.data ?? [],
  };
};

export default useGetServices;
