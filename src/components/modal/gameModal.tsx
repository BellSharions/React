import { availableAges, availableGenres } from "@/constants/constants";
import BtnContainer from "@/elements/buttonContainer";
import InputText from "@/elements/inputTextContainer";
import TextAreaContainer from "@/elements/textAreaContainer";
import { EditGameModalProps } from "@/types/types";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import "./gameModal.scss";

const gameModal: React.FC<EditGameModalProps> = ({
  closeHandler,
  imgUrlInp,
  titleInp,
  titleGetter,
  priceGetter,
  priceInp,
  categoryInp,
  setCategory,
  imgUrlGetter,
  descriptionGetter,
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
          <InputText name="Name" id="titleInput" type="text" onChange={titleGetter} value={titleInp} />
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
          <InputText name="Price" id="priceInput" type="number" onChange={priceGetter} value={priceInp} />
          <InputText name="Image" id="imgUrlInput" type="text" onChange={imgUrlGetter} value={imgUrlInp} />
          <TextAreaContainer name="Description" id="Description" onChange={descriptionGetter} value={descriptionInp} />
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
