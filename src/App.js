import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import FirstScreen from './components/FirstScreen';
import axios from 'axios';


import './App.css';

function App() {

  
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const [active, setActive] = useState(false);
  const [firstKeyOrButtonPress, setFirstKeyOrButtonPress] = useState(false)
  const [elapsedTime, setElapsedTime] = useState();
  

  const [quote, setQuote] = useState('')
  const [userNameParent, setUserNameParent] = useState('')
  const [quoteId, setQuoteId] = useState('')
  const [quoteLength, setQuoteLength] = useState()
  const [uniqueCharacters, setUniqueCharacters] = useState()

  let selectedWord = quote

  let selectedQuote = selectedWord.toLowerCase().replace(/[^a-zA-Z]/g, '');

  const wrongLettersLength = wrongLetters.length

  const regex = /[\^°<>#*~!"§$%?®©¶,".':-]+/g;

  
  
  useEffect(() => {
    getQuote();
  }, [])

  function getQuote() {
    axios.get(`http://api.quotable.io/random`)
    .then((response) => {
      const apiQuote = response.data.content;
      const quoteID = response.data._id;
      const quoteL = response.data.length;
      setQuote(apiQuote)
      setQuoteId(quoteID)
      setQuoteLength(quoteL)
    })
    .catch(error => console.error(`Error: ${error}`));
    
  } 

  console.log('quote: ', quote);

  useEffect(() => {
    
      
      const handleKeyDown = event => {
      const { key, keyCode } = event;
        
        if (active && playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase() || key.toUpperCase();
          const found = quote.match(regex)
          setUniqueCharacters(found.length)

          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } 
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters => [...wrongLetters, letter]);
            } 
          }
        }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);

  }, [correctLetters, wrongLetters, playable, active, selectedWord, setFirstKeyOrButtonPress, quote]);

  function playAgain() {
    setPlayable(true);
    setElapsedTime('0');
    getQuote();

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    
    selectedWord = quote
  }

  // const handleGuess = e => {
  //   let letter = e.target.value
  //   setCorrectLetters.add([letter])
  //   setWrongLetters = quote.includes(letter) ? '' : setWrongLetters.add([letter])
  // }

  // function generateButtons() {
  //   return "abcdefghjklmnopqrstuvwxyz".split("").map( (letter, i) => {
  //     return (
  //       <button 
  //        key={i}
  //        value={letter}
  //        onClick={handleGuess}
  //        disabled={() => correctLetters.has(letter)}
  //        style={{
  //          margin: '2px',
  //          width: '50px',
  //          height: '50px',
  //          backgroundColor: '#2980b9',
  //          color: 'white'
  //        }}
  //       >
  //         {letter}
  //       </button>
  //     )
  //   })
  // }

  // let gameStat = generateButtons();

  useEffect(() => {
    if(firstKeyOrButtonPress) {
      start();
    } if (!playable) {
      end();
    }
  },[firstKeyOrButtonPress,playable])

  const startTime = 0;
  

  function start(startTime) {
     startTime = performance.now();
  }


  function end(endTime) {
    endTime = new Date();
    const elapsedTime = endTime - startTime;
    console.log('elapsedTime: ', elapsedTime)
    setElapsedTime(elapsedTime)
  }

  // useEffect(() => {
  //   fetch('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores')
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       setBlogs(data);
  //     })
  // }, []);
  

  return (
    <>
    {!active || active==='undefined' ? 
              <FirstScreen stateChanger={setActive} active={active} setUsername={setUserNameParent} username={userNameParent}/>
              : 
              <> 
              <Header />
              <div className="game-container">
                <Figure wrongLetters={wrongLetters} >
                  
                </Figure>
                <WrongLetters wrongLetters={wrongLetters} />
                
              </div>
              <div>
                <Word selectedWord={selectedWord} correctLetters={correctLetters} />
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5%',
                  }}
                >
                  <button
                    className="restartBtn"
                    onClick={() => {
                      playAgain();
                      setElapsedTime('0');
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '170px',
                      height: '60px',
                      border: '0.5px solid #2980b9',
                      fontSize: '18px',
                      fontWeight: '400',
                      color: 'white',
                      borderRadius: '10px',
                      letterSpacing: '0.1em'
                    }}
                  >
                    Restart game
                  </button>
                </div>
              </div>
               
                <Popup 
                  correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedQuote} 
                  setPlayable={setPlayable} playAgain={playAgain} setElapsedTime={setElapsedTime} 
                  sentence={selectedWord} quoteIdString={quoteId} lengthInteger={quoteLength} uniqueCharactersInteger={uniqueCharacters}
                  errorsInteger={wrongLettersLength} durationInteger={elapsedTime} userNameString={userNameParent}
                />
                {/* <div
                   style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: '5%',
                  }}
                >
                  {gameStat}
                </div> */}
            </>
       
  }

    </>
  );
}

export default App;