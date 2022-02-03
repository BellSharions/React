import { useState, useEffect, FC, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "@/apiCall";
import { CallType, cloudinaryUpload, maxSymbols, minSymbols, userGetUrl, userUpload, userUrl } from "@/constants";
import { changeUsernameAction, showChangePassModalAction } from "../redux/actions";
import { ReducerState } from "../redux/reducer";
import "./profile.scss";
import ProfilePage from "./profile";

const ProfilePageContainer: FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [imageMessage, setUploadMessage] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [formValid, setFormValid] = useState(false);
  const userName = useSelector((state: ReducerState) => state.reducer.userName);

  const changePassword = () => {
    dispatch(showChangePassModalAction());
  };

  const onUserNameChange = (inputName: string) => {
    setName(inputName);
  };

  const onDescriptionChange = (inputName: string) => {
    setDescription(inputName);
  };

  useEffect(() => {
    const getProfilePic = async () => {
      const response = await apiCall(userGetUrl + userName, CallType.GET, null);
      if (response.status === 200) setProfilePic(response.data.profilePic);
    };
    getProfilePic();
  }, []);

  const profilePicHandler = async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "mpuznhgs");
    const response = await apiCall(cloudinaryUpload, CallType.POST, formData);
    if (response.status === 200) {
      console.log(response.data.url);

      const postResponse = await apiCall(userUpload + userName, CallType.POST, response.data.url as string);
      if (postResponse.status === 201) setProfilePic(response.data.url);
    }
  };

  const userObj = { login: name, description };

  useEffect(() => {
    if (!name) {
      setFormValid(false);
      setMessage("Please enter new login");
    } else if (name.length < minSymbols || name.length > maxSymbols) {
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
    e.preventDefault();
    const patchResponse = await apiCall(userUrl + userName, CallType.PATCH, userObj);
    if (patchResponse.data !== userName) {
      dispatch(changeUsernameAction(patchResponse.data as string));
    } else setMessage("Please use a different user name");
  }

  return (
    <ProfilePage
      userName={userName}
      profilePic={profilePic}
      saveHandler={saveHandler}
      onUserNameChange={onUserNameChange}
      profilePicHandler={profilePicHandler}
      name={name}
      message={message}
      additionalMessage={imageMessage}
      onDescriptionChange={onDescriptionChange}
      description={description}
      formValid={formValid}
      action={changePassword}
    />
  );
};

export default ProfilePageContainer;
