import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./gitHub/github.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { githubReducer } from "./gitHub/github.slice";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer
  },
  middleware: (getDefaultmMiddleware) => getDefaultmMiddleware().concat(githubApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>