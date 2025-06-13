import { useState } from "react";
import { Box, Stack, styled, Typography } from "@mui/material";

import { axios } from "@src/api/axios";
import type { ExpenseCodesProps } from "@src/types";
import Modal from "@components/Modal";
import Button from "@components/Button";

type DeleteExpenseCodeModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: ExpenseCodesProps & { categoryId: string };
  getAllData: () => void;
};

const DeleteExpenseCodeModal = (props: DeleteExpenseCodeModalProps) => {
  const { open, setOpen, data, getAllData } = props;
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);

  const handleDeleteExpenseCode = async () => {
    try {
      const url = `/api/expense-management/${data.categoryId}/expense-codes/${data.code}`;
      setLoading(true);
      await axios.delete(url);
      await getAllData();
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <BoxComponent>
        <Typography
          id="delete-expense-code-modal-title"
          variant="h6"
          sx={{ textAlign: "center" }}
        >
          Delete Expense Code
        </Typography>
        <Stack my={4}>
          <Typography sx={{ textAlign: "center" }}>
            Are you sure you want to delete expense code{" "}
            <b>
              {data.code} - {data.description}
            </b>
            ?
          </Typography>
        </Stack>

        <FooterContainerComponent>
          <Button color="info" onClick={handleClose}>
            Close
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteExpenseCode}
            loading={loading}
          >
            Delete
          </Button>
        </FooterContainerComponent>
      </BoxComponent>
    </Modal>
  );
};

export default DeleteExpenseCodeModal;

const BoxComponent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#fff",
  border: "2px solid gray",
  borderRadius: "5px",
  padding: "24px",
});

const FooterContainerComponent = styled(Stack)({
  flexDirection: "row",
  marginTop: "24px",
  paddingTop: "12px",
  borderTop: "1px solid lightgray",
  justifyContent: "flex-end",
});
