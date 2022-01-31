import { FC } from "react";
import { ProfileProps } from "@/types/types";
import "./profile.scss";
import TextAreaContainer from "@/elements/textAreaContainer";
import InputTextContainer from "@/elements/inputTextContainer";

const ProfilePage: FC<ProfileProps> = ({
  userName,
  profilePic,
  saveHandler,
  userNameGetter,
  profilePicHandler,
  name,
  message,
  message2,
  descriptionGetter,
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
        <img className="profilePage__picSection_pic" src={profilePic} alt="" />
        <input type="file" className="profilePage__picSection_changePicBtn" onChange={(e) => profilePicHandler(e)} />
        <div>
          <span className="error__message">{message2}</span>
        </div>
      </div>
      <div className="profilePage__editSection">
        <InputTextContainer name="Username" id="UserName" type="text" onChange={userNameGetter} value={name} />
        <span>{message}</span>
        <TextAreaContainer
          name="Profile description"
          id="Description"
          onChange={descriptionGetter}
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
