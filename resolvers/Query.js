exports.Query = {
  products: (_parent, { filter }, { db }) => {
    let filteredProducts = db.products

    if (filter) {
      const { onSale, avgRating } = filter

      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale
        })
        // } else if (filter.onSale === false) {
        //   filteredProducts = filteredProducts.filter((product) => {
        //     return product.onSale === false
        //   })
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0
          let numberOfReviews = 0
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating
              numberOfReviews++
            }
          })
          const avgProductRating = sumRating / numberOfReviews

          return avgProductRating >= avgRating
        })
      }
    }
    return filteredProducts
  },
  product: (parent, args, { db }) => {
    const { id: productId } = args
    return db.products.find((product) => product.id === productId)
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, args, { db }) => {
    const { id: categoryId } = args
    return db.categories.find((category) => category.id === categoryId)
  },
  reviews: (parent, args, { reviews }) => reviews
}
