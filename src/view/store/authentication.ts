import { Dispatch, Store } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as firebase from "../drivers/firebase";

const actionCreator = actionCreatorFactory("AUTHENTICATION");

const setSignInState = actionCreator<boolean>("SET_SIGN_IN_STATE");

export const actionCreators = {
  signIn: (): any => async (dispatch: Dispatch): Promise<void> => {
    try {
      await firebase.signIn();
      dispatch(setSignInState(true));
    } catch {
      alert("Failed to sign in");
    }
  },
  signOut: (): any => async (dispatch: Dispatch): Promise<void> => {
    await firebase.signOut();
    dispatch(setSignInState(false));
  }
};

export type IActionCreators = typeof actionCreators;

export interface IState {
  signedIn: boolean;
}

export const initialState: IState = { signedIn: false };

export const reducer = reducerWithInitialState(initialState).case(
  setSignInState as any, // TODO: Fix this type.
  (_: IState, signedIn: boolean) => ({ signedIn })
);

export function initializeStore(store: Store): void {
  firebase.onAuthStateChanged(user => store.dispatch(setSignInState(!!user)));
}

export const persistent = false;
