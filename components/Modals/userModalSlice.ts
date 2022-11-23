import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

export const userModalSlice = createSlice({
    name: 'userModal',
    initialState,
    reducers: {
        openUserModal: (state) => {
            state.isOpen = true
        },
        closeUserModal: (state) => {
            state.isOpen = false
        }
    }
})

export const {openUserModal, closeUserModal} = userModalSlice.actions
export default userModalSlice.reducer