import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { useMutation, useQueryClient } from 'react-query'
import React from 'react'
import { getAnecdote, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  var anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  const result = useQuery(
    'anecdotes', getAnecdote, {
    refetchOnWindowFocus: false, retry: 1
  })
  console.log("result", result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>Anecdote Service is not available due to problems in server side : {result.error.message}</div>
  }
  if (result.isSuccess) {
    anecdotes = result.data
  }

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: "SET_NOTIFICATION", payload: `you voted ${anecdote.content}` })
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }
      , 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

