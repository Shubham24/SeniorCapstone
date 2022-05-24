
/**
 * User Reducer for Redux
 * @param state : state that will be stored in the redux store
 * @param action : action that will be used to modify/get the state from the store
 * @returns : current state or user depending on the action
 */
const userReducer = (state = {}, action: any) => {
    switch (action.type) {
        case 'GET_USER':
        return state;

        case 'SET_USER':
        return {...action.user}

        default:
        return state;

    }
}

export default  userReducer;