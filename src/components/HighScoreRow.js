import React from 'react'

export const HighScoreRow = ({ username, score  }) => {

  return (
    <div
      className="highscoreRow"
    >
      <p> {username} </p>
      <p> {score} </p>
    </div>
  )
}


