import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

type SuccessModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  description?: string;
};

const SuccessModal = (props: SuccessModalProps) => {
  const { open, setOpen } = props;

  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="success-modal-title"
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
          <Typography id="success-modal-title" variant="h6" component="h2">
            Success
          </Typography>
          <Typography>{props.description}</Typography>
        </BoxComponent>
      </Fade>
    </Modal>
  );
};

export default SuccessModal;

const BoxComponent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#fff",
  border: "2px solid #000",
  padding: "24px",
});
