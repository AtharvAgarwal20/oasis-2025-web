import { useState } from "react";
import styles from "./ConfirmModal.module.scss";
import axios from "axios";
import { useCookies } from "react-cookie";

import ReactDOM from "react-dom";

type PropsType = {
  onCancel: () => void;
  selectedEvents: { id: number; name: string }[];
  userData: any;
};

const Backdrop = () => {
  return <div className={styles.backdrop} />;
};

const Confirmation = (props: PropsType) => {
  const { onCancel, selectedEvents, userData } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [access_token, setAccess_token] = useState("");
  const [notification, setNotification] = useState({
    showSelection: true,
    isError: false,
    message: "",
  });

  const [cookies] = useCookies(["Access_token", "user-auth"]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const reqData = {
      ...userData,
      access_token: cookies["Access_token"],
    };
    axios
      .post(
        "https://bits-oasis.org/2025/main/registrations/register/",
        reqData
      )
      .then((response) => {
        setIsSubmitting(false);
        if (response.data.message === "User has been registered") {
          setAccess_token(response.data.tokens.access);
          setNotification({
            showSelection: false,
            isError: false,
            message: "Registration Successful.",
          });
        } else {
          setNotification({
            showSelection: false,
            isError: true,
            message: response.data.message || response.data.error,
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error registering:", error);
        setNotification({
          showSelection: false,
          isError: true,
          message:
            error.response.data.message ||
            error.response.data.error ||
            "Registration Failed.",
        });
      });
  };

  return (
    <div
      className={
        styles.selectedEvents +
        " " +
        (notification.showSelection ? "" : styles.error)
      }
    >
      {notification.showSelection ? (
        <>
          <h2 className={styles.heading}>Your Selected Events :</h2>
          <ul>
            {selectedEvents.map((event) => (
              <li key={event.id}>{event.name}</li>
            ))}
          </ul>
          <div className={styles.buttonsContainer}>
            <button onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
            <button className={styles.confirmButton} onClick={handleSubmit}>
              {isSubmitting ? "Submitting..." : "Confirm"}
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{notification.message}</p>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.confirmButton}
              onClick={() => {
                if (notification.isError) {
                  onCancel();
                } else {
                  window.location.href = `https://bits-oasis.org/2025/main/registrations?token=${access_token}`;
                }
              }}
            >
              {notification.isError ? "Return" : "Dashboard"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

function ConfirmModal(props: PropsType) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <Confirmation
          userData={props.userData}
          onCancel={props.onCancel}
          selectedEvents={props.selectedEvents}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
}

export default ConfirmModal;
