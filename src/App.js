import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firsDie = dice[0].value
    const allSame = dice.every(die => die.value === firsDie)
    if(allHeld && allSame) {
      setTenzies(true)
      console.log("You won!")
    }
  },[dice])

  function genereateDice() { 
    return {  
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(genereateDice())
    }
    return newDice
  }

  function toggle(id) {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
        })
      })
  }

  const diceElements = dice.map(die => 
      <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld}
        toggle={() => toggle(die.id)}
      />
    )

  function rollDice() {
    if(!tenzies) {
      setDice(prevDice => {
        return prevDice.map((die) => {
          return die.isHeld ? die : genereateDice()
        })
      })
    } else {
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-button' onClick={rollDice} > {tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
