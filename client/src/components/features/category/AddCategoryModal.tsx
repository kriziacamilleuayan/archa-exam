import { useEffect, useMemo, useState } from "react";
import { Box, Stack, styled, Typography } from "@mui/material";

import type { CategoryProps } from "@src/types";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import { useAddCategoryMutation } from "@components/features/category/mutations";
import { useGetAllCategories } from "@components/features/category/queries";

enum NameErrorType {
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
  LOWERCASE = "LOWERCASE",
}

type AddCategoryModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { open, setOpen } = props;
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [nameErrorType, setNameErrorType] = useState<null | NameErrorType>(
    null
  );
  const { mutateAsync: addCategoryMutateAsync, isPending } =
    useAddCategoryMutation();
  const { data: categoryData } = useGetAllCategories();
  const disabledButton = !!nameErrorType;

  const handleClose = () => {
    setOpen(false);
    setName("");
    setTitle("");
  };

  const handleAddcategory = async () => {
    await addCategoryMutateAsync({ name, title });
    handleClose();
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const nameHelperText = useMemo(() => {
    switch (nameErrorType) {
      case NameErrorType.UNIQUE:
        return "name must be unique.";
      case NameErrorType.LOWERCASE:
        return "name must be lowercase.";
      case NameErrorType.REQUIRED:
        return "name is required.";
      default:
        break;
    }
  }, [nameErrorType]);

  const handleCheckUnique = useMemo(() => {
    const existingName =
      categoryData &&
      categoryData.findIndex(
        (item: CategoryProps) => item.name === name.toLowerCase()
      );
    return existingName && existingName < 0;
  }, [categoryData, name]);

  useEffect(() => {
    if (name.trim() === "") {
      setNameErrorType(NameErrorType.REQUIRED);
      return;
    }

    if (!name.match(/^[a-z0-9_][a-z0-9_.]+$/)) {
      setNameErrorType(NameErrorType.LOWERCASE);
      return;
    }

    if (!handleCheckUnique) {
      setNameErrorType(NameErrorType.UNIQUE);
      return;
    }

    setNameErrorType(null);
  }, [handleCheckUnique, name]);

  return (
    <Modal open={open} handleClose={handleClose}>
      <BoxComponent>
        <Typography
          id="add-category-modal-title"
          variant="h5"
          sx={{ textAlign: "center" }}
        >
          Add Category
        </Typography>
        <Stack spacing={2} p={4}>
          <Input
            label="Category Name"
            id="category-name-input"
            onChange={handleChangeName}
            value={name}
            helperText={nameHelperText}
          />

          <Input
            id="category-title"
            label="Category Title"
            onChange={handleChangeTitle}
            value={title}
          />
        </Stack>
        <FooterContainerComponent>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={handleAddcategory}
            aria-label="submit"
            loading={isPending}
            disabled={disabledButton}
          >
            Submit
          </Button>
        </FooterContainerComponent>
      </BoxComponent>
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
