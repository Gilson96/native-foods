import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  foodSelected: 0,
  selectedFoodPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action, totalFoodPrice) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        
      } else {
        state.cart.push({
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.name,
          price: action.payload.price,
          totalPrice: totalFoodPrice,
          description: action.payload.description,
          quantity: action.payload.quantity + 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload)

      const itemIndex = state.cart.findIndex(
        item => item.id === action.payload
      );
      
      if (item.quantity <= 1) {
         state.cart.splice(itemIndex, 1)
      } else {
        item.quantity--
      }

    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload)
      item.quantity++
    },

    // Food selected's state
    selectFood: (state,action) => {
      const selectedFood = action.payload
      state.foodSelected = selectedFood 
    },

    totalFoodPrice: (state, action) => {
      state.selectedFoodPrice  += action.payload
    }
  },
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, selectFood, totalFoodPrice} = cartSlice.actions

export const selectBasketTotal = (state) => state.cart.cart.reduce((total,item) => total += Number.parseFloat(item.price)*item.quantity, 0)

export default cartSlice.reducer