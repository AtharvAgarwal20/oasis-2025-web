import { forwardRef } from "react";
import styles from "./Instructions.module.scss";

type PropsType = {
  onGoogleSignIn: () => void;
};

const Instructions = forwardRef<HTMLDivElement, PropsType>(
  ({ onGoogleSignIn }, ref) => {
    return (
      <div className={styles.content} ref={ref}>
        <h1 className={styles.heading}>INSTRUCTIONS</h1>
        <ul className={styles.instr}>
          <li>
            Complete the registration form with all required details. You'll be
            able to login through your registered email id when required.
          </li>
          <li>All team members are required to register separately.</li>
          <li>
            A College Representative (CR) will be appointed for each college
            who'll be responsible for allotting heads for all the societies the
            college will be participating for.
          </li>
          <li>All prof shows are free. </li>
          <li>
            For further details contact, Parimal: 8638304074, Ishita: 7804051996
          </li>
          <li>For detailed Instructions click here</li>
        </ul>

        <button className={styles.googleButton} onClick={onGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    );
  }
);

export default Instructions;