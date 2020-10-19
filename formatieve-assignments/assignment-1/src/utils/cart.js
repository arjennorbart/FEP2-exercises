function add({ category, id }) {
  const cart = getProducts()
  const existingProductInCart = cart.find(product => product.id === id)
  
  if (existingProductInCart === undefined) {
    cart.push({ category, id, quantity: 1 })
  }
  
  localStorage.setItem('cart', JSON.stringify(cart))
}

function remove({ id }) {
  const cart = getProducts()
  const cartWithoutProduct = cart.filter(product => product.id !== id)

  localStorage.setItem('cart', JSON.stringify(cartWithoutProduct))
}

function getProducts() {
  return JSON.parse(localStorage.getItem('cart')) || []
}

function totalProducts() {
  const cart = getProducts()
  return cart.length
}

function containsProductId({ id }) {
  const cart = getProducts()
  const existingProductInCart = cart.find(product => product.id === id)
  return Boolean(existingProductInCart)
}

export default {
  add,
  remove,
  getProducts,
  totalProducts,
  containsProductId,
}