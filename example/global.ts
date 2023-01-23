import { typify } from "../src";

export type GlobalState = {
  x : number
  y : number
  auth : {
    name : string
    lastName : string
  }
};
type TypedActions = {
  setX: number;
  setY: number;
  setAuth : Partial<GlobalState["auth"]>
};
type NonTypedActions = {};

const typed = typify<GlobalState, TypedActions, NonTypedActions>();

export const getGlobal = typed.getGlobal;
export const setGlobal = typed.setGlobal;
export const addActionHandler = typed.addActionHandler;
export const useGlobal = typed.useGlobal;
export const dispatch = typed.dispatch;
export const getActions = typed.getActions;
export const withGlobal = typed.withGlobal;


const INITIAL_STATE : GlobalState = {
  x : 10,
  y : 10,
  auth: {
    name : "DEFAULT_NAME",
    lastName : "DEFAULT_LASTNAME",
  }
}

setGlobal(INITIAL_STATE)
