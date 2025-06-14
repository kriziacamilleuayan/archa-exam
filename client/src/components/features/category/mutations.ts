import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { axios } from "@api/axios";
import { categoryKeys } from "@components/features/category/keys";
import { useGetAllCategories } from "@components/features/category/queries";

export const useAddCategoryMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { refetch } = useGetAllCategories();

  return useMutation({
    mutationKey: categoryKeys.addCategory(),
    mutationFn: (data: { name: string; title: string }) =>
      axios.post("/api/expense-management", {
        name: data.name,
        title: data.title,
      }),
    onSuccess: async (data) => {
      await refetch();
      enqueueSnackbar(`Successfully added Category ${data.data.title}.`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (err) => {
      enqueueSnackbar(
        `handleAddcategory ERROR: ${(err as any).request.response} `,
        { variant: "error", autoHideDuration: 3000 }
      );
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { refetch } = useGetAllCategories();

  return useMutation({
    mutationKey: categoryKeys.deleteCategory(),
    mutationFn: (data: { id: string }) =>
      axios.delete(`/api/expense-management/${data.id}`),
    onSuccess: async (data) => {
      await refetch();
      enqueueSnackbar(`Successfully deleted Category ${data.data.title}.`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (err) => {
      enqueueSnackbar(
        `handleDeletecategory ERROR: ${(err as any).request.response} `,
        { variant: "error", autoHideDuration: 3000 }
      );
    },
  });
};
