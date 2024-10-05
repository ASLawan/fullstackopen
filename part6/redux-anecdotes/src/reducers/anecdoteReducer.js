/* eslint-disable no-case-declarations */
import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [];

export const getId = () => {
  return (100000 * Math.random()).toFixed(0);
};

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },

    newAnecdote: (state, action) => {
      state.push(action.payload);
    },

    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteAnecdote, newAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

// initializing the store
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();

    dispatch(setAnecdotes(anecdotes));
  };
};

// create anecdote
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(newAnecdote(anecdote));
  };
};

// cote anecdote
export const voteForAnecdote = (id, anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

    await anecdoteService.updateAnecdote(id, updatedAnecdote);

    dispatch(voteAnecdote(id));
  };
};
export default anecdoteSlice.reducer;

// export const voteAnecdote = (id) => {
//   return {
//     type: "VOTE",
//     payload: id,
//   };
// };

// export const newAnecdote = (content) => {
//   return {
//     type: "NEW_ANECDOTE",
//     payload: {
//       content: content,
//       votes: 0,
//       id: getId(),
//     },
//   };
// };

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

// const anecdoteReducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);

//   switch (action.type) {
//     case "VOTE":
//       const id = action.payload;
//       const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
//       const votedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1,
//       };

//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : votedAnecdote
//       );

//     case "NEW_ANECDOTE":
//       return state.concat(action.payload);
//     default:
//       return state;
//   }
// };

// export default anecdoteReducer;
