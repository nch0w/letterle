import './App.css';
import React, { useState, useEffect, useRef } from 'react';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const App = () => {
  const endRef = useRef(null)
  const [guesses,setGuesses] = useState([])
  const [gameState,setGameState] = useState(0)
  const [showMessage,setShowMessage] = useState(0)
  useEffect(() => endRef.current?.scrollIntoView({  }),[guesses])

  const letterCheck = (letter) => {
    if (letter === guesses[guesses.length-1] && gameState === 1) {
      return "letter right"
    } else
    if (guesses.includes(letter)) {
      return "letter wrong"
    } else {
      return "letter"
    }
     
  }

  const handleClick = (e) => {
    if (!gameState) checkValue(e.target.innerText)
 
  }

  const getShareText = () => {
    let text = `Letterle ${gameState === 2 ? 26 : guesses.length + 1}/26\n`
    guesses.forEach(g => text += "⬜\n")
    if (gameState === 1) text += "🟩\n"
    text += " https://edjefferson.com/letterle/"
    navigator.clipboard.writeText(text)
    setShowMessage(1)
    setTimeout(()=>setShowMessage(0),1000)
  }

  const checkValue = (letter) => {
    const guessesNew = [...guesses, letter];
    setGuesses(guessesNew)
    console.log(new Set(guessesNew).size)
    if (new Set(guessesNew).size >= 26) {
      console.log('game over')
      setGameState(1)
    }
  }
  let currentValue = ""
  const handleOnChange = (e) => {
    let letter = e.target.value[0].toUpperCase()
    console.log(letter)
    checkValue(letter)
  }
  return (
    <div className="App">
      <div id="container">
        <div id="topBit">
          <h1>LETTERLE</h1>
        </div>
        <div id="guesses">
          {guesses.map((g,i) => 
            <div className="guess">
              <p>{g}</p>
            </div>
            )}
          {gameState === 1 ? <div className="guess rightGuess">
              {guesses[guesses.length-1]}
            </div> :   
     !gameState ? <input autoFocus onChange={handleOnChange} type="text" value={currentValue}/> : ""
    }

           {["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"].map((k,i) => 
            <div className="keyboardRow" key={i}>


              {k.split("").map((l,i) => 
                <div onClick={handleClick} className={letterCheck(l)}>{l}</div>
              )}
            </div>

           )}
            
        </div>
        {gameState === 1 ? <div id="endscreen">
            <p id="result">You got the correct letter in {guesses.length + 1} guess{guesses.length ? "es" : ""}.</p>
            <p id="clip" style={{opacity: showMessage}}>Copied to clipboard</p>
            <p id="share" onClick={getShareText}>SHARE</p>

        </div> : ""}
        {gameState === 2 ? <div id="endscreen">
            <p id="result">You somehow didn't get the correct letter after 26 guesses.</p>
            <p id="clip" style={{opacity: showMessage}}>Copied to clipboard</p>
            <p id="share" onClick={getShareText}>SHARE</p>

        </div> : ""}
        
        <div id="endbit"ref={endRef}><a href="https://edjefferson.com/letterle/">Original</a> Credit to <a href="https://twitter.com/edjeff">@edjeff</a>. Other things: <a href="https://edjefferson.com">edjefferson.com</a></div>
        
      </div>
    </div>
  );
}

export default App;
