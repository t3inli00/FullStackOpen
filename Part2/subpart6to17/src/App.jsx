 
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';


//person component
const Persons = ({ persons,handleDelete }) => {
  return (
    <div>
      {persons.map((e) => (
        <p key={e.id}>{e.name} {e.number}<button type='submit' onClick={() => handleDelete(e.id)}>Delete</button></p>
      ))}
    </div>
  );
};



//person form component
const PersonForm =({addperson,newName,handletextname,newNumber,handletextNumber})=>{
  return(
<form onSubmit={addperson}>
        <div>
          name: <input type='text' value={newName} onChange={handletextname}/>
        </div>
        <div>number: <input type='text' value={newNumber} onChange={handletextNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

//Filter Component
const Filter =({searchName,handlesearchName}) =>{
  return(
    <div>Filter shown with<input type='text' onChange={handlesearchName} value={searchName}/> </div>
    )
}

const App = () => {
  //use states
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber,setNewNumber]=useState('');
  const [searchName,setSearchName] =useState('');
  const [message,setMessage]=useState('');

 
//delete the record
 const handleDelete =(id) =>{
  
  //get the deleting person
  const deletePerson = persons.find(e => e.id === id);
  
  //check the delete person exsit and if so confirm with user
 // if (deletePerson)
  //{
    const confirmUser = window.confirm(`Delete ${deletePerson.name}?`)
    
      if (confirmUser)
      {
        axios
          .delete(`http://localhost:3001/persons/${deletePerson.id}`)
          .then(() =>{
            setPersons(persons.filter(e =>e.id !== id))
          })
          .catch(error => {
            console.error("Error when deleting person:", error);
          });
      }
   
     
  //}
}

  //Get Intial data from JSON server 2.11 subpart11
  useEffect(()=>{
    axios
        .get('http://localhost:3001/persons')
        .then(res =>{setPersons(res.data);
        })
        .catch(error =>{
          console.error("Initial data:", error);
        })
        
  },[]);

  //input event handles
  const handletextname = (event)=>{
    setNewName(event.target.value)
  }
  const handletextNumber =(event) => {
    setNewNumber(event.target.value)
  }
  const handlesearchName =(event) =>{
     setSearchName(event.target.value)   
     SearchNametofilter(); 
     }

  //search the name list
  const SearchNametofilter = () => {
    const filteredArray = [];
    
    if (searchName !== "") {
      persons.filter(p => {   
        if (p.name.toLowerCase().trim().includes(searchName.toLowerCase().trim())) {
          filteredArray.push(p);
        }
      });
    }
  return (
      <ul>
      {filteredArray.length > 0 ? (
        filteredArray.map((e, index) => <li key={index}>{e.name}</li>)
      ) : (
        <li>No matches found</li>
      )}
    </ul>
    );
  };
  //Notification for Adding and updating person
  const Notification =({message}) => {
    const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      padding: '10px',
      border: '2px solid green',
      marginBottom: '10px',
      visibility: message ? 'visible' : 'hidden', // inline style Control visibility based on message
    };
    if (message === null)
    {return null}

    return(
      <div style={notificationStyle}>{message}</div>
    )
  }
  
  //add a person if he/she not exsit in the phonebook
  const addperson =(event)=>{
    event.preventDefault();
    let result;
    //add the new person
    const newPerson ={name:newName , number:newNumber,id:(persons.length + 1).toString()};
    const exitperson = persons.find(e => e.name===newName);
    
    if (exitperson)
      {
        result= window.confirm(`${newName}  is already added to phonebook, replace the old number with the new one?`)
      
        if(result)
        {
          //update data
          const updateperson ={...exitperson,number:newNumber};
          axios
            .put(`http://localhost:3001/persons/${exitperson.id}`,updateperson)
            .then(res =>{
              setPersons(persons.map(p =>(p.id === exitperson.id? res.data : p)))
              setMessage(`Updated ${updateperson.name}`);
              //display the message for a time 2.16 
              setTimeout(() => {
                setMessage(null);
              }, 5000)
             
            })
            .catch(error =>{
              setMessage(`Information of ${updateperson.name} has already been removed from server`)
               //display the message for a time 2.17 
               setTimeout(() => {
                setMessage(null);
              }, 5000)
              console.error("Updating persons data ",error);
            })
        }
      }
      else
      {
      //or add data
      axios
      .post('http://localhost:3001/persons',newPerson)
      .then(res =>{
        setPersons(persons.concat(res.data));
        setMessage(`Added ${newPerson.name}`);
        //display the message for a time 2.16 
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      })
      .catch(error =>{
        console.error("Adding new persons data:", error);
      })  
      }
  

  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchName={searchName} handlesearchName={handlesearchName} />
      {SearchNametofilter()}
      <h2>add a new</h2>
      <PersonForm addperson={addperson} newName={newName} handletextname={handletextname} newNumber={newNumber} handletextNumber={handletextNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} /> 
      </div>
  )
}

export default App