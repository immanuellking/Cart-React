const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
      break;

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
      break;

    case "INCREASE":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.payload
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem
        ),
      };
      break;

    case "DECREASE":
      return {
        ...state,
        cart: state.cart
          .map((cartItem) =>
            cartItem.id === action.payload
              ? { ...cartItem, amount: cartItem.amount - 1 }
              : cartItem
          )
          .filter((cartItem) => cartItem.amount !== 0),
      };
      break;

    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );

      total = parseFloat(total.toFixed(2));

      return {
        ...state,
        total,
        amount,
      };
      break;

    case "LOADING":
      return { ...state, loading: true };
      break;

    case "DISPLAY_ITEMS":
      return { ...state, cart: action.payload, loading: false };
      break;

    case "TOGGLE_AMOUNT":
      return {
        ...state,
        cart: state.cart
          .map((cartItem) => {
            if (cartItem.id === action.payload.id) {
              return action.payload.type === "inc"
                ? { ...cartItem, amount: cartItem.amount + 1 }
                : { ...cartItem, amount: cartItem.amount - 1 };
            }
            return cartItem;
          })
          .filter((cartItem) => cartItem.id !== 0),
      };
      break;

    default:
      throw new Error("No Mathcing ACTION TYPE");
      break;
  }
  return state;
};

export default reducer;
