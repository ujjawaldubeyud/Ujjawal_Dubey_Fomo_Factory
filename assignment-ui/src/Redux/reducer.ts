import { ITableActions } from "./actions"

interface IInitialState{
    tokenToShow: string
    tokenData: any
}

const initialState : IInitialState = {
    tokenToShow: "BTC",
    tokenData: []
}

export const tableReducer = (state = initialState, action: ITableActions) => {
    switch(action.type){
        case "SET_TOKEN_TO_SHOW":
        return{
            ...state,
            tokenToShow: action.payload
        }

        case "SET_TOKEN_DATA":
        return {
          ...state,
          tokenData: action.payload
        }

        default:
            return state
    }
}