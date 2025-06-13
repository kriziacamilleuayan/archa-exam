import { useState } from "react";
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
import { axios } from "@api/axios";

type AddExpenseCodeModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: { id: string };
  getAllData: () => void;
};

const AddExpenseCodeModal = (props: AddExpenseCodeModalProps) => {
  const { open, setOpen, data } = props;
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const handleClose = () => setOpen(false);

  const handleAddExpenseCode = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/expense-management/${data.id}/expense-codes`, {
        code,
        description,
      });
      await props.getAllData();
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCode(value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setDescription(value);

    if (value === "") {
      setDescriptionError(true);
      return;
    }

    setDescriptionError(false);
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
          <Stack spacing={2} p={4}>
            <FormControl>
              <InputLabel htmlFor="category-name">Code</InputLabel>
              <Input
                id="category-name"
                aria-describedby="name-helper-text"
                onChange={handleChangeCode}
                value={code}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="category-title">Description</InputLabel>
              <Input
                id="category-title"
                aria-describedby="desc-helper-text"
                onChange={handleChangeDescription}
                value={description}
              />
              {descriptionError && (
                <FormHelperText id="desc-helper-text" sx={{ color: "red" }}>
                  required
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
          <FooterContainerComponent>
            <Button
              color="success"
              variant="outlined"
              sx={{ mr: "8px" }}
              onClick={handleAddExpenseCode}
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
