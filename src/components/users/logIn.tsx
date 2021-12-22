import { FC, useEffect } from "react";
import "./logIn.scss";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import Modal from "../modal/modal";
import SignInModalBody from "../modal/signInModalBody";
import { LogInPageProps, LocationState } from "../../types/types";

const LogInPage: FC<LogInPageProps> = ({
  logInFunc,
  closeModalFunc,
  showSignInModalFunc,
  showSignInModal,
  logInState,
}) => {
  const { state } = useLocation<LocationState>();
  const history = useHistory();

  const closeModalHandler = () => {
    closeModalFunc();
    history.push("/");
  };

  useEffect(() => {
    showSignInModalFunc();
  }, []);

  return (
    <div className="logInPage__container">
      {logInState ? (
        <Redirect to={state?.from || "/"} />
      ) : (
        <div>
          {showSignInModal ? (
            <Modal>
              <SignInModalBody logInFunc={logInFunc} closeModalFunc={closeModalHandler} />
            </Modal>
          ) : null}
        </div>
      )}
    </div>
  );
};
export default LogInPage;
