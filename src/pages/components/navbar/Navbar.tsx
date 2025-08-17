import styles from "./Navbar.module.scss";
import moon from "/svgs/landing/moon1.svg";
import moonHam from "/svgs/landing/moonHam.svg";
import cloud1 from "/svgs/landing/hamClouds/cloud1.min.svg";
import cloud2 from "/svgs/landing/hamClouds/cloud2.min.svg";
import cloud3 from "/svgs/landing/hamClouds/cloud3.min.svg";
import cloud4 from "/svgs/landing/hamClouds/cloud4.min.svg";
import cloud5 from "/svgs/landing/hamClouds/cloud5.min.svg";
import cloud6 from "/svgs/landing/hamClouds/cloud6.min.svg";

const navItems = [
  { label: "Home", katakana: "ホーム", href: "/" },
  { label: "About Us", katakana: "アバウト・アス", href: "/about" },
  { label: "Events", katakana: "イベンツ", href: "/events" },
  { label: "Contact", katakana: "コンタクト", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.hamMenuBtn}>
        <img src={moon} alt="" className={styles.moon} />
        <img src={moonHam} alt="" className={styles.moonHam} />
        <div className={styles.clouds}>
          <img
            src={cloud1}
            alt=""
            className={`${styles.cloud1} ${styles.cloud}`}
          />
          <img
            src={cloud2}
            alt=""
            className={`${styles.cloud2} ${styles.cloud}`}
          />
          <img
            src={cloud3}
            alt=""
            className={`${styles.cloud3} ${styles.cloud}`}
          />
          <img
            src={cloud4}
            alt=""
            className={`${styles.cloud4} ${styles.cloud}`}
          />
          <img
            src={cloud5}
            alt=""
            className={`${styles.cloud5} ${styles.cloud}`}
          />
          <img
            src={cloud6}
            alt=""
            className={`${styles.cloud6} ${styles.cloud}`}
          />
        </div>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.label} className={styles.navItem}>
            <a href={item.href} className={styles.navLink}>
              <div className={styles.actualLabel}>{item.label}</div>
              <div className={styles.katakana}>{item.katakana}</div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
