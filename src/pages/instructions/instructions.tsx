import styles from "./Instructions.module.scss";

const Instructions = () => {
  return (
    <div className={styles.instrback}>
      <div className={styles.birds}>
        <h1 className={styles.header}>REGISTRATION</h1>
      </div>
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
        <li>For detailed Instructions click here </li>
      </ul>
      <button className={styles.googleButton}>SIGN IN WITH GOOGLE</button>
    </div>
  );
};

export default Instructions;
