import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
// import { displayNotification } from "../reducers/notificationReducer";
import { useContextDispatch } from "./helper";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const notify = useContextDispatch();

  const displayNotification = (message) => {
    notify({
      type: "SET_NOTIFICATION",
      payload: `You voted for: "${message}"`,
    });

    setTimeout(() => {
      notify({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter !== "") {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return anecdotes;
  });

  const vote = (id) => {
    console.log("vote", id);

    const anec = anecdotes.find((anecdote) => anecdote.id === id);

    dispatch(voteForAnecdote(id, anec));
    // dispatch(displayNotification(`You voted: "${anec.content}"`, 10));
    displayNotification(anec.content);
  };

  const anecdotesToDisplay = [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <>
      {anecdotesToDisplay.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
