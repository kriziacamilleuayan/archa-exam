import { IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import type { ExpenseCodesProps } from "@src/types";

const ExpenseCode = (props: ExpenseCodesProps) => {
  return (
    <>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Typography>
          <strong>{props.code}</strong> - {props.description}
        </Typography>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default ExpenseCode;
