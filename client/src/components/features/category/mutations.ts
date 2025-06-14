import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { axios } from "@api/axios";
import { categoryKeys } from "@components/features/category/keys";
import { useGetAllCategories } from "@components/features/category/queries";

type AddCategoryType = { name: string; title: string };
type DeleteCategoryType = { id: string };

export const useAddCategoryMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { refetch } = useGetAllCategories();

  return useMutation({
    mutationKey: categoryKeys.addCategory(),
    mutationFn: (data: AddCategoryType) =>
      axios.post("/api/expense-management", {
        name: data.name,
        title: data.title,
      }),
    onSuccess: async (result) => {
      await refetch();
      enqueueSnackbar(`Successfully Added Category ${result.data.name}.`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (err) => {
      enqueueSnackbar(`Add Category ERROR: ${(err as any).request.response} `, {
        variant: "error",
        autoHideDuration: 3000,
      });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { refetch } = useGetAllCategories();

  return useMutation({
    mutationKey: categoryKeys.deleteCategory(),
    mutationFn: (data: DeleteCategoryType) =>
      axios.delete(`/api/expense-management/${data.id}`),
    onSuccess: async (result) => {
      await refetch();
      enqueueSnackbar(`Successfully deleted Category ${result.data.code}.`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (err) => {
      enqueueSnackbar(
        `Delete Category ERROR: ${(err as any).request.response} `,
        { variant: "error", autoHideDuration: 3000 }
      );
    },
  });
};
