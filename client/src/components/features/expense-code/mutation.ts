import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { axios } from "@api/axios";
import { useGetAllCategories } from "@components/features/category/queries";
import { expenseCodeKeys } from "@components/features/expense-code/keys";

type AddCategoryMutationProps = {
  code: string;
  description: string;
  categoryId: string;
};

type DeleteCategoryMutationProps = {
  code: string;
  categoryId: string;
};

export const useAddExpenseCodeMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { refetch } = useGetAllCategories();

  return useMutation({
    mutationKey: expenseCodeKeys.addExpenseCode(),
    mutationFn: (data: AddCategoryMutationProps) =>
      axios.post(`/api/expense-management/${data.categoryId}/expense-codes`, {
        code: data.code,
        description: data.description,
      }),
    onSuccess: async (result) => {
      await refetch();
      enqueueSnackbar(`Successfully added Expense Code ${result.data.code}.`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (err) => {
      enqueueSnackbar(
        `Add Expense Code ERROR: ${(err as any).request.response} `,
        { variant: "error", autoHideDuration: 3000 }
      );
    },
  });
};

export const useDeleteExpenseCodeMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { refetch } = useGetAllCategories();

  return useMutation({
    mutationKey: expenseCodeKeys.deleteExpenseCode(),
    mutationFn: (data: DeleteCategoryMutationProps) =>
      axios.delete(
        `/api/expense-management/${data.categoryId}/expense-codes/${data.code}`
      ),
    onSuccess: async (result) => {
      await refetch();
      enqueueSnackbar(
        `Successfully Deleted Expense Code ${result.data.code}.`,
        { variant: "success", autoHideDuration: 3000 }
      );
    },
    onError: (err) => {
      enqueueSnackbar(
        `Delete Expense Code ERROR: ${(err as any).request.response} `,
        { variant: "error", autoHideDuration: 3000 }
      );
    },
  });
};
