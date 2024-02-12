import react from 'react';
import Link from 'next/link';
import styles from "./page.module.css";
import fetchTexts from './getTexts';

export default function TextList({ texts }) {
    return (
        <div>
            <div>
                <h1>Text List</h1>
                <Link href="/">
                    <button>Home</button>
                </Link>
            </div>
            <div className={styles.textsContainer}>
                {texts.map((text, index) => (
                    <div key={index} className={styles.indivText}>
                        <h2 className={styles.textTitle}>{text.title}</h2>
                        <p className={styles.textDes}>{text.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const texts = await fetchTexts();

    return {
        props: { texts }, // will be passed to the page component as props
    };
}