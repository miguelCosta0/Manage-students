import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import rootReducer from "./modules/rootReducer.js";
import rootSaga from "./modules/rootSaga";
import persistReducer from './modules/reduxPersist.js';


const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});
const persistedStore =  persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistedStore };