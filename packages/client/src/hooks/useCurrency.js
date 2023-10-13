import React, { createContext, useContext, useReducer, useMemo } from "react";

const initialState = {
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
        currencySymbol: state.currencySymbol === "$" ? "€" : "$",
        multiplierFactor: state.multiplierFactor === 1 ? 0.8 : 1,
      };
    }
    default:
      return state;
  }
}

export const CurrencyProvider = (props) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  const toggleCurrency = () => dispatch({ type: "SET_CURRENCY" });

  const getPrice = (amount) => {
    const newAmount = (amount * state.multiplierFactor).toFixed();
    return `${state.currencySymbol}${newAmount} `;
  };

  return (
    <CurrencyContext.Provider
      value={{ toggleCurrency, getPrice, currency: state }}
      {...props}
    />
  );
};

export const useCurrency = () => {
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
