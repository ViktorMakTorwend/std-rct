import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./gitHub/github.api";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultmMiddleware) => getDefaultmMiddleware().concat(githubApi.middleware)
})