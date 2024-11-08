import { useState } from "react" 

const Display = ({ value }) => <div>{value}</div> 

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
) 

const Statistic = (props) => {
  if (props.total === 0) {
    return <p>No feedback given</p> 
  } else {
    return (
      <table><tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="total" value ={props.total} />
      <StatisticLine text="average" value ={props.average} />
      <StatisticLine text="positive" value ={props.positive} isPercentage/></tbody>
      </table>
    ) 
  }
} 

const StatisticLine = ({text, value, isPercentage}) => <tr><td>{text}: {value} {isPercentage ? "%" : ""}</td></tr>

const App = () => {
  const [good, setGood] = useState(0) 
  const [neutral, setNeutral] = useState(0) 
  const [bad, setBad] = useState(0) 

  const handleGoodClick = () => setGood(good + 1) 
  const handleNeutralClick = () => setNeutral(neutral + 1) 
  const handleBadClick = () => setBad(bad + 1) 

  const total = good + neutral + bad 
  const average = (good * 1 + neutral * 0 + bad * -1) / total 
  const positive = (good * 100) / total 

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />

      <h1>Statistic</h1>
      <Statistic good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  ) 
} 

export default App 
