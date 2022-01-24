import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModalAction } from "../redux/actions";
import { ReducerState } from "../redux/reducer";
import ChangePassModalBody from "./passwordModalBody";

const ChangePassModalBodyContainer: FC = () => {
  const userName = useSelector((state: ReducerState) => state.reducer.userName);
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [passMessage, setPassMessage] = useState("Please enter new password");
  const [repeatPassMessage, setRepeatPassMessage] = useState("Please enter password");
  const [formValid, setFormValid] = useState(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(closeModalAction());
  };

  const passwordGetter = (passwordData: string) => {
    setNewPassword(passwordData);
  };

  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatNewPassword(passwordData);
  };

  useEffect(() => {
    const alphNumPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!newPassword) setPassMessage("Please enter password");
    else if (newPassword.length < 8 || newPassword.length > 15)
      setPassMessage("Password must be between 8 and 15 characters");
    else if (newPassword[0].toUpperCase() !== newPassword[0])
      setPassMessage("First character of password must be capital");
    else if (!alphNumPass.test(newPassword))
      setPassMessage("At least 1 character of password must be numeric or alphabetic");
    else setPassMessage("New password is OK");
    if (newPassword !== repeatNewPassword || !repeatNewPassword)
      setRepeatPassMessage("Repeated password in not correct");
    else setRepeatPassMessage("Repeated password is OK");
  }, [newPassword, repeatNewPassword]);

  useEffect(() => {
    if (passMessage === "New password is OK" && repeatPassMessage === "Repeated password is OK") setFormValid(true);
    else setFormValid(false);
  }, [passMessage, repeatPassMessage]);

  async function changeFunc(e: React.SyntheticEvent) {
    if (e) e.preventDefault();
    const patchResponse = await fetch(`http://localhost:8080/passwordChange/${userName}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repeatNewPassword }),
    });
    if (patchResponse.status === 404) throw new Error(`HTTP status: ${patchResponse.status}`);
    dispatch(closeModalAction());
    return null;
  }

  return (
    <ChangePassModalBody
      closeModal={closeModal}
      changeFunc={changeFunc}
      passwordGetter={passwordGetter}
      newPassword={newPassword}
      passMessage={passMessage}
      repeatPasswordGetter={repeatPasswordGetter}
      repeatNewPassword={repeatNewPassword}
      repeatPassMessage={repeatPassMessage}
      formValid={formValid}
    />
  );
};

export default ChangePassModalBodyContainer;
