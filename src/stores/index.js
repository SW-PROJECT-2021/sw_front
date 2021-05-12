import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage/session";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";

import { UserReducer } from "./reducers/UserReducer";
import { ProductReducer } from "./reducers/ProductReducer";
import { CartReducer } from "./reducers/CartReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  UserReducer,
  ProductReducer,
  CartReducer,
});

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    enhancedReducer,
    applyMiddleware(promiseMiddleware, ReduxThunk, logger)
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
