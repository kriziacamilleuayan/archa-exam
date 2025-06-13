import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Stack, styled } from "@mui/material";

type AddCategoryModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { open, setOpen } = props;

  const handleClose = () => setOpen(false);

  const handleAddcategory = () => {
    // axios add category
  };

  return (
    <Modal
      aria-labelledby="add-category-modal-title"
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
          <Typography id="add-category-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          hello body
          <FooterContainerComponent>
            <Button
              color="success"
              variant="outlined"
              sx={{ mr: "8px" }}
              onClick={handleAddcategory}
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

export default AddCategoryModal;

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
