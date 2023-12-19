import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filter_anecdote(state, action) {
            console.log('filter', action.payload)
            return action.payload
        }
    },
})

export const { filter_anecdote } = FilterSlice.actions
export default FilterSlice.reducer

// const reducer = (state = initialState, action) => {
//     console.log('state now: ', state)
//     console.log('action', action)
//     switch (action.type) {
//         case 'FILTER':
//             return action.payload.text
//         default:
//             return state
//     }
//     return state
// }

// export const filter_anecdote = (text) => {
//     console.log('filter', text)
//     return {
//         type: 'FILTER',
//         payload: { text }
//     }
// }