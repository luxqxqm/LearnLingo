interface LoaderProps {
  text?: string;
}

import styles from "./Loader.module.css";

export default function Loader({ text = "Loading..." }: LoaderProps) {
  return (
    <div className={styles.loader}>
      <span className={styles.spinner} />
      <span className={styles.text}>{text}</span>
    </div>
  );
}
