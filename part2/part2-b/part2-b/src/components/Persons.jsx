/* eslint-disable react/prop-types */
const Persons = ({ listToDisplay, handleDelete }) => {
  return (
    <>
      {listToDisplay.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.name, person.id)}>
            Delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Persons;
