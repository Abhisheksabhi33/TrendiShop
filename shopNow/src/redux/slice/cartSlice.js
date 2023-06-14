import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
   cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
   cartTotalQuantity: localStorage.getItem('cartTotalQuantity') ? JSON.parse(localStorage.getItem('cartTotalQuantity')) : 0,
    cartTotalAmount: localStorage.getItem('cartTotalAmount') ? JSON.parse(localStorage.getItem('cartTotalAmount')) : 0,


}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
      ADD_TO_CART(state, action){
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
        
        if(productIndex >= 0){
            // item already exists in cart
            // increase the cart quantity
            state.cartItems[productIndex].cartQuantity += 1;
            toast.info(` Quantity of ${action.payload.name} increased by one ` ,{position: "top-left"} );
        }else{
            // item does not exist in cart
            // add item to cart
            const tempProduct = {...action.payload, cartQuantity: 1}
            state.cartItems.push(tempProduct)

            toast.success(`${action.payload.name} added to cart` ,{position: "top-left"} );
        }
        // save cart to local storage
      
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        localStorage.setItem('cartTotalQuantity', JSON.stringify(state.cartTotalQuantity))
        localStorage.setItem('cartTotalAmount', JSON.stringify(state.cartTotalAmount))

        // state.cartTotalQuantity += 1
        // state.cartTotalAmount += action.payload.price

      },
  }
});

export const {ADD_TO_CART} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount


export default cartSlice.reducer