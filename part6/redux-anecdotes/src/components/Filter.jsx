import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value);

    dispatch(filterChange(e.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;
