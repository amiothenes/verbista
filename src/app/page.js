import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Verbista</h1>
      <button>Vocab List</button>
      <button>Text List</button>
      <Link href="/reader">
        <button>Reader</button>
      </Link>
    </main>
  );
}
