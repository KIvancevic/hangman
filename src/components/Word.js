import React from 'react'

function Word ({ selectedWord, correctLetters})  {

  let sentences = selectedWord.split(' ');

  return (
    <div className="word">
      {sentences.map( (sentence, i) => {
        return (
        <span
          style={{
            marginLeft: '10px'
          }}
        > 
          {sentence + ' '} 
        </span>
        )
      })}
      {selectedWord.split('').map( (letter, i) => {
          return (
          <span className="letter" key={i}>
            {correctLetters.includes(letter) ? letter : ''}
          </span>
          )
      })}
    </div>
  )
}

export default Word
