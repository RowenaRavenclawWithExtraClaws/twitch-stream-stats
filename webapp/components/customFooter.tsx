import styles from "../styles/Home.module.css";

const CustomFooter = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://streamlabs.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by StreamLabs
      </a>
    </footer>
  );
};

export default CustomFooter;
