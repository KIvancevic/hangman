import React from 'react'

function FirstScreen({ stateChanger, active, setUsername, username })  {

  return (
    <div className={active ? "displayHidden" : "userName"}
    >
      <div className={active ? "displayHidden" : "aligningFirstScreenElements"}>
        <h2>Welcome !</h2>
        <h2>Please enter your name to play the hangman game</h2>
        
        <input
          style={{
            width: '300px',
            height: '30px',
            caretColor: '#ff00cc',
            borderRadius: '5px',
            border: '2px solid #ff00cc66',
            outline: 'none',
            textAlign: 'center',
            color: '#ff00cc',
            fontSize: '16px',
            letterSpacing: '0.1em',
          }}
          type="text"
          name="name"
          placeholder="Enter your name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <button
          className="playAGame"
          type="submit"
          style={{
            marginTop: '10px',
            width: '130px',
            height: '40px',
            color: '#e8e9ed',
            border: '0.5px solid #2980b9',
            fontWeight: '500',
            letterSpacing: '0.1em',
            fontSize: '16px',
            borderRadius: '7px',
            cursor: 'pointer',
            
          }}
          onClick={() => stateChanger(true)}
          disabled={username === "" ? true : false}
        >
          Play a game
        </button>
      </div>
    </div>
  )
}

export default FirstScreen
