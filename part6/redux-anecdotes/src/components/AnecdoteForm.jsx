import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
// import { displayNotification } from "../reducers/notificationReducer";
// import anecdoteService from "../services/anecdotes";
import { useContextDispatch } from "./helper";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const notify = useContextDispatch();

  const displayNotification = (message) => {
    notify({
      type: "SET_NOTIFICATION",
      payload: `"${message}" has been created`,
    });

    setTimeout(() => {
      notify({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    console.log(`Content: ${content}`);
    e.target.anecdote.value = "";

    // const content = await anecdoteService.createNewAnecdote(input);
    dispatch(createAnecdote(content));

    // dispatch(displayNotification(`"${content}" has been created!`, 10));

    displayNotification(content);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
