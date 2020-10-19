function isValueAllowed({ value, allowedList }) {
  if ( allowedList.includes('all') ) {
    return true
  }

  if ( allowedList.includes(value) ) {
    return true
  }

  return false
}

export default function filterProducts({ productsData, allowedCategories, allowedTypes, allowedVariants }) {
  return productsData
    .filter(category => isValueAllowed({ value: category.id, allowedList: allowedCategories }))
    .map(({products, ...category}) => {
      const filteredProducts = products
        .filter(product => isValueAllowed({ value: product.type, allowedList: allowedTypes }))
        .filter(product => isValueAllowed({ value: product.variant, allowedList: allowedVariants }))
      return { ...category, products: filteredProducts }
    })
    .filter(category => category.products.length > 0)
}