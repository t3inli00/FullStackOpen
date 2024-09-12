/* eslint-disable react/prop-types */
//Header Component
const Header =( {course} ) =>{  
   return (     
      <h1> {course} </h1>    
  );
}
//Part Component
const Part =( { name, exercises, index }) =>{
  return (
    <p key={index}>Part {index +1}: {name}, exercises {index +1}: {exercises} </p>
  );
}
//Content Component
const Content =( { parts} ) =>{
  return (
    <div>
      {parts.map((prt,index) => (
        <Part key={index} name= {prt.name} exercises ={prt.exercises} index={index} />
      ))}
    </div>
  );
}
//to get the total exercises
const Total =( {parts}) => {
  return (
    <div>
      Number of Exercise: { parts.reduce((total, part) => total + part.exercises, 0) }
    </div>
  );
}

const App = () => {
  // const-definitions
const course = 'Half Stack application development';
const parts =[
  {name: 'Fundamentals of React' , exercises: 10 },
  {name: 'Using props to pass data' , exercises: 7 },
  {name: 'State of a component' , exercises: 14 }
];

  return (
    <div>
      <Header course= { course } />
      <Content parts ={ parts } />
      <Total parts ={ parts } />
    </div>
  )
}

export default App