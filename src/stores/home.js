

const INCREMENT = 'HOME_INCREMENT'
const DECREAMENT = 'HOME_DECREAMENT'

const initState = {
  count: 0,
}

export const home = (state = initState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      }
    case DECREAMENT:
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return state
  }
}

export const sss = () => {
  return {
    type: INCREMENT,
  }
}

export const aaa = () => {
  return {
    type: DECREAMENT,
  }
}

export const increment = () => {
  return dispatch => dispatch({
    type: INCREMENT,
  })
}

export const decrement = () => {
  return dispatch => dispatch({
    type: DECREAMENT,
  })
}
