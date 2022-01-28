import { useState, useEffect, FC, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUsernameAction, showChangePassModalAction } from "../redux/actions";
import { ReducerState } from "../redux/reducer";
import "./profile.scss";
import ProfilePage from "./profile";

const ProfilePageContainer: FC = () => {
  const userName = useSelector((state: ReducerState) => state.reducer.userName);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [imageMessage, setUploadMessage] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [formValid, setFormValid] = useState(false);
  const dispatch = useDispatch();
  const changePassword = () => {
    dispatch(showChangePassModalAction());
  };
  const userNameGetter = (inputName: string) => {
    setName(inputName);
  };
  const descriptionGetter = (inputName: string) => {
    setDescription(inputName);
  };
  const profilePicGetter = async () => {
    await fetch(`http://localhost:8080/user/?login=${userName}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setProfilePic(data.profilePic);
      });
  };
  useEffect(() => {
    profilePicGetter();
  }, []);
  const profilePicHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "mpuznhgs");
    await fetch(`https://api.cloudinary.com/v1_1/dev3afzlt/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((err) => console.log(err))
      .then(async (data) => {
        if (data.error !== undefined) {
          setUploadMessage("An error has been encountered while uploading the image");
        } else {
          const { url } = data;
          await fetch(`http://localhost:8080/upload/${userName}`, {
            method: "POST",
            body: url,
          }).then(() => setProfilePic(url));
        }
      });
  };

  const userObj = { login: name, description };

  useEffect(() => {
    if (!name) {
      setFormValid(false);
      setMessage("Please enter new login");
    } else if (name.length < 3 || name.length > 12) {
      setFormValid(false);
      setMessage("New login must be between 3 and 12 characters");
    } else {
      setFormValid(true);
      setMessage("New login is OK");
      if (description.length === 0) {
        setFormValid(false);
        setMessage("Please enter new description");
      }
    }
  }, [name, description]);

  async function saveHandler(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }
    await fetch(`http://localhost:8080/user/${userName}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== userName) {
          dispatch(changeUsernameAction(data));
        } else setMessage("Please use a different user name");
      });
  }

  return (
    <ProfilePage
      userName={userName}
      profilePic={profilePic}
      saveHandler={saveHandler}
      userNameGetter={userNameGetter}
      profilePicHandler={profilePicHandler}
      name={name}
      message={message}
      message2={imageMessage}
      descriptionGetter={descriptionGetter}
      description={description}
      formValid={formValid}
      action={changePassword}
    />
  );
};

export default ProfilePageContainer;
