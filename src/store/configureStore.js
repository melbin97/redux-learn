import { configureStore } from "@reduxjs/toolkit";
import api from "./middleware/api";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import reducer from "./reducers";

export default function configureAppStore() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(), 
      logger({ destination: "console" }), 
      errorHandler, 
      api
    ]
  })
}