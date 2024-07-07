import { useSelector, useDispatch } from "react-redux";
import {
  closeModal,
  selectModalType,
  selectModalProps,
  selectModalComponent,
} from "./modalSlice";

const ModalManager: React.FC = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(selectModalType);
  const modalProps = useSelector(selectModalProps);
  const ModalContent = useSelector(selectModalComponent);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {modalType && ModalContent && (
        <ModalContent {...modalProps} onClose={handleClose} />
      )}
    </>
  );
};

export default ModalManager;
