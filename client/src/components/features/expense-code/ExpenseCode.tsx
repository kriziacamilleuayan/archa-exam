import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack, Typography } from "@mui/material";

import type { ExpenseCodesProps } from "@src/types";
import DeleteExpenseCodeModal from "@components/features/expense-code/DeleteExpenseCode";

const ExpenseCode = (props: ExpenseCodesProps & { categoryId: string }) => {
  const [openDeleteExpenseCodeModal, setOpenDeleteExpenseCodeModal] =
    useState(false);

  const handleDeleteExpenseCode = () => {
    setOpenDeleteExpenseCodeModal(true);
  };

  return (
    <>
      <Stack
        px={1}
        sx={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Typography color="midnightblue">
          <strong>{props.code}</strong> - {props.description}
        </Typography>
        <IconButton
          aria-label="delete"
          size="small"
          color="error"
          onClick={handleDeleteExpenseCode}
        >
          <DeleteIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Stack>

      <DeleteExpenseCodeModal
        open={openDeleteExpenseCodeModal}
        setOpen={setOpenDeleteExpenseCodeModal}
        data={props}
      />
    </>
  );
};

export default ExpenseCode;
