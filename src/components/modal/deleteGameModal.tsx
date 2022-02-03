import BtnContainer from "@/elements/buttonContainer";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./deleteGameModal.scss";

export interface DeleteGameModalProps {
  closeHandler: () => void;
  deleteHandler: () => Promise<void>;
}

const DeleteGameModal: React.FC<DeleteGameModalProps> = ({ closeHandler, deleteHandler }) => (
  <div className="deleteModal__container">
    <button className="modal_close-btn" type="button" onClick={closeHandler}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
    <div className="deleteModal__content_container">
      <p>Are you sure you want to delete this product?</p>
      <div className="deleteModal__button_container">
        <div className="deleteModal_close-btn">
          <BtnContainer action={deleteHandler} childrenProps={{ label: "Yes" }} />
        </div>
        <div className="deleteModal_close-btn">
          <BtnContainer action={closeHandler} childrenProps={{ label: "No" }} />
        </div>
      </div>
    </div>
  </div>
);

export default DeleteGameModal;
