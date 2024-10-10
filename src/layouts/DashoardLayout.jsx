import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "src/ui/sidebar";

const DashoardLayout = () => {
  return (
    <Container maxW="container.3xl" p={4} className="min-h-screen">
      <Sidebar />
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Outlet />
        </Box>
      </Box>{" "}
    </Container>
  );
};

export default DashoardLayout;
