import { useCallback, useState } from "react";
import { Box, Card, Stack, styled, Typography } from "@mui/material";

import type { CategoryProps } from "@src/types";
import ExpenseCode from "@components/features/expense-code/ExpenseCode";
import AddExpenseCodeModal from "@components/features/expense-code/AddExpenseCodeModal";
import DeleteCategoryModal from "@components/features/category/DeleteCategory";
import Button from "@components/common/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

type CategoryCardProps = CategoryProps & {};

const CategoryCard = (props: CategoryCardProps) => {
  const { title, id, name } = props;
  const [openAddExpenseCodeModal, setOpenAddExpenseCodeModal] = useState(false);
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false);

  const handleAddExpenseCode = () => {
    setOpenAddExpenseCodeModal(true);
  };

  const handleDeleteCategory = () => {
    setOpenDeleteCategoryModal(true);
  };

  const handleCheckUniqueCode = useCallback(
    (value: string) => {
      const existingCode = props.expense_codes.find(
        (item) => item.code.toLowerCase() === value.toLowerCase()
      );
      return !!existingCode;
    },
    [props.expense_codes]
  );

  return (
    <>
      <CardComponet variant="outlined">
        <TitleComponent>
          <Stack>
            <Typography component="span" color="gray" fontSize="small">
              {name}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { lg: "2vw", sm: "3vw", xs: "4vw" },
                color: "midnightblue",
              }}
            >
              {title}
            </Typography>
          </Stack>
          <Box>
            <Button
              onClick={handleDeleteCategory}
              startIcon={<DeleteIcon />}
              color="error"
            >
              Delete
            </Button>
          </Box>
        </TitleComponent>

        <Stack px={2} spacing={1}>
          <ExpenseCodeComponent>Expense Codes</ExpenseCodeComponent>

          {props.expense_codes.map((item, i) => (
            <ExpenseCode {...item} categoryId={id} key={`expense-code-${i}`} />
          ))}

          <Button
            size="small"
            onClick={handleAddExpenseCode}
            startIcon={<AddIcon />}
            variant="outlined"
          >
            Add Expense Code
          </Button>
        </Stack>
      </CardComponet>

      <AddExpenseCodeModal
        open={openAddExpenseCodeModal}
        setOpen={setOpenAddExpenseCodeModal}
        data={{ id }}
        handleCheckUniqueCode={handleCheckUniqueCode}
      />
      <DeleteCategoryModal
        open={openDeleteCategoryModal}
        setOpen={setOpenDeleteCategoryModal}
        data={{ id, title }}
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
  alignItems: "center",
  flexDirection: "row",
  paddingBottom: "1vw",
  borderBottom: "1px solid lightgray",
});

const ExpenseCodeComponent = styled(Typography)({
  padding: "14px 0 0",
  color: "gray",
  fontSize: "14px",
});
