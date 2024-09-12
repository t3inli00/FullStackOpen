/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>    
)

//1.10
const StatisticLine =({text, value}) =>{
 return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
 )
}

const Statistics =( {good,neutral,bad,total,average,positive}) =>{
  if(total != 0)  
  {
    return(
    <div>   
      <table>
      <tbody>
        <StatisticLine text ={'good'} value={good} />
        <StatisticLine text ={'neutral'} value={neutral} />
        <StatisticLine text ={'bad'} value={bad} />
        <StatisticLine text ={'all'} value={total} />
        <StatisticLine text ={'average'} value={average} />
        <StatisticLine text ={'Positive'} value={positive} />
      </tbody>
      </table>  
     
    </div>
  )
}
else
{//1.9
 return <p>No feedback given</p>
}

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //1.7
  const [total,setTotal]=useState(0)
  const [average,setAverage] =useState(0)
  const [positive,setPositive]=useState(0)

  //Good button click 1.6
  const handleGoodClick =() =>{
    setTotal(total +1)
    setGood(good +1) 
    getAverage() 
    getPositive()
  }
   //neutral button click 1.6
   const handleNeutralClick =() =>{
    setNeutral(neutral +1)
    setTotal(total +1)
    getAverage() 
    getPositive()
  }
  //Good button click 1.6
  const handleBadClick =() =>{
    setBad(bad +1)
    setTotal(total +1)
    getAverage() 
    getPositive()
  }

  //1.7
  const getAverage = () =>{
   setAverage(((good * 1) + (neutral * 0) + (bad * (-1)))/total)        
  }
  //1.7
  const getPositive =() => {
    setPositive((good/total) *100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick ={handleGoodClick} text={"good"} />
      <Button handleClick ={handleNeutralClick} text={"neutral"} />
      <Button handleClick ={handleBadClick} text={"bad"} />
      <br>
      </br><br></br> 
      <h1>statistics</h1>
      <Statistics good ={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />     
    </div>
  )
}

export default App