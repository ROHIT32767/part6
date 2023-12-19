import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { vote_anecdote_action } from '../reducers/anecdoteReducer'
import { change_notification, clear_notification , setNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (!filter) {
            console.log('anecdotes in !filter', anecdotes)
            return [...anecdotes].sort((a, b) => b.votes - a.votes)

        }
        return [...anecdotes].filter(element => element.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()
    const vote = (id) => {
        console.log('vote', id)
        dispatch(vote_anecdote_action(id))
        const anecdote = anecdotes.find(element => element.id === id)
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    }
    return (
        <div>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )

            }
        </div>
    )
}

// dispatch(change_notification(`You voted '${anecdote.content}'`))
//         setTimeout(() => {
//             dispatch(clear_notification())
//         }, 5000)
 // dispatch(vote_anecdote(id))