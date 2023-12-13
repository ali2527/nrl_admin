import { BrowserRouter, Routes, Route } from "react-router-dom";

//views imports
import Signin from "../../views/signin";
import ForgotPassword from "../../views/forget-password-1";
import ForgotPassword2 from "../../views/forget-password-2";
import ForgotPassword3 from "../../views/forget-password-3";
import Dashboard from "../../views/dashboard";
import Users from "../../views/users";
import UserDetails from "../../views/users/userDetails";
import Donations from "../../views/donations";

import Profile from "../../views/profile";
import ChangePass from "../../views/profile/changePass";
// import EditProfile from "../../views/profile/editProfile";

import PaymentLogs from "../../views/payment-logs";
import InventoryManagement from "../../views/products";
import ViewProduct from "../../views/products/viewProduct";
import Productadd from "../../views/products/addNewProduct";
import EditProduct from "../../views/products/editProduct";
import Categories from "../../views/categories";
import Notifications from "../../views/notifications";
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
import States from "../../views/state-management";
import StateDetails from "../../views/state-management/stateDetails";
import AddState from "../../views/state-management/addNewState";
import Positions from "../../views/position-management";
import PositionDetails from "../../views/position-management/positionDetails";
import AddPosition from "../../views/position-management/addNewPosition";
import Representatives from "../../views/representative-management";
import RepresentativeDetails from "../../views/representative-management/representativeDetails";
import AddRepresentative from "../../views/representative-management/addNewRepresentative";
import Orders from "../../views/orders";
import ViewOrder from "../../views/orders/orderDetails";
//components imports
import UserAuthCheck from "../../components/AuthCheck/UserAuthCheck";
// import AdminAuthCheck from "../../components/AuthCheck/AdminAuthCheck";
import ClientLayout from "../../components/ClientLayout";
import CategoryDetails from "../../views/categories/categoryDetails";
import NotificationDetails from "../../views/notifications/notificationDetails";

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
                <Donations />
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
                <InventoryManagement />
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
                <Events />
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
                <ViewEvent />
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
                <AddEvent />
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
                <EditEvent />
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
                <Orders />
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
                <ViewOrder />
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
                <ViewProduct />
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
                <Productadd />
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
                <EditProduct />
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
                <Categories />
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
                <AddCategory />
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
                <CategoryDetails />
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
                <News />
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
                <AddNews />
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
                <NewsDetails />
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
                <Histories />
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
                <AddHistory />
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
                <HistoryDetails />
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
                <Profile />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
      
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
                <ChangePass />
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
        <Route
          path="/notifications/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notification Details",
                  description: "Some Description.",
                }}
              >
                <NotificationDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
