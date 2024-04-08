import {configureStore} from "@reduxjs/toolkit"
import foundationReducer from "./foundationSlice.js"
import userReducer from "./userSlice.js"
import storage from "redux-persist/lib/storage";

import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
  } from "redux-persist";
  
  import { combineReducers } from "@reduxjs/toolkit";
  

// export const store = configureStore({
//     reducer:{
//         foundation: foundationReducer,
//         userId: userReducer,
//     }
    
// })
   
const reducers = combineReducers({
    foundation: foundationReducer,
        userId: userReducer,
  });
  
  const persistConfig = {
    key: "root",
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // serializableCheck: {
        //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // },
        serializableCheck: false,
      }),
  });
  
  export default store;