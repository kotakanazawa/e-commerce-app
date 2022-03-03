const { v4: uuid } = require("uuid")

exports.Mutation = {
  addCategory: (parent, args, { db }) => {
    const { input } = args
    const { name } = input

    const newCategory = {
      id: uuid(),
      name: name
    }

    db.categories.push(newCategory)
    return newCategory
  },
  addProduct: (parent, args, { db }) => {
    const { input } = args
    const { name, image, price, onSale, quantity, categoryId } = input

    const newProduct = {
      id: uuid(),
      name: name,
      image: image,
      price: price,
      onSale: onSale,
      quantity: quantity,
      categoryId: categoryId
    }

    db.products.push(newProduct)
    return newProduct
  },
  addReview: (parent, args, { db }) => {
    const { input } = args
    const { date, title, comment, rating, productId } = input

    const newReview = {
      id: uuid(),
      date: date,
      title: title,
      comment: comment,
      rating: rating,
      productId: productId
    }

    db.reviews.push(newReview)
    return newReview
  },
  deleteCategory: (parent, { id: deleteCategoryId }, { db }) => {
    db.categories = db.categories.filter(
      (category) => category.id !== deleteCategoryId
    )
    db.products = db.products.map((product) => {
      if (product.categoryId === deleteCategoryId)
        return {
          ...product,
          categoryId: null
        }
      else return product
    })
    return true
  },
  deleteProduct: (parent, { id: deleteProductId }, { db }) => {
    db.products = db.products.filter(
      (product) => product.id !== deleteProductId
    )
    db.reviews = db.reviews.filter(
      (review) => review.productId !== deleteProductId
    )
    return true
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id)
    return true
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((cateogry) => cateogry.id === id)
    if (index === -1) return null
    db.categories[index] = {
      ...db.categories[index],
      ...input
    }
    return db.categories[index]
  },
  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id)
    if (index === -1) return null
    db.products[index] = {
      ...db.products[index],
      ...input
    }
    return db.products[index]
  },
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id)
    if (index === -1) return null
    db.review[index] = {
      ...db.review[index],
      ...input
    }
    return db.review[index]
  }
}
