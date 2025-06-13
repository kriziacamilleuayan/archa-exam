import { styled, type SxProps } from "@mui/material";

type ContainerProps = {
  children?: React.ReactNode;
  sx?: SxProps;
};

const Container = (props: ContainerProps) => {
  return (
    <ContainerComponent
      sx={{
        ...{
          padding: { md: "5vw 0", xs: "5vw 5vw" },
          width: { lg: "50%", md: "75%", sm: "100%" },
        },
        ...props.sx,
      }}
    >
      {props.children}
    </ContainerComponent>
  );
};

export default Container;

const ContainerComponent = styled("div")({
  margin: "0 auto",
});
