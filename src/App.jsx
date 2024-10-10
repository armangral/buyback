import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import DashoardLayout from "./layouts/DashoardLayout";
import ClientDashboardPage from "./pages/user/dashboard";
import AddProductPage from "./pages/user/product/AddProductPage";
import SigninPage from "./pages/auth/Signin";
import SignUpPage from "./pages/auth/Signup";
import UsersPage from "./pages/admin/dashboard/UsersPage";
import AdminLayout from "./layouts/AdminLayout";
import UserProfile from "./pages/user/userProfiling/userProfile";
import BuybackMarketplace from "./pages/user/marketplace/BuybackMarketplace";
import ProductList from "./pages/admin/productList/productList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="/signin" />} />

          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* <Route element={<SuperAdminProtectedRoute />}> */}
          <Route element={<DashoardLayout />}>
            <Route path="/users/dashboard" element={<ClientDashboardPage />} />
            <Route path="/users/products/create" element={<AddProductPage />} />

            <Route path="/users/profile" element={<UserProfile />} />
            <Route path="/users/marketplace" element={<BuybackMarketplace />} />
          </Route>
          {/* </Route> */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/users/all" element={<UsersPage />} />
            <Route path="/admin/products" element={<BuybackMarketplace />} />
            <Route path="/admin/products/manage" element={<ProductList />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "grey",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
