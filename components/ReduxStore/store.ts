import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../User/userSlice'
import modalReducer from '../Modals/ModalSlice'

function createStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            modal: modalReducer
        }
    })
}

const store = createStore()
export default store
// Based on Aziz's example
export type StoreState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch
