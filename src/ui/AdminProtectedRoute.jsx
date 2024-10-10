import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useUser } from "src/features/auth/useUser";

const FullPage = ({ children }) => (
  <div className="h-screen bg-gray-50 flex items-center justify-center">
    {children}
  </div>
);

function AdminProtectedRoute() {
  const navigate = useNavigate();

  //1. Load authenticated user
  const { isLoading, isAuthenticated, user } = useUser();

  console.log("admin", user);

  //2 . if not authenticated, redirect to login page

  useEffect(
    function () {
      if (!isLoading) navigate("/signin");
    },
    [isLoading, navigate]
  );

  // 3. if loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner size="xl" />
      </FullPage>
    );

  //4. if user render app
  if (user?.email === "abdulrehmanmangral86@gmail.com") {
    return <Outlet />;
  } else {
    return (
      <FullPage>
        <h1>Not Enough Access!</h1>
      </FullPage>
    );
  }
}

export default AdminProtectedRoute;
