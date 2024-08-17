import { useState } from "react";

// Button component
const Button = (props) => {
  return <button onClick={props.handler}>{props.text}</button>;
};

// Statisticline component
const StatisticLine = (props) => {
  let stat;
  if (props.text === "positive") {
    // stat = props.text + " " + props.value + " " + "%";

    stat = (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    );
  } else {
    // stat = props.text + " " + props.value;
    stat = (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    );
  }
  return (
    <table>
      <tbody>{stat}</tbody>
    </table>
  );
};

// Statistics Component
const Statistics = (props) => {
  let stats;
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    stats = (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    let average =
      (props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all;
    average = average.toFixed(1);
    let percentage = (props.good / props.all) * 100;
    percentage = percentage.toFixed(1);
    stats = (
      <div>
        <div>
          <h2>Statistics</h2>
        </div>
        <div>
          {/* <p>good {props.good}</p>
          <p>neutral {props.neutral}</p>
          <p>bad {props.bad}</p>
          <p>all {props.all}</p>
          <p>average {average}</p>
          <p>positive {percentage}</p> */}
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={percentage} />
        </div>
      </div>
    );
  }

  return stats;
};
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  // call backs

  const handleGood = () => {
    setGood(good + 1);
    const updatedGood = good + 1;
    setAll(updatedGood + neutral + bad);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    const updatedneutral = neutral + 1;
    setAll(good + updatedneutral + bad);
  };

  const handleBad = () => {
    setBad(bad + 1);
    const updatedBad = bad + 1;
    setAll(good + neutral + updatedBad);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handler={handleGood} text="good" />
        <Button handler={handleNeutral} text="neutral" />
        <Button handler={handleBad} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
}

export default App;
