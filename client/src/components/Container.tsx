import { styled, type SxProps } from "@mui/material";

type ContainerProps = {
  children?: React.ReactNode;
  sx?: SxProps;
};

const Container = (props: ContainerProps) => {
  return (
    <ContainerComponent
      sx={{ ...{ padding: { md: "10vw 10vw", xs: "5vw 5vw" } }, ...props.sx }}
    >
      {props.children}
    </ContainerComponent>
  );
};

export default Container;

const ContainerComponent = styled("div")({});
