import {
  Backdrop,
  Box,
  Fade,
  Modal as ModalComponent,
  styled,
  type ModalProps as ModalComponentProps,
} from "@mui/material";

type ModalProps = ModalComponentProps & {
  open: boolean;
  handleClose: () => void;
};

const Modal = (props: ModalProps) => {
  const { open, handleClose } = props;

  return (
    <ModalComponent
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <BoxComponent>{props.children}</BoxComponent>
      </Fade>
    </ModalComponent>
  );
};

export default Modal;

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
