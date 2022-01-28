import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const NameObject = {
      name: newName,
      number: newNum,
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(NameObject))

      personService
        .create(NameObject)
        .then(response => {
          console.log(response)
        })
    }

    setErrorMessage(
      `${NameObject.name} Added`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    setNewName('')
    setNewNum('')
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(response => {
          console.log(response)
        })
      setPersons(persons.filter((person) => person.id !== id));
      setErrorMessage(
        `${name} deleted`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Form newName={newName} newNum={newNum} handleNameChange={handleNameChange}
        handleNumChange={handleNumChange} addName={addName} />
      <h2>Numbers</h2>
      <RenderPerson persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
    </div>
  )
}

const RenderPerson = ({ persons, handleDelete }) => {
  return (
    <div>
      <ul>
        {persons.map(person =>
          <Person key={person.id} person={person} handleDelete={handleDelete} />
        )}
      </ul>
    </div>
  )
}

const Form = ({ newNum, newName, handleNameChange, handleNumChange, addName }) => {
  return (
    <div>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
          <div>number: <input
            value={newNum}
            onChange={handleNumChange}
          />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default App