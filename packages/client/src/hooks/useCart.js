import { CartItem } from "components";
import React, { useReducer, useContext, createContext, useEffect } from "react";

const initialState = {
  cart: [],
  itemCount: 0,
  cartTotal: 0,
};

export const calculateCartTotal = (cartItems) => {
  let total = 0;
  //console.log(cartItems);
  cartItems.map((item) => (total += item.price * item.quantity));

  return parseFloat(total.toFixed(2));
};

const reducer = (state, action) => {
  let nextCart = [...state.cart];
  switch (action.type) {
    case "ADD_ITEM":
      const existingIndex = nextCart.findIndex(
        (item) => item._id === action.payload._id
      );

      const numItemsToAdd = action.payload.quantity;

      if (existingIndex >= 0) {
        const newQuantity = parseInt(
          nextCart[existingIndex].quantity + numItemsToAdd
        );

        nextCart[existingIndex] = {
          ...action.payload,
          quantity: newQuantity,
        };
      } else {
        nextCart.push(action.payload);
      }

      //console.log(action.payload);
      var addedItem = {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount + numItemsToAdd,
        cartTotal: calculateCartTotal(nextCart),
      };

      localStorage.setItem("KenzieCart", JSON.stringify(addedItem));

      return addedItem;

    case "REMOVE_ITEM":
      nextCart = nextCart
        .map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      var removedItem = {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount > 0 ? state.itemCount - 1 : 0,
        cartTotal: calculateCartTotal(nextCart),
      };

      localStorage.setItem("KenzieCart", JSON.stringify(removedItem));

      return removedItem;

    case "REMOVE_ALL_ITEMS":
      let quantity = state.cart.find((i) => i._id === action.payload).quantity;

      var removedAllItems = {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
        itemCount: state.itemCount > 0 ? state.itemCount - quantity : 0,
      };

      localStorage.setItem("KenzieCart", JSON.stringify(removedAllItems));

      return removedAllItems;

    case "RESET_CART":
      localStorage.clear();

      return { ...initialState };

    case "LOAD_CART":
      localStorage.getItem("KenzieCart");

      return { ...state };

    case "UPDATE_CART":
      var updatedCart = {
        ...state,
        cart: nextCart,
        itemCount: state.itemCount,
        cartTotal: calculateCartTotal(nextCart),
      };

      localStorage.setItem("KenzieCart", JSON.stringify(updatedCart));

      return updatedCart;

    case "DELETE_CART":
      localStorage.clear();
      return { ...initialState };

    case "INIT_SAVED_CART":
      const initSavedCart = action.payload;
      //console.log(initSavedCart);
      if (initSavedCart) {
        const { cart, itemCount, cartTotal } = initSavedCart;

        return {
          ...state,
          cart: cart,
          itemCount: itemCount,
          cartTotal: cartTotal,
        };
      } else {
        return {
          ...state,
        };
      }

    case "APPLY_COUPON":
      //do i use updatedCart in here?? is that why we made the variable global?
      //update the cart total
      
      // if (couponDiscount) {
      //   const discountCartTotal = calculateCartTotal(nextCart) * couponDiscount;
      //   return {
      //     ...state,
      //     cart: nextCart,
      //     itemCount: state.itemCount,
      //     cartTotal: discountCartTotal,
      //   };
      // } else {
      //   return {
      //     ...state,
      //   };
      // }

    default:
      return state;
  }
};

const cartContext = createContext();

// Provider component that wraps your app and makes cart object ...
// ... available to any child component that calls useCart().
export function ProvideCart({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <cartContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

// Hook for child components to get the cart object ...
// ... and re-render when it changes.
export const useCart = () => {
  return useContext(cartContext);
};

// Provider hook that creates cart object and handles state
const useProvideCart = () => {
  const { state, dispatch } = useCart();

  const addItem = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const removeAllItems = (id) => {
    dispatch({
      type: "REMOVE_ALL_ITEMS",
      payload: id,
    });
  };

  const resetCart = () => {
    dispatch({
      type: "RESET_CART",
    });
  };

  const isItemInCart = (id) => {
    return !!state.cart.find((item) => item._id === id);
  };

  const loadCart = () => {
    dispatch({ type: "LOAD_CART" });
  };

  //pass in a cart
  const updateCart = () => {
    dispatch({ type: "UPDATE_CART" });
  };

  const deleteCart = () => {
    dispatch({ type: "DELETE_CART" });
  };

  const applyCoupon = () => {
    dispatch({ type: "APPLY_COUPON" });
  };

  //  Check for saved local cart on load and dispatch to set initial state
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("KenzieCart")) || false;
    if (savedCart) {
      dispatch({
        type: "INIT_SAVED_CART",
        payload: savedCart,
      });
    }
  }, [dispatch]);

  return {
    state,
    addItem,
    removeItem,
    removeAllItems,
    resetCart,
    isItemInCart,
    loadCart,
    updateCart,
    deleteCart,
    applyCoupon,
  };
};

export default useProvideCart;
