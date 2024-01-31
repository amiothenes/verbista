import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.titleName}>Verbista</h1>
      <button className={styles.button}>Vocab List</button>
      <Link href="/textlist">
        <button className={styles.button}>Text List</button>
      </Link>
      <Link href="/reader">
        <button className={styles.button}>Reader</button>
      </Link>
    </main>
  );
}
