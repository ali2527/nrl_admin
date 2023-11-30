import { BrowserRouter, Routes, Route } from "react-router-dom";

//views imports
import Signin from "../../views/signin";
import ForgotPassword from "../../views/forget-password-1";
import ForgotPassword2 from "../../views/forget-password-2";
import ForgotPassword3 from "../../views/forget-password-3";
import Dashboard from "../../views/dashboard";
import Users from "../../views/users";
import UserDetails from "../../views/users/userDetails";
import Library from "../../views/books";
import ViewLibrary from "../../views/books/viewBook";
import AddLibrary from "../../views/books/addNewBook";
import EditLibrary from "../../views/books/editBook";
import Donations from "../../views/donations"

import Profile from "../../views/profile";
import ChangePass from "../../views/profile/changePass";
// import EditProfile from "../../views/profile/editProfile";

import PaymentLogs from "../../views/payment-logs";
import MemberCommunity from "../../views/member-community";
import NonmasonicCommunity from "../../views/non-masonic-community";
import MasonicArticles from "../../views/masonic-articles";
import NonMasonicArticles from "../../views/non-masonic-articles";
import ReligiousArticles from "../../views/religious-articles";
import LiveStreaming from "../../views/live-streaming";
import InventoryManagement from "../../views/products";
import OnlineServices from "../../views/online-services"
import ViewProduct from "../../views/products/viewProduct";
import Productadd from "../../views/products/addNewProduct";
import EditProduct from "../../views/products/editProduct";
import OrderManagement from "../../views/order-management";
import OrderDetails from "../../views/order-management/orderDetail";
import Categories from "../../views/categories";
import AdsManagement from "../../views/ads-management";
import AdDetails from "../../views/ads-management/adDetails";
import Notifications from "../../views/notifications";
import EditService from "../../views/online-services/editService";
import ViewService from "../../views/online-services/viewService";
import AddService from "../../views/online-services/addNewService"
import Events from "../../views/events/index";
import ViewEvent from "../../views/events/viewEvent";
import AddEvent from "../../views/events/addNewEvent";
import EditEvent from "../../views/events/editEvent";
import AddCategory from "../../views/categories/addNewCategory";
import News from "../../views/news";
import AddNews from "../../views/news/addNewNews";
import NewsDetails from "../../views/news/newsDetails";
import Histories from "../../views/histories";
import AddHistory from "../../views/histories/addNewHistory";
import HistoryDetails from "../../views/histories/historyDetails";

