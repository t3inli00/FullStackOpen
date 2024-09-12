import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  //1.12
  const handleButtonClick =() =>{
    //get the math random function, math floor,
    setSelected(Math.floor(Math.random() * anecdotes.length)) 
  }
  //1.13
  const handleVoteClick =()=>{
    const testvote =[...vote]
    testvote[selected] += 1
    setVote(testvote)
  } 

  const [selected, setSelected] = useState(0)
  const [vote,setVote] =useState(new Array(anecdotes.length).fill(0))

  //1.4
  const Maxvote = Math.max(...vote)
  const getmaxindex =vote.indexOf(Maxvote)

  return (
    <div>
      <h1>Anecdotes Of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes </p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleButtonClick}>next anecdotes</button>  
      <h1>Anecdotes with most votes</h1>
      {Maxvote > 0 ? (<div><p>{anecdotes[getmaxindex]}</p>
        <p>{Maxvote}</p></div>): (<p>No votes</p>) }          
    </div>
  )
}

export default App