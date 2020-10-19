import { createSlice, createSelector } from 'https://cdn.skypack.dev/@reduxjs/toolkit@1.2.3';
import store from './index.js'

const savedState = JSON.parse(localStorage.getItem('cart')) || []

//--------- Reducers ---------//
function addReducer(state, action) {
  const existingProduct = state.find(product => product.id === action.payload.id)
  if (existingProduct == null) {
    state.push({...action.payload, quantity: 1})
  }
}

function removeReducer(state, action) {
  return state.filter(product => product.id !== action.payload.id)
}

function setQuantityReducer(state, action) {
  state.forEach(product => {
    if (product.id === action.payload.id) {
      product.quantity = action.payload.quantity
    }
  })
}

//--------- Selectors ---------//
const productsSelector = createSelector(
  state => state.products,
  state => state.cart, 
  (products, cart) => {
    return products.map(category => {
      const products = category.products.map(product => {
        const { quantity = 0 } = cart.find(cartProduct => cartProduct.id === product.id)
        return { ...product, quantity: Number(quantity) }
      })
      return { ...category, products }
    })
  }
)

const totalPriceSelector = createSelector(
  productsSelector,
  (cartProducts) => {
    let totalPrice = 0
    cartProducts.forEach(category => {
      category.products.forEach(product => {
        totalPrice += product.price * product.quantity
      })
    })
    return totalPrice
  }
)

const isProductInCartSelector = createSelector(
  (state, { id }) => Boolean(state.cart.find(product => product.id === id)),
  isProductInCart => isProductInCart
)

//--------- Slice ---------//
const cart = createSlice({
  name: 'cart',
  initialState: savedState,
  reducers: {
    add: addReducer,
    remove: removeReducer,
    setQuantity: setQuantityReducer,
  }
})

//--------- Export slice values ---------//
export const getProducts = () => productsSelector(store.getState())
export const getTotalPrice = () => totalPriceSelector(store.getState())
export const isProductInCart = ({ id }) => isProductInCartSelector(store.getState(), { id })

//--------- Export slice actions ---------//
export const {
  add,
  remove,
  setQuantity
} = cart.actions

//--------- Export slice reducer ---------//
export default cart.reducer