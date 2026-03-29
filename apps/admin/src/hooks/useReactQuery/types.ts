export enum ReactQueryKeys {
  // Auth
  GET_ADMIN_DATA = 'GET::/admin/auth/me',

  // Products
  GET_ALL_PRODUCTS = 'GET::/product/all',
  GET_PRODUCT_DETAILS = 'GET::/product/:productId',
  GET_PRODUCT_BY_SLUG = 'GET::/product/slug/:slug',
  GET_LOW_STOCK_PRODUCTS = 'GET::/product/low-stock',
  GET_TOP_PRODUCTS = 'GET::/product/top',
  GET_PRODUCT_STATS = 'GET::/product/stats',
  GET_QUICK_SEARCH_PRODUCTS = 'GET::/product/search/quick',

  // Inventory
  GET_ALL_INVENTORY = 'GET::/inventory',
  GET_PRODUCT_INVENTORY = 'GET::/inventory/product/:productId',
  GET_INVENTORY_STATS = 'GET::/inventory/stats',

  // Users
  GET_ALL_USERS = 'GET::/user/all',
  GET_USER_DETAILS = 'GET::/user/:userId',
  GET_USER_REGISTRATION_GRAPH_DATA = 'GET::/user/graph/registration',
  GET_USER_STATS = 'GET::/user/stats',
  GET_TOP_USERS = 'GET::/user/top',

  // Orders
  GET_ALL_ORDERS = 'GET::/order/all',
  GET_ORDER_DETAILS = 'GET::/order/:orderId',
  GET_ORDER_STATS = 'GET::/order/stats',
  GET_ORDER_REVENUE_STATS = 'GET::/order/revenue-stats',
  GET_ORDER_STATUS_GRAPH_DATA = 'GET::/order/graph/status',
  GET_ORDER_REVENUE_GRAPH_DATA = 'GET::/order/graph/revenue',
  GET_RECENT_ORDERS = 'GET::/order/recent',

  // Categories
  GET_ALL_CATEGORIES = 'GET::/category/all',
  GET_ALL_CATEGORIES_FLATTENED = 'GET::/category/all/flattened',
  GET_CATEGORY_DETAILS = 'GET::/category/:categoryId',
  GET_CATEGORY_STATS = 'GET::/category/stats',

  // Newsletter
  GET_NEWSLETTER_STATS = 'GET::/newsletter/stats',
  GET_NEWSLETTER_PREVIEW = 'POST::/newsletter/preview',

  // Promotion
  PREVIEW_PROMOTION_POSTER = 'POST::/promotion/preview-poster',

  // Discounts
  GET_DISCOUNTS = 'GET::/discount/all',
  GET_BULK_DISCOUNTS = 'GET::/discount/bulk/all',

  // Export
  EXPORT_ORDERS = 'GET::/export/orders',
  EXPORT_PRODUCTS = 'GET::/export/products',
  EXPORT_USERS = 'GET::/export/users',

  // Settings
  GET_ALL_ADMINS = 'GET::/user/admin/all',
  GET_SITE_CONFIG = 'GET::/product/config',
}
