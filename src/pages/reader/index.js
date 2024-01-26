'use client'; //stephen is a nerd, and he wants to use strict mode because he's a nerd

import {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from "./page.module.css";
import fs from 'fs';
import path from 'path';
import getTranslation from './getTranslation';

export default function Reader({text}) {
   
    const lines = text.split("\n");
    const [selectedWord, setSelectedWord] = useState('null');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [translation, setTranslation] = useState('');

    const handleWordClick = (word) => {
        //get rid of caps, spaces, and punctuation, excluding Spanish, French, and Cyrillic characters
        word = word.target.innerText.toLowerCase().replace(/[^a-z0-9áéíóúüñçàèéêëîïôœæøåæøå]/gi, '');
        console.log(`You clicked on the word: ${word}`);
        setSelectedWord(word);
        setPosition({ x: event.clientX, y: event.clientY });
    }

    useEffect(() => {
        if (selectedWord) {
            getTranslation(selectedWord).then(result => {
                setTranslation(result);
            });
        }
    }, [selectedWord]);

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
                            <>
                            <span key={`word_${wordIndex}`} className={styles.word} id={word.toLowerCase()} onClick={handleWordClick}>
                                {word}
                            </span>
                            {" "}
                            </>
                        ))}
                        <br />
                    </div>
                ))}
            </div>
            {selectedWord && (
                <div 
                    className={styles.wordBox} 
                    style={{ position: 'absolute', left: `${position.x + 10}px`, top: `${position.y + 10}px` }}
                >
                    <p>Selected Word: {selectedWord}</p>
                    <p>Translation: {getTranslation(selectedWord)}</p>
                </div>
            )}
        </div>
    );
}

export async function getStaticProps() {
    const filePath = 'text.txt';
    const text = fs.readFileSync(filePath, 'utf8');

    return {
        props: { text }, // will be passed to the page component as props
    };
}