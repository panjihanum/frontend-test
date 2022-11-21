import styles from "./index.module.css";
import { RiCloseLine } from "react-icons/ri";

interface ModalInterface {
    setIsOpen: (x: boolean) => void;
    onDelete?: () => void;
    onCancel?: () => void;
    children?: React.ReactNode;

}

const Modal = ({ setIsOpen, onDelete, onCancel, children }: ModalInterface) => {
    return (
        <div className={styles.darkBG} onClick={() => setIsOpen && setIsOpen(false)} >
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    {children}
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            {onDelete && (
                                <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                                    Delete
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    className={styles.cancelBtn}
                                    onClick={onCancel}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Modal;