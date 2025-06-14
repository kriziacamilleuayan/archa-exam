import { Box, Stack, styled, Typography } from "@mui/material";

import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import { useDeleteCategoryMutation } from "@components/features/category/mutations";

type DeleteCategoryModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: {
    id: string;
    title: string;
  };
};

const DeleteCategoryModal = (props: DeleteCategoryModalProps) => {
  const { open, setOpen, data } = props;
  const { mutateAsync: deleteCategoryMutateAsync, isPending } =
    useDeleteCategoryMutation();

  const handleClose = () => setOpen(false);

  const handleDeletecategory = async () => {
    await deleteCategoryMutateAsync({ id: data.id });
    handleClose();
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
            loading={isPending}
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
