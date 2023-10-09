import React, { createContext, useContext, useReducer, useMemo } from "react";

const initialState = {
  currency: "USD",
  currencySymbol: "$",
  multiplierFactor: 1,
};

export const CurrencyContext = createContext(initialState);

CurrencyContext.displayName = "CurrencyContext";

function currencyReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENCY": {
      return {
        ...state,
        currency: "EURO",
        currencySymbol: "€",
        multiplierFactor: 0.8,
      };
    }

    default:
      return state;
  }
}

export const currencyProvider = (props) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  const toggleCurrency = () => dispatch({ type: "SET_CURRENCY" });

  const value = useMemo(
    () => ({
      ...state,
      toggleCurrency,
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
  <currencyProvider>{children}</currencyProvider>
);

export default useCurrency;
