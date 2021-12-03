import {
  UPDATE_ZONE  
} from '../actions/types'

const initialState = { response: null  }

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_ZONE:
    	const { payload } = action
    	console.log('update zone reducer payload', action)
      return {  ...state, response: payload } 
    default:
      return state
  }
}
