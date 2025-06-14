import {
  FormControl,
  type SxProps,
  type TextFieldProps,
  styled,
  TextField,
} from "@mui/material";

type InputTextProps = TextFieldProps & {
  formlabelid?: string;
  formControlStyle?: SxProps;
  helperText?: string;
};

const Input = (props: InputTextProps) => {
  return (
    <FormControl fullWidth>
      <InputComponent variant="outlined" fullWidth {...props} />
    </FormControl>
  );
};

export default Input;

const InputComponent = styled(TextField)({});
