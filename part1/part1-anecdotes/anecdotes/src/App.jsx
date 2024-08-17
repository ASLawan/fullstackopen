import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  // display anecdote
  const selectAnecdote = () => {
    let index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  // Vote anecdote
  const voteAnecdote = () => {
    const newVotes = {
      ...votes,
      [selected]: votes[selected] + 1,
    };
    setVotes(newVotes);
  };

  // Most voted anecdote
  const mostVotedAnecdote = () => {
    const mostVotes = Math.max(...Object.values(votes));
    const mostVotesIndex = Object.keys(votes).find(
      (key) => votes[key] === mostVotes
    );
    return mostVotesIndex;
  };

  let mostVotesIndex = mostVotedAnecdote();

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
      </div>
      <div>
        <p>has {votes[selected]} votes</p>
      </div>

      <button onClick={() => voteAnecdote()}>vote</button>
      <button onClick={() => selectAnecdote()}>next anecdote</button>

      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVotesIndex]}</p>
      </div>
      <div>
        <p>has {votes[mostVotesIndex]} votes</p>
      </div>
    </>
  );
};

export default App;
