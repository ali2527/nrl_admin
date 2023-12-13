export const SITE_NAME = "National Reparations League";

export const BASE_URL = "https://api.nationalreparationsleague.com/api";
export const UPLOADS_URL = "https://api.nationalreparationsleague.com/Uploads";
export const UPLOADS_URL2 = "https://api.nationalreparationsleague.com/";
export const SOCKET_URL = "https://api.nationalreparationsleague.com";


// export const BASE_URL = "http://localhost:3003/api";
// export const UPLOADS_URL = "http://localhost:3003/Uploads";
// export const UPLOADS_URL2 = "http://localhost:3003/";
// export const SOCKET_URL = "http://localhost:3003";




export const AUTH = {
  signin: "/admin/auth/signin",
  signup: "/auth/signup",
  emailCode: "/admin/auth/emailVerificationCode",
  verifyCode: "/admin/auth/verifyRecoverCode",
  resetPassword: "/admin/auth/resetPassword",
};

export const ADMIN = {
  getStats: "/admin/user/getStats",
  getDonationChart: "/admin/user/getDonationChart",
  getOrdersChart: "/admin/user/getOrdersChart",
  getAllUsers: "/admin/user/getAllUsers",
  getUserById: "/admin/user/getUserById/",
  toggleStatus: "/admin/user/toggleStatus",
  deleteUser: "/admin/user/deleteUser/",
};

export const USER = {
  updateProfile: "/profile/updateProfile",
  changePassword: "/profile/changePassword",
};

export const USERS = {
  get: "/users/admin",
  getAllUsers: "/admin/user/getAllUsers",
  getOne: "/admin/user/getUserById/",
  toggleStatus: "/admin/user/toggleStatus",
  deleteUser: "/admin/user/deleteUser/",
};

export const STATES = {
  addState: "/state/addState",
  getAllStates: "/state/getAllStates",
  getStateById: "/state/getStateById/",
  updateState: "/state/updateState/",
  deleteState: "/state/deleteState/",
};

export const POSITIONS = {
  addPosition: "/position/addPosition",
  getAllPositions: "/position/getAllPositions",
  getPositionById: "/position/getPositionById/",
  updatePosition: "/position/updatePosition/",
  deletePosition: "/position/deletePosition/",
};

export const REPRESENTATIVE = {
  addRepresentative: "/representative/addRepresentative",
  getAllRepresentatives: "/representative/getAllRepresentatives",
  getRepresentativeById: "/representative/getRepresentativeById/",
  updateRepresentative: "/representative/updateRepresentative/",
  deleteRepresentative: "/representative/deleteRepresentative/",
};

export const DONATIONS = {
  getAllDonations: "/donation/getAllDonations",
};

export const ORDERS = {
  getAllOrders: "/order/getAllOrders",
  updateOrder: "/order/updateOrder/",
  getOrderById: "/order/getOrderById/",
  deleteOrder: "/order/deleteOrder/",
};

export const CATEGORIES = {
  addCategory: "/category/addCategory",
  getAllCategories: "/category/getAllCategories",
  getCategoryById: "/category/getCategoryById/",
  toggleStatus: "/category/toggleActiveInActive",
  updateCategory: "/category/updateCategory/",
  deleteCategory: "/category/deleteCategory/",
};

export const NEWS = {
  addNews: "/news/addNews",
  getAllNews: "/news/getAllNews",
  getNewsById: "/news/getNewsById/",
  updateNews: "/news/updateNews/",
  deleteNews: "/news/deleteNews/",
};

export const HISTORIES = {
  addHistory: "/history/addHistory",
  getAllHistorys: "/history/getAllHistorys",
  getHistoryById: "/history/getHistoryById/",
  updateNews: "/history/updateHistory/",
  deleteHistory: "/history/deleteHistory/",
};

export const EVENT = {
  addEvent: "/event/addEvent",
  updateEvent: "/event/updateEvent/",
  getAllEvents: "/event/getAllEvents",
  getEventById: "/event/getEventById/",
  deleteEvent: "/event/deleteEvent/",
  toggleStatus: "/event/toggleStatus",
};

export const PRODUCT = {
  addProduct: "/product/addProduct",
  getAllProducts: "/product/getAllProducts",
  getProductById: "/product/getProductById/",
  deleteProduct: "/product/deleteProduct/",
  updateProduct: "/product/updateProduct/",
};

export const PAYMENT = {
  getAllOrderPayments: "/payment/getAllOrderPayments",
  getOne: "/payment/",
};

export const NOTIFICATION = {
  getAllNotifications: "/notification/getAllNotifications",
  getAllUnreadNotifications: "/notification/getAllUnreadNotifications",
  getNotificationById: "/notification/getNotificationById/",
  toggleNotification: "/notification/toggleNotification/",
};

export const CONTENT_TYPE = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
};
