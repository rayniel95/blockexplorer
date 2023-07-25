import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { BlockWithTransactionData } from "ethereum-types";


export const blockSlice = createSlice({
    name: 'block',
    initialState: {
        block: {}
    },
    reducers: {
        actualBlock: (state, action: PayloadAction<BlockWithTransactionData>) => {
            state.block = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { actualBlock } = blockSlice.actions

export default blockSlice.reducer