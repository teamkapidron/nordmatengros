export enum ReactQueryKeys {
  // Auth
  GET_USER_DATA = 'GET::/auth/me',

  // Address
  GET_ADDRESSES = 'GET::/address',
  GET_ADDRESS_DETAILS = 'GET::/address/:addressId',

  // Favorite
  GET_FAVORITES = 'GET::/favorite/my',

  // Category
  GET_CATEGORIES = 'GET::/category/list',
  GET_CATEGORIES_FLATTENED = 'GET::/category/flattened',
  GET_CATEGORY_BY_ID = 'GET::/category/:categoryId',

  // Order
  GET_MY_ORDERS = 'GET::/order/my',
  GET_ORDER_DETAILS = 'GET::/order/:orderId',

  // Product
  GET_PRODUCTS = 'GET::/product/list',
  GET_PRODUCT_BY_ID = 'GET::/product/:productId',
  GET_PRODUCT_BY_SLUG = 'GET::/product/slug/:slug',
  QUICK_SEARCH_PRODUCTS = 'GET::/product/search/quick',
  FULL_SEARCH_PRODUCTS = 'GET::/product/search',

  // Discount
  GET_BULK_DISCOUNTS = 'GET::/discount/bulk/all',
}
