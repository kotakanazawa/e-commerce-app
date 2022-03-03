exports.Product = {
  category: (parent, args, { db }) => {
    const { categoryId } = parent
    return db.categories.find((category) => category.id === categoryId)
  },
  reviews: (parent, args, { db }) => {
    const { id: productId } = parent
    return db.reviews.filter(review => review.productId === productId)
  },
}
