import { createSlice } from '@reduxjs/toolkit'
import AnecdoteService from '../services/anecdotes'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const AnecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote_anecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    
    },
    set_anecdotes(state, action) {
      return action.payload
    },
    append_anecdote(state, action) {
      state.push(action.payload)
    }
  },
})

export const initialize_anecdotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdoteService.getAll()
    dispatch(set_anecdotes(anecdotes))
  }
}

export const create_anecdote = content => {
  return async dispatch => {
    const newAnecdote = await AnecdoteService.createNew(content)
    dispatch(append_anecdote(newAnecdote))
  }
}

export const vote_anecdote_action = (id) => {
  return async dispatch => {
    await AnecdoteService.vote(id)
    dispatch(vote_anecdote(id))
  }
}

export const { vote_anecdote, set_anecdotes, append_anecdote } = AnecdoteSlice.actions
export default AnecdoteSlice.reducer

// export default reducer
// const initialState = anecdotesAtStart.map(asObject)
// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'VOTE':
//       const id = action.payload.id
//       const anecdoteToChange = state.find(a => a.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return state.map(anecdote =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       )
//     case 'NEW_ANECDOTE':
//       console.log("New Anecdote",state)
//       var final_array = state.concat(asObject(action.payload.content))
//       console.log("Final_Array",final_array)
//       const sorted_array = final_array
//       return sorted_array
//     default:
//       return state
//   }
//   return state
// }

// export const create_anecdote = (content) => {
//   return {
//     type: 'anecdotes/NEW_ANECDOTE',
//     payload: { content: content }
//   }
// }

// export const vote_anecdote = (id) => {
//   console.log('vote', id)
//   return {
//     type: 'anecdotes/VOTE',
//     payload: { id }
//   }
// }

// create_anecdote(state, action) {
//   console.log("New Anecdote",state)
//   var final_array = state.concat(action.payload)
//   console.log("Final_Array",final_array)
//   const sorted_array = final_array
//   return sorted_array
// },