'use client'; //stephen is a nerd, and he wants to use strict mode because he's a nerd

import {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from "./page.module.css";

export default function Reader() {
    const [text, setText] = useState('Loading...');
    
    const lines = text.split("\n");
    const [selectedWord, setSelectedWord] = useState('null');

    useEffect(() => {
        fetch('/api/readText')
            .then(response => response.json())
            .then(data => setText(data.text));
    }, []);

    const handleWordClick = (word) => {
        console.log(`You clicked on the word: ${word}`);
        setSelectedWord(word);
    }

    return (
        <div>
            <div>
                <h1>Reader</h1>
            </div>
            <div>
                <Link href="/">
                    <button>Home</button>
                </Link>
            </div>
            <div className={styles.readerText}>
                {lines.map((line, index) => (
                    <div key={`paragraph_${index}`} className={`paragraph_${index}`}>
                        {line.split(" ").map((word, wordIndex) => (
                            <span key={`word_${wordIndex}`} className={styles.word} id={word.toLowerCase()} onClick={handleWordClick()}>
                                {word}{" "}
                            </span>
                        ))}
                        <br />
                    </div>
                ))}
            </div>
            {/* {selectedWord && (
                <div className={styles.wordBox}>
                    {selectedWord}
                </div>
            )} */}
        </div>
    );
}