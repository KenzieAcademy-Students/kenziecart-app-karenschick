import React, { createContext, useContext, useReducer, useMemo } from "react";

const initialState = {
  displaySidebar: false,
};

export const CurrencyContext = createContext(initialState);

CurrencyContext.displayName = "CurrencyContext";

function currencyReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENCY": {
      return {
        ...state,
        displaySidebar: true,
      };
    }

    default:
      return state;
  }
}

export const currencyProvider = (props) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: "CLOSE_SIDEBAR" })
      : dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: "CLOSE_SIDEBAR" });

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
    }),
    [state]
  );

  return <CurrencyContext.Provider value={value} {...props} />;
};

const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error(`useCurrency must be used within a CurrencyProvider`);
  }
  return context;
};

export const ManagedCurrencyContext = ({ children }) => (
  <CurrencyProvider>{children}</CurrencyProvider>
);

export default useCurrency;
