export const SITE_NAME = "National Reparations League"

// export const BASE_URL = "http://localhost:3002/api"
// export const UPLOADS_URL = "http://localhost:3002/Uploads"
// export const UPLOADS_URL2 = "http://localhost:3002/"


export const BASE_URL = "https://secure.demo243.webhostlabs.net:3003/api"
export const UPLOADS_URL = "https://secure.demo243.webhostlabs.net:3003/Uploads"
export const UPLOADS_URL2 = "https://secure.demo243.webhostlabs.net:3003/"



export const AUTH = {
  signin: "/auth/signin",
  signup:"/auth/signup",
  emailCode:"/auth/emailVerificationCode",
  verifyCode:"/auth/verifyRecoverCode",
  resetPassword:"/auth/resetPassword",
}

export const USER = {
  updateProfile : "/profile/updateProfile",
}

export const POST = {
  addPost: "/post/addPost",
  getAllNonMemberPosts:"/post/getAllNonMemberPosts",
  getAllMemberPosts:"/post/getAllMemberPosts"
};

export const SERVICE = {
  addService: "/service/addService",
  updateService: "/service/updateService/",
  getAllServices:"/service/getAllServices",
  getServiceById:"/service/getServiceById/",
  deleteService:'/service/deleteService/',
  toggleStatus:'/service/toggleStatus'
};

export const EVENT = {
  addEvent: "/event/addEvent",
  updateEvent: "/event/updateEvent/",
  getAllEvents:"/event/getAllEvents",
  getEventById:"/event/getEventById/",
  deleteEvent:'/event/deleteEvent/',
  toggleStatus:'/event/toggleStatus'
};

export const PRODUCT = {
  addProduct: "/product/addProduct",
  getAllProducts:"/product/getAllProducts",
  getProductById:"/product/getProductById/"
};
export const BOOK = {
  addBook: "/book/addBook",
  updateBook: "/book/updateBook/",
  getAllBooks:"/book/getAllBooks",
  getBookById:"/book/getBookById/",
  deleteBook:'/book/deleteBook/',
};



  export const USERS = {
    get: "/users/admin",
    getAllUsers:"/admin/user/getAllUsers",
    getOne: "/users/getById/",
    toggleStatus: "/admin/user/toggleStatus",
  };

  export const SERVICE_PROVIDERS = {
    get: "/users/admin/serviceProvider",
    getOne: "/users/getSpById/",
    toggleStatus: "/users/toggleActiveInActive",
  };

  export const CATEGORIES = {
    get: "/category/GetAllCategoriesNew",
    getOne: "/category/admin/",
    toggleStatus: "/category/toggleActiveInActive",
    edit:"/category/edit/",
  };

  export const FEEDBACK = {
    get: "/contact",
    getOne: "/contact/feedbackById/",
  };


  export const SUBSCRIPTION = {
    get: "/Plan",
    create:"/Plan",
    getOne: "/Plan/",
    edit: "/Plan/edit",
  };


  export const PAYMENT = {
    get: "/payment",
    getOne: "/payment/",
  };

  export const NOTIFICATION = {
    get: "/notification/getAllAlertsAndNotifications",
    getOne: "/notification/notificationDetail/",
    create: "/notification/createAlertOrAnnoucement",
  };
  
  export const QUERY = {
    get: "/query",
    getOne: "/query/queryById/",
  };

  export const ARTICLE = {
    get: "/article/getAllArticles",
    getOne: "/article/getArticleById/",
    add: "/article/addArticle",
    edit: "/article/updateArticle/",
    delete:"/article/deleteArticle/",
  };


  export const ARTICLECATEGORIES = {
    get: "/articleCategory/getAllArticleCategories",
    getOne: "/articleCategory/getArticleCategoryById/",
    add: "/articleCategory/addArticleCategory",
    edit: "/articleCategory/updateArticleCategory/",
    delete:"/articleCategory/deleteArticelCategory/",
  };

  export const CONTENT_TYPE = {
    JSON: "application/json",
    FORM_DATA: "multipart/form-data",
}