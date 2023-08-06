import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Network } from "alchemy-sdk";


export const networkSlice = createSlice({
    name: 'network',
    initialState: {
        newtork: Network.ETH_MAINNET
    },
    reducers: {
        changeNetwork: (state, action: PayloadAction<Network>) => {
            state.newtork = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeNetwork } = networkSlice.actions

export default networkSlice.reducer