import BtnContainer from "@/elements/buttonContainer";
import { DeleteGameModalProps } from "@/types/types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./editGameModal.scss";

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({ closeHandler, deleteHandler }) => (
  <div className="editModal__container">
    <button className="modal_close-btn" type="button" onClick={() => closeHandler()}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
    <div className="editModal__content_container">
      <BtnContainer action={() => deleteHandler()} childrenProps={{ label: "Yes" }} />
    </div>
  </div>
);

export default DeleteGameModal;
