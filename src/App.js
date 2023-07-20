import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid';
import { useState } from 'react';

function App() {
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({ 
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
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

  function rollDice() {setDice(allNewDice())}


  return (
    <main>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-button' onClick={rollDice} >Roll Dice</button>
    </main>
  );
}

export default App;
