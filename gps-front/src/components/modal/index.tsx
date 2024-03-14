import Modal from "@mui/material/Modal";
import { StyledModalContent } from "./styles";

type Props = {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  unClosable?: boolean;
};

export const BasicModal = ({ open, setOpen, children, unClosable }: Props) => {
  const handleClose = () => {
    if(unClosable || (!setOpen)) return;
    setOpen(false);
  }

  return (
      <Modal open={open} onClose={handleClose}>
        <StyledModalContent>{children && children}</StyledModalContent>
      </Modal>
  );
};
