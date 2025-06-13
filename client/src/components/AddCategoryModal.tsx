import { useEffect, useMemo, useState } from "react";
import { axios } from "@api/axios";
import { Box, Stack, styled, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import Input from "@components/Input";
import Button from "@components/Button";
import Modal from "@components/Modal";

enum NameErrorType {
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
  LOWERCASE = "LOWERCASE",
}

type AddCategoryModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  getAllData: () => void;
  handleCheckUnique: (value: string) => boolean;
};

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { open, setOpen } = props;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [nameErrorType, setNameErrorType] = useState<null | NameErrorType>(
    null
  );
  const disabledButton = !!nameErrorType;

  const handleClose = () => {
    setOpen(false);
    setName("");
    setTitle("");
  };

  const handleAddcategory = async () => {
    try {
      setLoading(true);
      await axios.post("/api/expense-management", {
        name,
        title,
      });
      await props.getAllData();
      setLoading(false);
      handleClose();

      enqueueSnackbar(`Successfully added Category ${title}.`, {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (err) {
      enqueueSnackbar(
        `handleAddcategory ERROR: ${(err as any).request.response} `,
        { variant: "error", autoHideDuration: 3000 }
      );
    }
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

  useEffect(() => {
    if (name.trim() === "") {
      setNameErrorType(NameErrorType.REQUIRED);
      return;
    }

    if (!name.match(/^[a-z ]+$/)) {
      setNameErrorType(NameErrorType.LOWERCASE);
      return;
    }

    if (props.handleCheckUnique(name)) {
      setNameErrorType(NameErrorType.UNIQUE);
      return;
    }

    setNameErrorType(null);
  }, [name, props]);

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
            formlabel="Category Name"
            formlabelid="category-name"
            onChange={handleChangeName}
            value={name}
            helperText={nameHelperText}
          />

          <Input
            formlabel="Category Title"
            formlabelid="category-title"
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
            loading={loading}
            disabled={disabledButton}
          >
            Add
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
