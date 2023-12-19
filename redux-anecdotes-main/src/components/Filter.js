import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { filter_anecdote } from '../reducers/filterReducer'
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        const text = event.target.value
        console.log('filter', text)
        dispatch(filter_anecdote(text))
    }
    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter