import styles from "./Navbar.module.scss";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.hamMenuBtn}></div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.label} className={styles.navItem}>
            <a href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
