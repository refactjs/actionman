import React, {createContext, FC, useEffect, useRef, useState,} from "react";
import {ActionFunc, ActionHandler, ActionPayload,} from "./global.types";
import {$withGlobal} from "./global.hoc";
import {createCallbackManager} from "./callback";
import {areDeepEqual} from "./areDeepEqual";

let currentGlobal = {};
const actionHandlers: Record<string, ActionHandler<unknown>> = {};
const actions: Record<string, ActionFunc> = {};

const {runCallbacks , addCallback} = createCallbackManager()

export const GlobalContext = createContext<unknown>({});

export function useForceReRender() {
  const [,setTrigger] = useState(false);

  return () => setTrigger(prev => !prev);
}
export function $useGlobalAndProps<T , O>(props: O ,cb : (...args : [globalProps : T , ownProps : O]) => Partial<T&O>): any {
  console.log({props,cb})
}
export function $useGlobalSelector<T>(cb : (global : T) => Partial<T>): T {
  const prevValRef = useRef<any>(null);
  const forceUpdate = useForceReRender();

  useEffect(() => {
    addCallback(() => {
      const [newVal , prevVal] = [cb(currentGlobal as T),prevValRef.current && cb(prevValRef.current)]
      if(!areDeepEqual(prevVal , newVal)) forceUpdate()
    });
  } , [])

  const global = currentGlobal
  const newVal = cb(global as T)

  prevValRef.current = global

  return newVal as T;
}

export function $getGlobal<T>() {
  return currentGlobal as T;
}
export function $setGlobal<T>(global : T) {
  currentGlobal = global as any
  runCallbacks()
  return currentGlobal as T;
}

export const $dispatch = (action: string, payload: any) : void => {
    setTimeout(() => {
      const reducer = actionHandlers[action];

      let reducerResult = reducer(currentGlobal, actionHandlers, payload);
      if (reducerResult instanceof Promise) {
        reducerResult.then((result) => {
          currentGlobal = result
          runCallbacks()
        });
        return
      }
      if (reducerResult) {
        currentGlobal = reducerResult as any;
      }
      runCallbacks();
    })
};

export const $addActionHandler = (
  actionName: string,
  resolver: ActionHandler<unknown>
) => {
  actionHandlers[actionName] = resolver;
  actions[actionName] = (payload?: ActionPayload) => {
    $dispatch(actionName, payload);
  };
};

export const $getActions = () => {
  return actions;
};

export const typify = <GLOBAL, ACTIONS, UNTYPED_ACTIONS>() => {
  type CombineActions = ACTIONS & UNTYPED_ACTIONS;
  type CombineActionNames = keyof CombineActions;
  type ActionHandlers = {
    [ActionName in keyof CombineActions]: (
      global: GLOBAL,
      actions: Record<string, ActionHandler<unknown>>,
      payload: CombineActions[ActionName]
    ) => GLOBAL | void | Promise<void>;
  };
  type Actions = {
    [ActionName in keyof CombineActions]: (
      payload: CombineActions[ActionName]
    ) => void;
  };

  return {
    getGlobal: $getGlobal as () => GLOBAL,
    setGlobal: $setGlobal as (global : GLOBAL) => GLOBAL,
    addActionHandler: $addActionHandler as <
      ActionName extends CombineActionNames
    >(
      action: ActionName,
      resolver: ActionHandlers[ActionName]
    ) => GLOBAL,
    useGlobal: $useGlobalSelector as <T>(cb : (global : GLOBAL) => T) => T ,
    dispatch: $dispatch,
    withGlobal: $withGlobal as unknown as <StateProps = any, OwnProps = any>(
      cb: (
        globalContextType: GLOBAL,
        ownProps: OwnProps
      ) => StateProps & OwnProps
    ) => (WrappedComponent: React.ComponentType<OwnProps>) => FC<OwnProps>,
    getActions: $getActions as () => Actions,
  };
};
