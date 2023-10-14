import { createSlice } from '@reduxjs/toolkit'


export const allUsersSlice = createSlice({
    name: "allUsers",
    initialState: {
        allUsers: null
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        }
    }
})

export const { setAllUsers } = allUsersSlice.actions