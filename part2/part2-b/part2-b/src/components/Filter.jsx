/* eslint-disable react/prop-types */
const Filter = ({ newSearch, handleSearchChange }) => {
  return (
    <>
      Filter shown with:{" "}
      <input type="search" value={newSearch} onChange={handleSearchChange} />
    </>
  );
};

export default Filter;
