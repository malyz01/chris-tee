const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require('../../mongoose/db/product');
const { register, login } = require('../../mongoose/db/auth');
const { AuthenticationError } = require('apollo-server');
exports.resolvers = {
  // Mutations
  createProduct: ({ product }) => {
    return createProduct(product);
  },
  updateProduct: ({ product }) => {
    return updateProduct(product);
  },
  deleteProduct: ({ id }) => {
    return deleteProduct(id);
  },
  register: (args) => {
    return register(args).then((res) => {
      const token = res.token;
      return {
        token,
        ...res._doc,
      };
    });
  },
  login: async (args) => {
    return login(args).then((res) => {
      const token = res.token;
      return {
        token,
        ...res._doc,
      };
    });
  },

  // Queries
  product: ({ id }) => getProduct(id),
  products: () => getProducts(),
  me: (args, context) => {
    // console.log(context.user)
    if (context().loggedIn) {
      return context().user;
    } else {
      throw new AuthenticationError('Please Login Again!');
    }
  },
};
