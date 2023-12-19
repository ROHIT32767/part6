import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        change_notification(state, action) {
            console.log('filter', action.payload)
            return action.payload
        },
        clear_notification(state, action) {
            return ''
        }
    },
})

export const initialize_notification = () => {
    return async dispatch => {
        dispatch(change_notification('Notification Message'))
    }
}

export const setNotification = (content,time) => {
    return async dispatch => {
        dispatch(change_notification(content))
        setTimeout(() => {
            dispatch(clear_notification())
        }, 1000*time)
    }
}

export const clear_notification_action = () => {
    return async dispatch => {
        dispatch(clear_notification())
    }
}


export const { change_notification,clear_notification } = NotificationSlice.actions
export default NotificationSlice.reducer