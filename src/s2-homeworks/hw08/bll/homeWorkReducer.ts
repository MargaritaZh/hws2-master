import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const sortedState = [...state].sort((a, b) => a.name.localeCompare(b.name));
            return action.payload === 'up' ? sortedState : sortedState.reverse();// need to fix
        }
        case 'check': {
            return state.filter(u => u.age >= action.payload);// need to fix
        }
        default:
            return state
    }
}
