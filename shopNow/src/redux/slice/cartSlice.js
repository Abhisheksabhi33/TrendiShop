import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: localStorage.getItem("cartTotalQuantity")
    ? JSON.parse(localStorage.getItem("cartTotalQuantity"))
    : 0,
  cartTotalAmount: localStorage.getItem("cartTotalAmount")
    ? JSON.parse(localStorage.getItem("cartTotalAmount"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        // item already exists in cart
        // increase the cart quantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(` Quantity of ${action.payload.name} increased by one `, {
          position: "top-left",
        });
      } else {
        // item does not exist in cart
        // add item to cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);

        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      // save cart to local storage

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem(
        "cartTotalQuantity",
        JSON.stringify(state.cartTotalQuantity)
      );
      localStorage.setItem(
        "cartTotalAmount",
        JSON.stringify(state.cartTotalAmount)
      );

      // state.cartTotalQuantity += 1
      // state.cartTotalAmount += action.payload.price
    },

    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;

        toast.info(` Quantity of ${action.payload.name} decreased by one `, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;

        toast.success(`${action.payload.name} removed from the cart`, {
          position: "top-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    REMOVE_FROM_CART(state, action){
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

        state.cartItems = newCartItem;

        toast.success(`${action.payload.name} removed from the cart`, {
          position: "top-left",
        });
       
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },

    CLEAR_CART(state, action){
      state.cartItems = [];
 
      toast.info( `Cart has been Cleared`, {
        position: "top-left",
      });
     
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },

    CALCULATE_SUBTOTAL(state, action){
         const array = [];
         state.cartItems.map((item) => {
            const {price, cartQuantity} = item;
            const cartItemAmount = price*cartQuantity;
            
            return array.push(cartItemAmount);
          
         })

         let totalAmount =0;
         
         if(array.length>0){
          totalAmount = array.reduce((a,b) =>{
             return a+b;
         })

        }

         state.cartTotalAmount = totalAmount;
    },

    CALCULATE_TOTAL_QUANTITY(state, action){
      const array = [];
      state.cartItems.map((item) => {
         const { cartQuantity} = item;
         const quantity = cartQuantity;
         
         return array.push(quantity);
       
      })

      const totalQuantity = array.reduce((a,b) =>{
          return a+b;
      }, 0);

      state.cartTotalQuantity = totalQuantity;
    }


  },
});

export const { ADD_TO_CART, DECREASE_CART , REMOVE_FROM_CART , CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
