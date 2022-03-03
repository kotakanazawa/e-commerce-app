exports.Category = {
  products: (parent, args, { db }) => {
    const { id: categoryId } = parent
    const categoryProducts = db.products.filter((product) => product.categoryId === categoryId)
    let filteredCategoryProducts = categoryProducts

    const { filter } = args
    if(filter) {
      if(filter.onSale === true) {
        filteredCategoryProducts = filteredCategoryProducts.filter(product => {
          return product.onSale
        })
      } else if(filter.onSale === false) {
        filteredCategoryProducts = filteredCategoryProducts.filter(product => {
          return product.onSale === false
        })
      }
    }

    return filteredCategoryProducts
  }
}
