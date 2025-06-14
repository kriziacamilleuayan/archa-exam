import { Box, Stack, styled, Typography } from "@mui/material";

import type { ExpenseCodesProps } from "@src/types";
import Modal from "@components/common/Modal";
import Button from "@components/common/Button";
import { useDeleteExpenseCodeMutation } from "./mutation";

type DeleteExpenseCodeModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: ExpenseCodesProps & { categoryId: string };
};

const DeleteExpenseCodeModal = (props: DeleteExpenseCodeModalProps) => {
  const { open, setOpen, data } = props;
  const { code, categoryId, description } = data;
  const handleClose = () => setOpen(false);

  const { mutateAsync: deleteExpenseCodeMutateAsync, isPending } =
    useDeleteExpenseCodeMutation();

  const handleDeleteExpenseCode = async () => {
    await deleteExpenseCodeMutateAsync({ categoryId, code });
    handleClose();
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
              {code} - {description}
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
            loading={isPending}
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
