import { ChangeEvent, FC } from "react";
import "./profile.scss";
import TextAreaContainer from "@/elements/textAreaContainer";
import InputTextContainer from "@/elements/inputTextContainer";

export interface ProfileProps {
  userName: string;
  profilePic: string;
  saveHandler: (e: React.SyntheticEvent) => Promise<void>;
  onUserNameChange: (value: string) => void;
  profilePicHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  message: string;
  additionalMessage: string;
  onDescriptionChange: (value: string) => void;
  description: string;
  formValid: boolean;
  action: () => void;
}

const ProfilePage: FC<ProfileProps> = ({
  userName,
  profilePic,
  saveHandler,
  onUserNameChange,
  profilePicHandler,
  name,
  message,
  additionalMessage,
  onDescriptionChange,
  description,
  formValid,
  action,
}) => (
  <div className="profilePage__container">
    <section className="profilePage__upperSectiopn">
      <h1 className="profilePage__userName_title">{userName}</h1>
    </section>
    <form className="profilePage__lowerSection" onSubmit={saveHandler}>
      <div className="profilePage__picSection">
        <img className="profilePage__picSection_pic" src={profilePic} alt="Loading" />
        <input type="file" className="profilePage__picSection_changePicBtn" onChange={profilePicHandler} />
        <div>
          <span className="error__message">{additionalMessage}</span>
        </div>
      </div>
      <div className="profilePage__editSection">
        <InputTextContainer name="Username" id="user-name" type="text" onChange={onUserNameChange} value={name} />
        <span>{message}</span>
        <TextAreaContainer
          name="Profile description"
          id="description"
          onChange={onDescriptionChange}
          value={description}
        />
      </div>
      <div className="profilePage__btnsSection">
        <input type="submit" className="profilePage__btnsSection_saveBtn" value="Save profile" disabled={!formValid} />
        <button type="button" className="profilePage__btnsSection_changePassBtn" onClick={action}>
          <p>Change password</p>
        </button>
      </div>
    </form>
  </div>
);

export default ProfilePage;
