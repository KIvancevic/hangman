import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import {showNotification as show} from './helpers/helpers';

import Facebook from './components/LoginScreen';

import './App.css';

const words = ['Application', 'prograMming', 'intErface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];



function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const [sentence, setSentence] = useState([]);


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const reponse = await fetch('http://api.quotable.io/random');
  //     const postsData = await reponse.json();
  //     setPosts(postsData);
  //   };
  //   fetchPosts();
  // }, []);

   console.log('posts',sentence);

  useEffect(() => {
    fetch('http://api.quotable.io/random')
      .then(response => response.json())
      .then(data => setSentence(data.content))
  }, [])



  useEffect(() => {
    const handleKeyDown = event => {
      const { key, keyCode } = event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
              show(setShowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters => [...wrongLetters, letter]);
            } else {
              show(setShowNotification);
            }
          }
        }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);

  }, [correctLetters, wrongLetters, playable]);
  
  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <h1>Facebook Auth example</h1>
      <p>To get started, authenticate with Facebook.</p>
      <Facebook />
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} >
          <p>Number of errors</p>
        </Figure>
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} 
        setPlayable={setPlayable} playAgain={playAgain} />
        <Notification showNotification={showNotification} />
    </>
  );
}

export default App;