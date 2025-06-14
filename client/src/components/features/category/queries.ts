import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { axios } from "@api/axios";
import { categoryKeys } from "@components/features/category/keys";
import type { CategoryProps } from "@src/types";

export const useGetAllCategories = () => {
  const getCategories = async () => {
    const result = await axios.get("/api/expense-management");
    return result.data;
  };
  return useQuery<CategoryProps[], AxiosError>({
    queryKey: categoryKeys.getAllCategories(),
    queryFn: getCategories,
  });
};
