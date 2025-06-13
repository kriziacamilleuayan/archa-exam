import {
  FormControl,
  type SxProps,
  type TextFieldProps,
  styled,
  TextField,
  FormLabel,
} from "@mui/material";

type InputTextProps = TextFieldProps & {
  formlabel?: string;
  formlabelid?: string;
  formControlStyle?: SxProps;
  helperText?: string;
};

const Input = (props: InputTextProps) => {
  return (
    <FormControl fullWidth>
      <FormLabelComponent id={props.formlabelid}>
        {props.formlabel}
      </FormLabelComponent>
      <InputComponent variant="outlined" fullWidth {...props} />
    </FormControl>
  );
};

export default Input;

const InputComponent = styled(TextField)({});
const FormLabelComponent = styled(FormLabel)({});
