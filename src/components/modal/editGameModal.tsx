import { availableGenres } from "@/constants/constants";
import BtnContainer from "@/elements/buttonContainer";
import InputText from "@/elements/inputTextContainer";
import TextAreaContainer from "@/elements/textAreaContainer";
import { EditGameModalProps } from "@/types/types";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import "./editGameModal.scss";

const EditGameModal: React.FC<EditGameModalProps> = (props) => (
  <div className="editModal__container">
    <div className="editModal__content_container">
      <div className="editModal__contentImg_container">
        <p className="editModal__contentImg_title">Card image</p>
        <img
          className="editModal__contentImg_img"
          src={props.imgUrlInp}
          alt={`Here will be pic of game ${props.titleInp}`}
        />
      </div>
      <div className="editModal__contentForm_container">
        <p className="editModal__contentForm_title">Information</p>
        <form className="editModal__contentForm_form">
          <InputText name="Name" id="titleInput" type="text" onChange={props.titleGetter} value={props.titleInp} />
          <label htmlFor="criteria" className="criteriaSelector__label">
            <p className="criteriaSelector__item_title">Genre</p>
            <select className="criteriaSelector__selector" id="criteria">
              {availableGenres.map((genre) => (
                <option value={genre}>{genre}</option>
              ))}
            </select>
          </label>
          <InputText name="Price" id="priceInput" type="number" onChange={props.priceGetter} value={props.priceInp} />
          <InputText name="Image" id="imgUrlInput" type="text" onChange={props.imgUrlGetter} value={props.imgUrlInp} />
          <TextAreaContainer
            name="Description"
            id="Description"
            onChange={props.descriptionGetter}
            value={props.descriptionInp}
          />
          <p className="editModal__contentForm_platformTitle">Platform</p>
          <FormControlLabel
            control={<Checkbox checked={props.pcCheckedInp} onChange={props.pcCheckHandler} />}
            label="PC"
          />
          <FormControlLabel
            control={<Checkbox checked={props.psCheckedInp} onChange={props.psCheckHandler} />}
            label="PlayStation"
          />
          <FormControlLabel
            control={<Checkbox value="XBox" checked={props.xbxCheckedInp} onChange={props.xbxCheckHandler} />}
            label="XBox"
          />
          <BtnContainer action={props.submitHandlerEdit} childrenProps={{ label: "Submit" }} />
          <BtnContainer action={props.deleteHandler} childrenProps={{ label: "Delete" }} />
        </form>
      </div>
    </div>
  </div>
);

export default EditGameModal;
