import { useState } from "react";
import { axios } from "@api/axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, Stack, styled } from "@mui/material";

type DeleteCategoryModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: {
    id: string;
    title: string;
  };
  getAllData: () => void;
};

const DeleteCategoryModal = (props: DeleteCategoryModalProps) => {
  const { open, setOpen, data } = props;
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);

  const handleDeletecategory = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/expense-management/${data.id}`);
      await props.getAllData();
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      aria-labelledby="delete-category-modal-title"
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
            id="delete-category-modal-title"
            variant="h6"
            component="h2"
          >
            Delete Category
          </Typography>
          <Typography>
            Are you sure you want to delete {data.title} category?
          </Typography>
          <FooterContainerComponent>
            <Button
              color="error"
              variant="outlined"
              sx={{ mr: "8px" }}
              onClick={handleDeletecategory}
              loading={loading}
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

export default DeleteCategoryModal;

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
