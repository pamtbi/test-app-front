
import { useState, createContext, FC, useContext } from "react";
import { Button } from "@/components/Button";
import style from "./style.module.sass";
import {deleteData} from "@/utils/deleteData"
import {link} from "@/utils/link"
import {useUser} from "@/providers/userProvider"

interface ModalContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
  children: React.ReactNode;
};

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const userProvider = useUser();

  const closeModal = () => {
    setOpen(false);
    setMessage("");
    setName("");
    setId("");
  };

  const deleteUser = async (str: string) => {
    try {
      const {data} = await deleteData(link(str), userProvider?.token);

      setMessage(data.message);

    } catch (err) {
      closeModal();
      console.error(err);
    }
  }

  if(userProvider?.user?.role !== "admin") return (
    <ModalContext.Provider value={{ setOpen, open, name, setName, id, setId, message, setMessage }}>
      {children}
    </ModalContext.Provider>
  );

  return (
    <ModalContext.Provider value={{ setOpen, open, name, setName, id, setId, message, setMessage }}>
      {open && (
        <div className="overlay">
          <div className={style.modal}>
            <button onClick={closeModal} className={style.close}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </button>
            <h2>
              {message ? message : `Видалити ${name}?`}
            </h2>
            <div className={style.buttons}>
              {message && <Button onClick={closeModal}>Ок</Button>}
              {!message && (
                <>
                  <Button onClick={closeModal}>Ні</Button>
                  <Button onClick={() => deleteUser(`/api/admin/users/${id}`)}>Так</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <Button className={style.deleteUser} onClick={() => {
        setOpen(true);
        setName("всіх користувачів");
        setId("");
      }}>
        Видалити всіх користувачів
      </Button>
      <div className={style.container}>
        {children}
      </div>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType | null => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    console.error("useModal must be used within a ModalProvider");
    return null;
  }
  return context;
};
