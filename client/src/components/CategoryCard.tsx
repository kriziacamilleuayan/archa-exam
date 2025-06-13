import { useState } from "react";
import { Card, Stack, styled, Typography } from "@mui/material";

import type { CategoryProps } from "@src/types";
import ExpenseCode from "@components/ExpenseCode";
import Button from "@components/Button";
import AddExpenseCodeModal from "@components/AddExpenseCodeModal";
import DeleteCategoryModal from "@components/DeleteCategory";

import DeleteIcon from "@mui/icons-material/Delete";

type CategoryCardProps = CategoryProps & {
  getAllData: () => void;
};

const CategoryCard = (props: CategoryCardProps) => {
  const { title, id } = props;
  const [openAddExpenseCodeModal, setOpenAddExpenseCodeModal] = useState(false);
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false);

  const handleAddExpenseCode = () => {
    setOpenAddExpenseCodeModal(true);
  };

  const handleDeleteCategory = () => {
    setOpenDeleteCategoryModal(true);
  };

  return (
    <>
      <CardComponet variant="outlined">
        <TitleComponent>
          <Typography
            variant="h2"
            sx={{ fontSize: { lg: "2vw", sm: "3vw", xs: "4vw" } }}
          >
            {title}
          </Typography>

          <Button onClick={handleDeleteCategory} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </TitleComponent>

        <Stack px={2} spacing={1}>
          <ExpenseCodeComponent>Expense Codes</ExpenseCodeComponent>

          {props.expense_codes.map((item, i) => (
            <ExpenseCode {...item} key={`expense-code-${i}`} />
          ))}

          <Button size="small" onClick={handleAddExpenseCode}>
            Add Expense Code
          </Button>
        </Stack>
      </CardComponet>

      <AddExpenseCodeModal
        open={openAddExpenseCodeModal}
        setOpen={setOpenAddExpenseCodeModal}
        getAllData={props.getAllData}
        data={{ id }}
      />
      <DeleteCategoryModal
        open={openDeleteCategoryModal}
        setOpen={setOpenDeleteCategoryModal}
        data={{ id, title }}
        getAllData={props.getAllData}
      />
    </>
  );
};

export default CategoryCard;

const CardComponet = styled(Card)({
  padding: "24px",
  borderColor: "lightblue",
});

const TitleComponent = styled(Stack)({
  justifyContent: "space-between",
  flexDirection: "row",
  paddingBottom: "1vw",
  borderBottom: "1px solid lightgray",
});

const ExpenseCodeComponent = styled(Typography)({
  padding: "14px 0 0",
  color: "gray",
});
