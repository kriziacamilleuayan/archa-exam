import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Stack, styled } from "@mui/material";
import type { ExpenseCodesProps } from "@src/types";

type DeleteExpenseCodeModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: ExpenseCodesProps;
};

const DeleteExpenseCodeModal = (props: DeleteExpenseCodeModalProps) => {
  const { open, setOpen, data } = props;

  const handleClose = () => setOpen(false);

  const handleDeleteExpenseCode = () => {
    // axios delete category
  };

  return (
    <Modal
      aria-labelledby="delete-expense-code-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <BoxComponent>
          <Typography
            id="delete-expense-code-modal-title"
            variant="h6"
            component="h2"
          >
            Delete Expense Code
          </Typography>
          <Typography>
            Are you sure you want to delete expense code {data.code}-
            {data.description}?
          </Typography>
          <FooterContainerComponent>
            <Button
              color="error"
              variant="outlined"
              sx={{ mr: "8px" }}
              onClick={handleDeleteExpenseCode}
            >
              Delete
            </Button>
            <Button color="info" onClick={handleClose}>
              Close
            </Button>
          </FooterContainerComponent>
        </BoxComponent>
      </Fade>
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
