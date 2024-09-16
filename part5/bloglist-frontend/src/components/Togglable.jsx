import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisble] = useState(false);

  const hideWehenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisble(!visible);
  };

  Togglable.propTypes = {
    buttonLable: PropTypes.string.isRequired,
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div>
      <div style={hideWehenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLable}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