// import CategoryDetails from "../../views/categories/viewCategory";
import States from "../../views/state-management";
import StateDetails from "../../views/state-management/stateDetails";
import AddState from "../../views/state-management/addNewState";
import Positions from "../../views/position-management";
import PositionDetails from "../../views/position-management/positionDetails";
import AddPosition from "../../views/position-management/addNewPosition";
import Representatives from "../../views/representative-management";
import RepresentativeDetails from "../../views/representative-management/representativeDetails";
import AddRepresentative from "../../views/representative-management/addNewRepresentative";
import Orders from "../../views/orders"
import ViewOrder from "../../views/orders/orderDetails"
//components imports
import UserAuthCheck from "../../components/AuthCheck/UserAuthCheck";
// import AdminAuthCheck from "../../components/AuthCheck/AdminAuthCheck";
import ClientLayout from "../../components/ClientLayout";
import CategoryDetails from "../../views/categories/categoryDetails";

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" index element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-2" element={<ForgotPassword2 />} />
        <Route path="/forgot-password-3" element={<ForgotPassword3 />} />
        <Route
          path="/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
                activeTab="dashboard"
              >
                <Dashboard />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/users"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Users",
                  description: "Some Description.",
                }}
              >
                <Users />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/users/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "User Details",
                  description: "Some Description.",
                }}
              >
                <UserDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/donations"
          activeTab="donations"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Donations",
                  description: "Some Description.",
                }}
              >
                <Donations/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/states"
          activeTab="state"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "States",
                  description: "Some Description.",
                }}
              >
                <States />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/states/:id"
          activeTab="state"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit State",
                  description: "Some Description.",
                }}
              >
                <StateDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/states/addState"
          activeTab="state"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add State",
                  description: "Some Description.",
                }}
              >
                <AddState />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/representatives"
          activeTab="representatives"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Representatives",
                  description: "Some Description.",
                }}
              >
                <Representatives />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/representatives/:id"
          activeTab="representatives"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit Representatives",
                  description: "Some Description.",
                }}
              >
                <RepresentativeDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/representatives/addRepresentative"
          activeTab="representatives"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add Representative",
                  description: "Some Description.",
                }}
              >
                <AddRepresentative />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/positions"
          activeTab="positions"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Positions",
                  description: "Some Description.",
                }}
              >
                <Positions />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/positions/:id"
          activeTab="positions"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Edit Position",
                  description: "Some Description.",
                }}
              >
                <PositionDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/positions/addPosition"
          activeTab="positions"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add Position",
                  description: "Some Description.",
                }}
              >
                <AddPosition />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        <Route
          path="/library"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "library",
                  description: "Some Description.",
                }}
              >
                <Library />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/library/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Library",
                  description: "Some Description.",
                }}
              >
                <ViewLibrary/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        <Route
          path="/library/addNewLibrary"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Library add",
                  description: "Some Description.",
                }}
              >
                <AddLibrary/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/library/editLibrary/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "edit Library",
                  description: "Some Description.",
                }}
              >
                <EditLibrary/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        {/* <Route
          path="/Library/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Library",
                  description: "Some Description.",
                }}
              >
                <LibraryDetails/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/Library/addBook"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Library",
                  description: "Some Description.",
                }}
              >
                <Libraryadd/>
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}
        
        <Route
          path="/payments"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Payment Logs",
                  description: "Some Description.",
                }}
              >
                <PaymentLogs />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/masonic-community"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Member Community",
                  description: "Some Description.",
                }}
              >
                <MemberCommunity />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/non-masonic-community"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Non masonic Community",
                  description: "Some Description.",
                }}
              >
                <NonmasonicCommunity />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/non-masonic-community"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Member Community",
                  description: "Some Description.",
                }}
              >
                <MemberCommunity />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/masonic-articles"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Masonic Articles",
                  description: "Some Description.",
                }}
              >
                <MasonicArticles />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/non-masonic-articles"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "non Masonic Articles",
                  description: "Some Description.",
                }}
              >
                <NonMasonicArticles />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/religious-articles"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Religious Articles",
                  description: "Some Description.",
                }}
              >
                <ReligiousArticles />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        
        
        <Route
          path="/live-streaming"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Live Streaming",
                  description: "Some Description.",
                }}
              >
                <LiveStreaming/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/product-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Inventory Management",
                  description: "Some Description.",
                }}
              >
                <InventoryManagement/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/online-services"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Online Services",
                  description: "Some Description.",
                }}
              >
                <OnlineServices/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/online-services/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Service",
                  description: "Some Description.",
                }}
              >
                <ViewService/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        <Route
          path="/online-services/addNewService"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Service add",
                  description: "Some Description.",
                }}
              >
                <AddService/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/online-services/editService/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "edit Service",
                  description: "Some Description.",
                }}
              >
                <EditService/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/events"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Events",
                  description: "Some Description.",
                }}
              >
                <Events/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
      

<Route
          path="/events/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Event",
                  description: "Some Description.",
                }}
              >
                <ViewEvent/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        <Route
          path="/events/addNewEvent"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Event add",
                  description: "Some Description.",
                }}
              >
                <AddEvent/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/events/editEvent/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "edit Event",
                  description: "Some Description.",
                }}
              >
                <EditEvent/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />



<Route
          path="/orders"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Orders",
                  description: "Some Description.",
                }}
              >
                <Orders/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
      

<Route
          path="/orders/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Order",
                  description: "Some Description.",
                }}
              >
                <ViewOrder/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        <Route
          path="/product-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "View Product",
                  description: "Some Description.",
                }}
              >
                <ViewProduct/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/product-management/addNewProduct"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Product add",
                  description: "Some Description.",
                }}
              >
                <Productadd/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/product-management/editProduct/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "edit Product",
                  description: "Some Description.",
                }}
              >
                <EditProduct/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/order-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Order Management",
                  description: "Some Description.",
                }}
              >
                <OrderManagement/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/order-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Order Detail",
                  description: "Some Description.",
                }}
              >
                <OrderDetails/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/categories"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Categories",
                  description: "Some Description.",
                }}
              >
                <Categories/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/categories/addNewCategory"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add Category",
                  description: "Some Description.",
                }}
              >
                <AddCategory/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/categories/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Category Details",
                  description: "Some Description.",
                }}
              >
                <CategoryDetails/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/news"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "News",
                  description: "Some Description.",
                }}
              >
                <News/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/news/addNewNews"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add News",
                  description: "Some Description.",
                }}
              >
                <AddNews/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/news/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "News Details",
                  description: "Some Description.",
                }}
              >
                <NewsDetails/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/histories"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Histories",
                  description: "Some Description.",
                }}
              >
                <Histories/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/histories/addNewHistory"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Add History",
                  description: "Some Description.",
                }}
              >
                <AddHistory/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/histories/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "History Details",
                  description: "Some Description.",
                }}
              >
                <HistoryDetails/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />




        <Route
          path="/ads-management/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Ads Management",
                  description: "Some Description.",
                }}
              >
                <AdsManagement/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/ads-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Ad Details",
                  description: "Some Description.",
                }}
              >
                <AdDetails/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/profile"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "profile",
                  description: "Some Description.",
                }}
              >
                <Profile/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
          {/* <Route
            path="/profile/editProfile"
            index
            element={
              <UserAuthCheck>
                <ClientLayout
                  head={{
                    title: "EditProfile",
                    description: "Some Description.",
                  }}
                >
                  <EditProfile/>
                </ClientLayout>
              </UserAuthCheck>
            }
          /> */}
        <Route
          path="/profile/changePass"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "ChangePass",
                  description: "Some Description.",
                }}
              >
                <ChangePass/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/notifications"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notifications",
                  description: "Some Description.",
                }}
              >
                <Notifications />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
