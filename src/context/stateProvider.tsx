import React, { createContext, useReducer, useContext } from "react";

type StateProviderProps ={
    reducer: React.ReducerWithoutAction<any>,
    initialState: unknown,
    children?: React.ReactNode,
}

const StateContext = createContext(null);

export const StateProvider = ({reducer, initialState, children}: StateProviderProps) =>
{
    return (
        <StateContext.Provider
          value={useReducer(reducer, initialState) as any}>
            {children}
          </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);