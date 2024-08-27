/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
// Course component
const Course = (props) => {
  // console.log("Props from course", props);
  return (
    <>
      <div>
        <Header name={props.course.name} />
      </div>
      <div>
        <Content parts={props.course.parts} />
      </div>
    </>
  );
};

// Header Component
const Header = ({ name }) => {
  // console.log("name from header:", name);
  return <h2>{name}</h2>;
};

// Content component
const Content = (props) => {
  // console.log("Props in content:", props);
  return <Part parts={props.parts} />;
};

// Part Component
const Part = (props) => {
  // console.log("Props in Part:", props);
  return (
    <div>
      {props.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

export default Course;
