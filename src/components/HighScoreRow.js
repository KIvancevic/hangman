import React from 'react'

export const HighScoreRow = ({username,errors}) => {
  const sum = 100/(1+errors);
  return (
    <div
      className="highscoreRow"
    >
      <p>{username} </p>
      <p>{sum} </p>
    </div>
  )
}
