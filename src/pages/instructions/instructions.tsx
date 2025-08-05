import React from "react";
import styles from "./instructions.module.scss";


const instructions = () => {
  return (
    <div className={styles.instrback}>
      <div className={styles.birds}></div>
      <h1 className={styles.heading}>INSTRUCTIONS</h1>
      <div className={styles.instr}>
      <p>✦ Complete the registration form with all required details. 
    You'll be able to login through your registered email id 
    when required.</p>
    <p>✦ All team members are required to register separately.</p>
    <p>✦ A College Representative (CR) will be appointed for each 
    college who'll be responsible for allotting heads for all 
    the societies the college will be participating for.</p>
    <p>✦ All prof shows are free. </p>
    <p>✦ For further details contact, Parimal: 8638304074, 
     Ishita: 7804051996</p>
     <p>✦ For detailed instructions click here </p>
    </div>
    </div>
  )
}

export default instructions

