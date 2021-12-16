import React from 'react'

const Header = () => {
  return (
    <>
      <h1 
        style={{
          display:'flex',
          justifyContent: 'center', 
          caretColor: 'transparent', 
          cursor:'pointer'
        }}
        >
        Hangman
      </h1>
      <p 
        style={{
          display:'flex', 
          justifyContent: 'center', 
          caretColor: 'transparent', 
          cursor:'pointer'}}
      >
        Find the hidden word - Enter a letter
      </p>
    </>
  )
}

export default Header
