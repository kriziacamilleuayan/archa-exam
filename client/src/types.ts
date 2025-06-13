export type ExpenseCodesProps = {
  id: string;
  code: string;
  description: string;
};

export type CategoryProps = {
  id: string;
  name: string;
  title: string;
  expense_codes: ExpenseCodesProps[];
};
