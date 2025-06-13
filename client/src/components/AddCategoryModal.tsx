import { useState } from "react";
import { axios } from "@api/axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  styled,
} from "@mui/material";

type AddCategoryModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  getAllData: () => void;
  handleCheckUnique: (value: string) => boolean;
};

enum NameErrorType {
  UNIQUE = "UNIQUE",
  LOWERCASE = "LOWERCASE",
}

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { open, setOpen } = props;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [nameErrorType, setNameErrorType] = useState<null | NameErrorType>(
    null
  );

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);

    if (value === "") {
      setNameErrorType(null);
      return;
    }

    if (!value.match(/^[a-z]+$/)) {
      setNameErrorType(NameErrorType.LOWERCASE);
      return;
    }

    const checkUnique = props.handleCheckUnique(value);
    console.log(checkUnique);
    if (checkUnique) {
      setNameErrorType(NameErrorType.UNIQUE);
      return;
    }

    setNameErrorType(null);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
          <Stack spacing={2} p={4}>
            <FormControl>
              <InputLabel htmlFor="category-name">Category Name</InputLabel>
              <Input
                id="category-name"
                aria-describedby="name-helper-text"
                onChange={handleChangeName}
                value={name}
              />
              {nameErrorType && (
                <FormHelperText id="name-helper-text" sx={{ color: "red" }}>
                  {nameErrorType === NameErrorType.UNIQUE
                    ? "name must be unique"
                    : nameErrorType === NameErrorType.LOWERCASE
                      ? "name must be lowercase"
                      : ""}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="category-title">Category Title</InputLabel>
              <Input
                id="category-title"
                onChange={handleChangeTitle}
                value={title}
              />
            </FormControl>
          </Stack>
          <FooterContainerComponent>
            <Button
              color="success"
              variant="outlined"
              sx={{ mr: "8px" }}
              onClick={handleAddcategory}
              loading={loading}
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
