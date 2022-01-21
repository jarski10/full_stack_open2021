import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

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
    }

    setNewName('')
    setNewNum('')
    console.log(persons)
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form newName={newName} newNum={newNum} handleNameChange={handleNameChange}
        handleNumChange={handleNumChange} addName={addName} />
      <h2>Numbers</h2>
      <RenderPerson persons={persons} />
    </div>
  )
}

const Person = ({ name, num }) => {
  return (
    <div>
      <p>{name} {num}</p>
    </div>
  )
}

const RenderPerson = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map(person =>
          <Person key={person.name} name={person.name} num={person.number} />
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