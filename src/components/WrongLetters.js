import React from 'react'

const WrongLetters = ({wrongLetters}) => {
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && <p>Entered wrong letters:</p>} 
        {wrongLetters
          .map((letter,i) => <span key={i}>{letter}</span>)
          .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}
        {wrongLetters.length > 0 && <p className="number-of-errors">Number of errors: {wrongLetters.length}</p>}
      </div>
    </div>
  )
}

export default WrongLetters
