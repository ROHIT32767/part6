import React from "react"
import { useDispatch } from 'react-redux'
import { create_anecdote } from '../reducers/anecdoteReducer'
import { change_notification, clear_notification } from '../reducers/notificationReducer'
import { setNotification } from "../reducers/notificationReducer"
export default function AnecdoteForm() {
    const dispatch = useDispatch()
    function handler() {
        dispatch(clear_notification())
    }
    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('create', content)
        dispatch(create_anecdote(content))
        dispatch(setNotification(`You created '${content}'`, 5))
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

// const NewAnecdote = await AnecdoteService.createNew(content)
// dispatch(create_anecdote(NewAnecdote))