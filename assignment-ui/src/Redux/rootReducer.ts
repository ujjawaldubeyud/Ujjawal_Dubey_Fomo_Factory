import { combineReducers } from "redux";
import { tableReducer } from "./reducer";
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
    tableData: tableReducer
})

export type AppState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector
export default rootReducer