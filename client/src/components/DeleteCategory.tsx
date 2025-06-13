import { useState } from "react";
import { axios } from "@api/axios";
import { Box, Stack, styled, Typography } from "@mui/material";

import Button from "@components/Button";
import Modal from "@components/Modal";

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
  const { open, setOpen, data, getAllData } = props;
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);

  const handleDeletecategory = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/expense-management/${data.id}`);
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
          id="delete-category-modal-title"
          variant="h5"
          sx={{ textAlign: "center" }}
        >
          Delete Category
        </Typography>
        <Stack my={4}>
          <Typography sx={{ textAlign: "center" }}>
            Are you sure you want to delete <b>{data.title}</b> category?
          </Typography>
        </Stack>
        <FooterContainerComponent>
          <Button color="info" onClick={handleClose}>
            Close
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeletecategory}
            loading={loading}
          >
            Delete
          </Button>
        </FooterContainerComponent>
      </BoxComponent>
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
