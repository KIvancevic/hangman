 import React from 'react'


function Word ({ selectedWord, correctLetters}) {

  let sentences = selectedWord.split(' ');
  const regex = /[\^°<>#*~!"§$%?®©¶,".':-]+/g;

  function renderWord (sentence) {
    return sentence.split('').map( (letter, i) => {
      return (
        letter.match(regex) ?
        <span className="letter" key={i}>
          {letter}
        </span>
        :
        <span className="letter" key={i}>
          {correctLetters.includes(letter.toLowerCase()) || correctLetters.includes(letter.toUpperCase()) ? letter : ''}
        </span>
      )
  })}

  return (
    <div className="word">
      {sentences.map( (sentence, i) => {
        return (
        <span
          key={i}
          style={{
            display:'flex',
            marginLeft: '30px',
          }}
        > 
          {renderWord(sentence)} 
        </span>
        )
      })}
      
    </div>
  )
}

export default Word
