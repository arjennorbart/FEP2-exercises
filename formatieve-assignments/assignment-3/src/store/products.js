import { createSlice, createSelector } from 'https://cdn.skypack.dev/@reduxjs/toolkit@1.2.3';
import store from './index.js'

//--------- Reducers ---------//
function saveProductsReducer(state, action) {
  return action.payload
}

function removeProductReducer(state, action) {
  return state
    .map(category => ({
      ...category,
      products: category.products.filter(product => product.id !== action.payload.id)
    }))
    .filter(category => category.products.length > 0)
}

//--------- Selectors ---------//
const productsSelector = createSelector(
  state => state.products,
  (products) => products
)

const productSelector = createSelector(
  (state, { categoryId, id } = {}) => {
    try {
      const category = state.products.find(category => category.id === categoryId)
      return category.products.find(product => product.id === id)
    } catch (error) {
      return undefined
    }
  },
  product => product
)

const categorySelector = createSelector(
  (state, { categoryId }) => {
    try {
      return state.products.find(category => category.id === categoryId)
    } catch (error) {
      return undefined
    }
  },
  category => category
)

//--------- Slice ---------//
const products = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    saveProducts: saveProductsReducer,
    removeProduct: removeProductReducer,
  }
})

//--------- Export slice values ---------//
export const getProducts = () => productsSelector(store.getState())
export const getProduct = ({ categoryId, id }) => productSelector(store.getState(), { categoryId, id })
export const getCategory = ({ categoryId }) => categorySelector(store.getState(), { categoryId })

//--------- Export slice actions ---------//
export const {
  saveProducts,
  removeProduct,
} = products.actions

//--------- Export slice reducer ---------//
export default products.reducer

