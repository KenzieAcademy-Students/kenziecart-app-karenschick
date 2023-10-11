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
      if (state.currency === "EURO") {
        return {
          ...state,
          currency: "EURO",
          currencySymbol: "€",
          multiplierFactor: 0.8,
        };
      } else {
        return {
          ...state,
        };
      }
    }

    default:
      return state;
  }
}



export const CurrencyProvider = (props) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  const toggleCurrency = () => dispatch({ type: "SET_CURRENCY" });

  const getPrice = (amount) => {
    return amount * state.multiplierFactor;
  };

  const value = useMemo(
    () => ({
      ...state,
      toggleCurrency,
      getPrice,
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
