
import axios from 'axios';
import { useEffect, useState } from 'react';
import Course from "./Course";



const App = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  
 // const-definitions
 const course =[
    {id:1,
    name:'Half Stack application development',
    parts:[
      {name: 'Fundamentals of React' , exercises: 10,id:1 },
      {name: 'Using props to pass data' , exercises: 7 ,id:2},
      {name: 'State of a component' , exercises: 14,id:3 },
      {name: 'redux',exercises :11, id:4}
     ]},
     {
      name: 'Node.js',
      id: 2,
      parts: [
        {name: 'Routing',exercises: 3, id: 1 },
        {name: 'Middlewares',exercises: 7,id: 2}
      ]
     }     
    ]


 return (
   <div>
    <h1>Web Development curriculum</h1>
     <Course course ={ course }/>
   </div>
 )
}

export default App