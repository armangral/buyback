import { Box } from "@chakra-ui/react";
import CreateProductForm from "src/features/product/CreateProductForm";

const AddProductPage = () => {
  return (
    <Box className="lg:px-8 pt-10" color="indigo.700">
      <CreateProductForm />
    </Box>
  );
};

export default AddProductPage;
