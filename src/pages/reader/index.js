'use client'; //stephen is a nerd, and he wants to use strict mode because he's a nerd

import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import styles from "./page.module.css";
import fs from 'fs';
import path from 'path';
import getTranslation from './getTranslation';

export default function Reader({text}) {
   
    const lines = text.split("\n");
    const [selectedWord, setSelectedWord] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [translation, setTranslation] = useState('');
    const wordBoxRef = useRef(null);

    const handleWordClick = (event) => {
        //stops from propagating to the parent element
        event.stopPropagation();
        //get rid of caps, spaces, and punctuation, excluding Spanish, French, and Cyrillic characters
        const word = event.target.innerText.toLowerCase().replace(/[^a-z0-9áéíóúüñçàèéêëîïôœæøåæøå]/gi, '');
        console.log(`You clicked on the word: ${word}`);
        setSelectedWord(word);
        
        const x = event.pageX;
        let y = event.pageY;

        // Check if the wordBox would overflow the bottom of the page
        if (wordBoxRef.current && y + wordBoxRef.current.offsetHeight > window.innerHeight) {
            // If it would, position it above the cursor instead
            y -= wordBoxRef.current.offsetHeight;
        }

        setPosition({ x, y });
    }

    const handleDivClick = () => {
        setSelectedWord(null);
    }

    useEffect(() => {
        if (selectedWord) {
            getTranslation(selectedWord).then(result => {
                setTranslation(result);
            });
        }
    }, [selectedWord]);

    return (
        <div onClick={handleDivClick}>
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
                    ref={wordBoxRef}
                    className={styles.wordBox} 
                    style={{ position: 'absolute', left: `${position.x + 18}px`, top: `${position.y + 18}px` }}
                >
                    <p>Selected Word: {selectedWord}</p>
                    <p>Translation: {translation}</p>
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