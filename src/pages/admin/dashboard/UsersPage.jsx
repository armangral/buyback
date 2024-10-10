import { Box } from "@chakra-ui/react";
import Userstable from "src/features/admin/users/Userstable";

const UsersPage = () => {
  return (
    <Box className="lg:px-8 pt-10" color="indigo.700">
      <h1 className="md:text-4xl text-xl">Users Page</h1>
      <Userstable />
    </Box>
  );
};

export default UsersPage;
