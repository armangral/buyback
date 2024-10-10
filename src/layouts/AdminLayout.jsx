import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "src/ui/AdminSidebar";

const AdminLayout = () => {
  return (
    <Container maxW="container.3xl" p={4} className="min-h-screen">
      <AdminSidebar />
      <Box minH="100vh" bg={useColorModeValue("white")}>
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Outlet />
        </Box>
      </Box>{" "}
    </Container>
  );
};

export default AdminLayout;
