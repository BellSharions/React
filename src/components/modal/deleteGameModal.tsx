import BtnContainer from "@/elements/buttonContainer";
import { DeleteGameModalProps } from "@/types/types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./deleteGameModal.scss";

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({ closeHandler, deleteHandler }) => (
  <div className="deleteModal__container">
    <button className="modal_close-btn" type="button" onClick={() => closeHandler()}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
    <div className="deleteModal__content_container">
      <p>Are you sure you want to delete this product?</p>
      <div className="deleteModal_close-btn">
        <BtnContainer action={() => deleteHandler()} childrenProps={{ label: "Yes" }} />
      </div>
    </div>
  </div>
);

export default DeleteGameModal;
