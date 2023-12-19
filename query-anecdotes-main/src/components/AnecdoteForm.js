import { useMutation, useQueryClient } from 'react-query'
import React from 'react'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      console.log("Error", error)
      dispatch({ type: "ERROR_NOTIFICATION" })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }
        , 5000)
    }
  })
  const onCreate = async (event) => {
    console.log('create')
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log("Length", content.length)
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    if (content.length < 5) {
      return
    }
    dispatch({ type: "SET_NOTIFICATION", payload: `you created ${content}` })
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }
      , 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

