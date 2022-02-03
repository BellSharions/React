import { availableAges, availableGenres } from "@/constants";
import { Game } from "@/types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import TextAreaContainer from "../common/textAreaContainer";
import InputText from "../common/inputTextContainer";
import BtnContainer from "../common/buttonContainer";
import "./gameModal.scss";

export interface GameModalProps {
  closeHandler: () => void;
  gameToEdit: Game;
  imgUrlInp: string;
  titleInp: string;
  onTitleChanged: (nameData: string | number) => void;
  categoryInp: string;
  setCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPriceChanged: (price: number | string) => void;
  priceInp: number;
  onImgUrlChanged: (imgUrlData: string | number) => void;
  onDescriptionChanged: (inputName: string) => void;
  descriptionInp: string;
  ageInp: number;
  setAge: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pcCheckedInp: boolean;
  pcCheckHandler: () => void;
  psCheckedInp: boolean;
  psCheckHandler: () => void;
  xbxCheckedInp: boolean;
  xbxCheckHandler: () => void;
  formValid: boolean;
  submitHandlerEdit: () => void;
  submitHandlerCreate: () => void;
  deleteHandler: () => void;
  visible: boolean;
}

const gameModal: React.FC<GameModalProps> = ({
  closeHandler,
  imgUrlInp,
  titleInp,
  onTitleChanged,
  onPriceChanged,
  priceInp,
  categoryInp,
  setCategory,
  onImgUrlChanged,
  onDescriptionChanged,
  descriptionInp,
  setAge,
  ageInp,
  pcCheckedInp,
  pcCheckHandler,
  psCheckedInp,
  psCheckHandler,
  xbxCheckedInp,
  xbxCheckHandler,
  submitHandlerEdit,
  submitHandlerCreate,
  deleteHandler,
  visible,
}) => (
  <div className="editModal__container">
    <button className="modal_close-btn" type="button" onClick={closeHandler}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
    <div className="editModal__content_container">
      <div className="editModal__contentImg_container">
        <p className="editModal__contentImg_title">Card image</p>
        <img className="editModal__contentImg_img" src={imgUrlInp} alt={`Here will be pic of game ${titleInp}`} />
      </div>
      <div className="editModal__contentForm_container">
        <p className="editModal__contentForm_title">Information</p>
        <form className="editModal__contentForm_form">
          <InputText name="Name" id="titleInput" type="text" onChange={onTitleChanged} value={titleInp} />
          <div className="criteria__label">
            <p className="criteria__title">Genre</p>
            <select className="criteria__selector" id="criteria" value={categoryInp} onChange={(e) => setCategory(e)}>
              {availableGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <InputText name="Price" id="priceInput" type="number" onChange={onPriceChanged} value={priceInp} />
          <InputText name="Image" id="imgUrlInput" type="text" onChange={onImgUrlChanged} value={imgUrlInp} />
          <TextAreaContainer
            name="Description"
            id="Description"
            onChange={onDescriptionChanged}
            value={descriptionInp}
          />
          <div className="criteria__label">
            <p className="criteria__title">Age</p>
            <select className="criteria__selector" id="age" onChange={setAge} value={ageInp}>
              {availableAges.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
          <p className="editModal__contentForm_platformTitle">Platform</p>
          <FormControlLabel control={<Checkbox checked={pcCheckedInp} onChange={pcCheckHandler} />} label="PC" />
          <FormControlLabel
            control={<Checkbox checked={psCheckedInp} onChange={psCheckHandler} />}
            label="PlayStation"
          />
          <FormControlLabel
            control={<Checkbox value="XBox" checked={xbxCheckedInp} onChange={xbxCheckHandler} />}
            label="XBox"
          />
          <div className="form-btn-container">
            {visible ? (
              <>
                <BtnContainer action={submitHandlerEdit} childrenProps={{ label: "Edit" }} />

                <BtnContainer action={deleteHandler} childrenProps={{ label: "Delete" }} />
              </>
            ) : (
              <BtnContainer action={submitHandlerCreate} childrenProps={{ label: "Submit" }} />
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default gameModal;
