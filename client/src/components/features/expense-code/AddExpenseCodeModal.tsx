import { useEffect, useMemo, useState } from "react";
import { Box, Stack, styled, Typography } from "@mui/material";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import { useAddExpenseCodeMutation } from "@components/features/expense-code/mutation";
import type { ExpenseCodesProps } from "@src/types";

type AddExpenseCodeModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: { id: string; expense_codes: ExpenseCodesProps[] };
};

enum CodeErrorType {
  REQUIRED = "REQUIRED",
  UNIQUE = "UNIQUE",
  ALPHANUMERIC = "ALPHANUMERIC",
}

const AddExpenseCodeModal = (props: AddExpenseCodeModalProps) => {
  const { open, setOpen, data } = props;
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [codeError, setCodeError] = useState<null | CodeErrorType>(null);

  const { mutateAsync: addExpenseCodeMutateAsync, isPending } =
    useAddExpenseCodeMutation();

  const disabledButton = descriptionError || !!codeError;

  const handleClose = () => {
    setOpen(false);
    setDescription("");
    setCode("");
  };

  const handleAddExpenseCode = async () => {
    await addExpenseCodeMutateAsync({ categoryId: data.id, code, description });
    handleClose();
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
  };

  const handleCheckUniqueCode = useMemo(() => {
    const existingCode = data.expense_codes.findIndex(
      (item) => item.code.toLowerCase() === code.toLowerCase()
    );
    return existingCode && existingCode < 0;
  }, [code, data.expense_codes]);

  const codeHelperText = useMemo(() => {
    switch (codeError) {
      case CodeErrorType.UNIQUE:
        return "code must be unique.";
      case CodeErrorType.REQUIRED:
        return "code is required.";
      case CodeErrorType.ALPHANUMERIC:
        return "code must be alphanumeric and not more than 20 characters.";
      default:
        break;
    }
  }, [codeError]);

  useEffect(() => {
    if (code.trim() === "") {
      setCodeError(CodeErrorType.REQUIRED);
      return;
    }

    if (
      !code.match(/^(?:(?=[a-zA-Z]*[0-9])(?=[0-9]*[a-zA-Z])[A-Za-z0-9]{2,20})$/)
    ) {
      setCodeError(CodeErrorType.ALPHANUMERIC);
      return;
    }

    if (!handleCheckUniqueCode) {
      setCodeError(CodeErrorType.UNIQUE);
      return;
    }

    setCodeError(null);
  }, [code, handleCheckUniqueCode, props]);

  useEffect(() => {
    if (description.trim() === "") {
      setDescriptionError(true);
      return;
    }

    setDescriptionError(false);
  }, [description]);

  return (
    <Modal open={open} handleClose={handleClose}>
      <BoxComponent>
        <Typography
          id="add-expense-code-modal-title"
          variant="h5"
          sx={{ textAlign: "center" }}
        >
          Add Expense Code
        </Typography>
        <Stack spacing={2} p={4}>
          <Input
            id="code"
            label="Code"
            onChange={handleChangeCode}
            value={code}
            helperText={codeHelperText}
          />
          <Input
            id="description"
            label="Description"
            onChange={handleChangeDescription}
            value={description}
            helperText={descriptionError ? "description is required." : ""}
          />
        </Stack>
        <FooterContainerComponent>
          <Button color="info" onClick={handleClose}>
            Close
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={handleAddExpenseCode}
            loading={isPending}
            aria-label="submit"
            disabled={disabledButton}
          >
            Submit
          </Button>
        </FooterContainerComponent>
      </BoxComponent>
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
