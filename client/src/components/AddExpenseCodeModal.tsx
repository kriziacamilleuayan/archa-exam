import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Stack, styled } from "@mui/material";

type AddExpenseCodeModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AddExpenseCodeModal = (props: AddExpenseCodeModalProps) => {
  const { open, setOpen } = props;

  const handleClose = () => setOpen(false);

  const handleAddExpenseCode = () => {
    // axios add expense code
  };

  return (
    <Modal
      aria-labelledby="add-expense-code-modal-title"
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
            id="add-expense-code-modal-title"
            variant="h6"
            component="h2"
          >
            Add Expense Code
          </Typography>
          hello body
          <FooterContainerComponent>
            <Button
              color="success"
              variant="outlined"
              sx={{ mr: "8px" }}
              onClick={handleAddExpenseCode}
            >
              Add
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

export default AddExpenseCodeModal;

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
