/* eslint-disable react/prop-types */
const Form = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <h3>Add a new contact</h3>
      </div>
      <div>
        name: <input type="text" value={newName} onChange={handleNameChange} />
        <br />
        number:{" "}
        <input type="text" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
