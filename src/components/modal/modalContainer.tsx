import { FC } from "react";
import { useSelector } from "react-redux";
import Modal from "./modal";
import SignInModalBody from "./signInModalBody";
import SignUpModalBody from "./signUpModalBody";
import { ReducerState } from "../redux/reducer";

const ModalContainer: FC = () => {
  const signInModalVisible = useSelector((state: ReducerState) => state.signInModalVisible);
  const signUpModalVisible = useSelector((state: ReducerState) => state.signUpModalVisible);
  return (
    <>
      {signInModalVisible ? (
        <Modal>
          <SignInModalBody />
        </Modal>
      ) : null}
      {signUpModalVisible ? (
        <Modal>
          <SignUpModalBody />
        </Modal>
      ) : null}
    </>
  );
};

export default ModalContainer;
