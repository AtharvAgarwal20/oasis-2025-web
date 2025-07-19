import styles from "./Navbar.module.scss";
import gateHam from "/svgs/landing/gateHam.svg";
import hamLines from "/svgs/landing/hamLines.svg";

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
        <img src={gateHam} alt="" className={styles.gates} />
        <img src={hamLines} alt="" className={styles.ham} />
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
