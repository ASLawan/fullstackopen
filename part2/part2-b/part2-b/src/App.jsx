import { useState, useEffect } from "react";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/person";
import Message from "./components/Message";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState();

  // useEffect - retrieve data from json-server
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // handle form submission
  const addPerson = (e) => {
    // console.log(e.target);
    e.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber,
    };
    // check if object already exists
    const exists = persons.some((person) => person.name === newPersonObj.name);
    //console.log("Exists:", exists);
    if (!exists) {
      personService
        .createPerson(newPersonObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          // set Message
          setMessage(`Successfully ADDED ${newPersonObj.name}`);
          setShowMessage(!showMessage);
          setMessageType("add");

          setTimeout(() => {
            setShowMessage(false);
            console.log(showMessage);
          }, 10000);
        })
        .catch((error) => {
          console.log("Server error:", error);
          if (error.response) {
            setMessage(error.response.data.error);
            setMessageType("error");
            setShowMessage(true);

            setTimeout(() => {
              setShowMessage(false);
            }, 10000);
          }
        });
    } else {
      // alert(`${newPersonObj.name} is already added to the Phonebook`);
      const person = persons.find(
        (person) => person.name === newPersonObj.name
      );
      const newPerson = { ...person, number: newPersonObj.number };
      console.log(newPerson);
      handleUpdate(person.id, newPerson);
      setNewName("");
      setNewNumber("");
    }
  };

  // update person information
  const handleUpdate = (id, newPersonObj) => {
    if (
      window.confirm(
        `${newPersonObj.name} is already in the phonebook, replace old number with new one?`
      )
    ) {
      personService
        .updatePerson(id, newPersonObj)
        .then((returnedPerson) => {
          console.log(returnedPerson);
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );

          //set message
          setMessage(`Successfully UPDATED ${newPersonObj.name}`);
          setShowMessage(!showMessage);
          setMessageType("update");

          setTimeout(() => {
            setShowMessage(false);
          }, 10000);
        })
        .catch((error) => {
          console.log("Server error:", error);
          setMessage(
            `${newPersonObj.name} has already been removed from the server`
          );
          setShowMessage(!showMessage);
          setMessageType("error");

          setTimeout(() => {
            setShowMessage(false);
          }, 10000);
        });
    }
  };

  // delete person
  const handleDelete = (person, id) => {
    if (window.confirm(`Delete ${person} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));

          // set message
          setMessage(`Successfully DELETED ${person}`);
          setShowMessage(true);
          setMessageType("delete");

          setTimeout(() => {
            setShowMessage(false);
          }, 10000);
        })
        .catch((error) => {
          setMessage(`Error deleting ${person}: ${error.message}`);
          setShowMessage(true);
          setMessageType("error");

          setTimeout(() => {
            setShowMessage(false);
          }, 10000);
        });
    }
  };

  // handle name change
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  // handle number change
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  // handle search change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setNewSearch(searchValue);
  };

  // search results
  const searchResults = persons.filter(
    (person) => person.name.toLocaleLowerCase() == newSearch
  );

  // list to display - Conditional rendering
  const listToDisplay = newSearch ? searchResults : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      {showMessage && <Message message={message} messageType={messageType} />}

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons listToDisplay={listToDisplay} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
