import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <Button handleClick={handleGoodClick} text='GOOD' />
      <Button handleClick={handleNeutralClick} text='NEUTRAL' />
      <Button handleClick={handleBadClick} text='BAD' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const pos = props.good / all * 100

  if (all === 0) {
  return (
    <p>No feedback given</p>
  )
  } else {
  return (
  <div>
    <div>
      <h1>Statistics</h1>
    </div>
    <div>
      <StatisticLine name="Good" value={props.good}/>
      <StatisticLine name="Neutral" value={props.neutral}/>
      <StatisticLine name="Bad" value={props.bad}/>
      <StatisticLine name="All" value={all}/>
      <StatisticLine name="Average" value={average}/>
      <StatisticLine name="Positive" value={pos}/>
    </div>
  </div>
  )
  }
}

const StatisticLine = (props) => {

  return (
    <p>{props.name} {props.value}</p>
  )
}

export default App