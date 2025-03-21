import { createContext, ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext({});

function Modal({ children }: { children: ReactNode }) {
  return (
    <ModalContext.Provider value={{}}>
      {createPortal(children, document.body)}
    </ModalContext.Provider>
  );
}

function Body() {
  return <></>;
}

Modal.Body = Body;

export default Modal;
