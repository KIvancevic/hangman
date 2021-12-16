import React, { useEffect, useState } from 'react'
import {checkWin} from '../helpers/helpers';
import { HighScoreRow } from './HighScoreRow';

const Popup = 
  ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, sentence
  , quoteIdString, lengthInteger, uniqueCharactersInteger, userNameString, errorsInteger,
   durationInteger}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  const [scoreBoard, setScoreBoard] = useState(null);


  useEffect(() => {
    fetch('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores')
    .then(res => {
      return res.json()
    })
    .then((data) => {
      setScoreBoard(data);
    })
  }, [])

  
  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'Congratulations! You won! And your score has been sent to highscore server board.';
    playable = false;

    fetch("https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quoteId: `${quoteIdString}`, 
        length: `${lengthInteger}`,
        uniqueCharacters: `${uniqueCharactersInteger}`,
        userName: `${userNameString}`,
        errors: `${errorsInteger}`,
        duration: `${durationInteger}`
      })
    })

  } else if ( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = "Unfortunately you lost." ;
    finalMessageRevealWord = `...the word was: ${sentence}`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));

  function normalizeScore(val, max, min) {
    return (val-min) / (max-min)
  }

  function calculateScore (user) {

    let uniqCh = user.uniqueCharacters
    let uniqChar = normalizeScore(uniqCh, 50, 0)

    let userLeng = user.length
    let userLe = normalizeScore(userLeng, 200, 0)

    let userErrors = user.errors
    let userErr = normalizeScore(userErrors, 20, 0)

    let userDuration= user.duration
    let userDur = normalizeScore(userDuration, 200000, 0)

    return (30*uniqChar) + (20*userLe) + (40/userErr) + userDur
    
  }
 

  return (
    <>
    {!playable &&
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button 
          onClick={playAgain} 
        >
          Play Again
        </button>
        {scoreBoard && checkWin(correctLetters, wrongLetters, selectedWord) === 'win' &&
          <div
            className="scoreboard"
          >
            <h1>Highscore table fetched from api</h1>
            <div
              className="usernameAndScore"
            >
              <h3>Username</h3>
              <h3>&</h3>
              <h3>Score</h3>
            </div>
              {scoreBoard
              .map((user) => {
                return {
                  ...user,
                  score: Math.floor(calculateScore(user))
                }
              })
              .sort((a,b) => {
                if (a.score < b.score) {
                  return 1
                } else {
                  return -1
                }
              })
              .map((user, i) => (
                <HighScoreRow 
                  username={user.userName}
                  key={i}
                  score={user.score}
                />
                
                ))}
          </div>
        }
          </div>
    </div>
  }
  </>
  )
}

export default Popup
