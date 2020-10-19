import { configureStore, combineReducers } from 'https://cdn.skypack.dev/@reduxjs/toolkit@1.2.3';

import cart from './cart.js'
import products from './products.js'

const store = configureStore({
  reducer: combineReducers({
    cart,
    products,
  })
})

store.subscribe(() => {
  const cart = store.getState().cart
  localStorage.setItem('cart', JSON.stringify(cart))
})

export default store