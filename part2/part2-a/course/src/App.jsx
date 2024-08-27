/* eslint-disable react/prop-types */
import Course from "./components/Course";

// Total Exercises component
const Total = (props) => {
  const total = props.course.parts.reduce((sum, part) => {
    // console.log("Sum, exsercises", sum, part);
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <p>total of {total} exercises</p>
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <div>
            <Course course={course} />
          </div>
          <div>
            <Total course={course} />
          </div>
        </div>
      ))}
    </>
  );
};

export default App;
