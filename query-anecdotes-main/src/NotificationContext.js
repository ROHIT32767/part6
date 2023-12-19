import { createContext, useReducer, useContext } from 'react'

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
        return action.payload
    case "CLEAR_NOTIFICATION":
        return null
    case "ERROR_NOTIFICATION":
      return "Too short anecdote,must have length 5 or more"
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [Notification, NotificationDispatch] = useReducer(NotificationReducer, null)

  return (
    <NotificationContext.Provider value={[Notification, NotificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const NotificationAndDispatch = useContext(NotificationContext)
  return NotificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const NotificationAndDispatch = useContext(NotificationContext)
  return NotificationAndDispatch[1]
}

export default NotificationContext