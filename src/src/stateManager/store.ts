import { configureStore } from '@reduxjs/toolkit'
import networkReducer from "./networkSlice";
import blockReducer from "./blockSlice";


const store = configureStore({
  reducer: {
    network: networkReducer,
    block: blockReducer
  },
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch