import styles from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>AdminPanel</h1>
      <GiHamburgerMenu color="#fff" size={24} />
    </header>
  );
};

export default Header;
