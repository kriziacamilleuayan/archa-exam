import { type ButtonProps, styled, Button as MuiButton } from "@mui/material";

type InputButtonProps = ButtonProps & {};

const Button = (props: InputButtonProps) => {
  return (
    <ButtonComponent variant="outlined" {...props}>
      {props.children}
    </ButtonComponent>
  );
};

export default Button;

const ButtonComponent = styled(MuiButton)({
  fontWeight: 400,
  margin: "0 4px",

  ":disabled": {
    backgroundColor: "#e2e2e2",
    border: `1px solid #e2e2e2`,
  },
});
