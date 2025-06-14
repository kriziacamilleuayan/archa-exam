export const expenseCodeKeys = {
  all: ["expenseCode"] as const,
  addExpenseCode: () => [...expenseCodeKeys.all, "addExpenseCode"] as const,
  deleteExpenseCode: () =>
    [...expenseCodeKeys.all, "deleteExpenseCode"] as const,
};
