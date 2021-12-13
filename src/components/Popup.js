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
  const [scoreErrors, setErrors] = useState(null);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores')
    .then(res => {
      return res.json()
    })
    .then((data) => {
      setScoreBoard(data);
      setErrors(data.errors)
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
    }).then(() => {
      console.log('Post send');
    })

  } else if ( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = "Unfortunately you lost." ;
    finalMessageRevealWord = `...the word was: ${sentence}`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));
 

  return (
    <>
    {!playable &&
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button 
          onClick={playAgain} 
          style={{marginBottom: '10px'}}
        >
          Play Again
        </button>
        {scoreBoard && checkWin(correctLetters, wrongLetters, selectedWord) === 'win' &&
          <div
            className="scoreboard"
          >
            <div
              className="usernameAndScore"
            >
              <p>Username</p>
              <p>&</p>
              <p>Score</p>
            </div>
              {scoreBoard.map((score, i) => (
                <HighScoreRow 
                  username={score.userName}
                  errors={score.errors}
                  key={i}
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
