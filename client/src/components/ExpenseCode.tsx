import { useState } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import type { ExpenseCodesProps } from "@src/types";
import DeleteExpenseCodeModal from "@components/DeleteExpenseCode";

const ExpenseCode = (props: ExpenseCodesProps) => {
  const [openDeleteExpenseCodeModal, setOpenDeleteExpenseCodeModal] =
    useState(false);

  const handleDeleteExpenseCode = () => {
    setOpenDeleteExpenseCodeModal(true);
  };

  return (
    <>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography>
          <strong>{props.code}</strong> - {props.description}
        </Typography>
        <IconButton aria-label="delete" onClick={handleDeleteExpenseCode}>
          <DeleteIcon />
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
