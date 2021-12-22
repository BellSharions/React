import { useState, useEffect, FC } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal: FC = ({ children }) => {
  const [container] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.getElementById("modal-root")?.appendChild(container);
    container.classList.add("modalRoot__container");
    return () => {
      document.getElementById("modal-root")?.removeChild(container);
    };
  }, []);
  return ReactDOM.createPortal(children, container);
};

export default Modal;
