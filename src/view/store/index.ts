import { Action, applyMiddleware, combineReducers, Reducer } from "redux";
import * as redux from "redux";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, * as reduxThunk from "redux-thunk";
import * as authentication from "./authentication";

interface IDuck {
  initializeStore?: (store: Store) => void;
  persistent: boolean;
  reducer: Reducer;
}

const ducks: { [name: string]: IDuck } = { authentication };

export interface IGlobalState {
  authentication: authentication.IState;
}

export type Store = redux.Store<IGlobalState, any>;

export type ThunkAction = reduxThunk.ThunkAction<
  any,
  IGlobalState,
  void,
  Action
>;

export function createStore(): {
  persistor: Persistor;
  store: Store;
} {
  const store = redux.createStore(
    persistReducer(
      {
        key: "root",
        storage,
        whitelist: Object.keys(ducks).filter(name => ducks[name].persistent)
      },
      combineReducers({ authentication: authentication.reducer })
    ),
    applyMiddleware(thunk)
  );

  for (const name of Object.keys(ducks)) {
    const { initializeStore } = ducks[name];

    if (initializeStore) {
      initializeStore(store);
    }
  }

  return { persistor: persistStore(store), store };
}
