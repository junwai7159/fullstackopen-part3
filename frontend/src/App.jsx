import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Content from './components/Content'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [allPersons, setAllPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(res => {
        setAllPersons(res)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = allPersons.filter(person =>
      person.name === newName
    )
    const personToAdd = person[0]
    const updatedPerson = {...personToAdd, number: newNumber}
    
    if (person.length !== 0) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      personService
      .update(updatedPerson.id, updatedPerson)
      .then(res => {
        setAllPersons(allPersons.map(person => person.id !== personToAdd.id ? person : res))
        setNewName('')
        setNewNumber('')
        setMessage(`${res.name} successfully updated`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`[ERROR] Information of ${updatedPerson.name} has already been removed from server`)
        setAllPersons(allPersons.filter(person => person.id !== updatedPerson.id))
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setMessage(null)
        }, 5000)       
      })
    }
      
    else {
      const personToAdd = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personToAdd)
      .then(res => {
        setAllPersons(allPersons.concat(res))
        setNewName('')
        setNewNumber('')
        setMessage(`${res.name} was succesfully added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`[ERROR] ${error.response.data.error}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
      
  }
  
  const deletePerson = (id) => {
    const filteredPerson = allPersons.filter(person => 
      person.id === id)
    const personToDelete = filteredPerson[0]
    personService
    .remove(personToDelete.id)
    .then(res => {
      setAllPersons(allPersons.filter(person => person.id !== id))
      setMessage(`${res.name} was succesfully deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      setMessage(`[ERROR] ${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const regex = new RegExp(event.target.value, 'i');
    const filteredPersons = allPersons.filter(person => person.name.match(regex));

    if (newFilter === '')
      setPersons(allPersons)
    else if (filteredPersons.length === 0)
      setPersons([])
    else
      setPersons(filteredPersons)
  }

  
  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add new person</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} 
                  newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Content persons={persons} allPersons={allPersons} deletePerson={deletePerson} filter={newFilter} />
    </div>
  )
}

export default App