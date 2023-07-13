import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Network, isValidNetwork } from './types'


export const networkSlice = createSlice({
    name: 'network',
    initialState: {
        newtork: Network.ETHEREUM
    },
    reducers: {
        changeNetwork: (state, action: PayloadAction<Network>) => {
            if (isValidNetwork(action.payload)) {
                state.newtork = action.payload
                return
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeNetwork } = networkSlice.actions

export default networkSlice.reducer