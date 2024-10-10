import { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaTruck, FaEnvelope } from "react-icons/fa";

import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Checkbox,
  Button,
  Box,
  Flex,
  Grid,
  Text,
  Textarea,
  Icon,
} from "@chakra-ui/react";
import { supabase } from "src/services/supabase";
import toast from "react-hot-toast";

const brands = {
  mobile: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
  laptop: ["Dell", "HP", "Lenovo", "Apple", "Asus"],
  tablet: ["Apple", "Samsung", "Microsoft", "Amazon"],
};

export default function CreateProductForm() {
  const [images, setImages] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [storage, setStorage] = useState();
  const [defects, setDefects] = useState({
    screenCrack: false,
    batteryIssue: false,
    buttonsMalfunction: false,
    speakerIssue: false,
    cameraDamage: false,
  });
  const [yearOfPurchase, setYearOfPurchase] = useState("");
  const [imei, setImei] = useState("");
  const [estimatedprice, setEstimatedPrice] = useState(0);

  const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];
  const conditionOptions = ["New", "Like New", "Good", "Fair", "Poor"];

  const [errors, setErrors] = useState({});

  const [serviceType, setServiceType] = useState("pickup"); // Default to pickup
  const [parcelInstructions, setParcelInstructions] = useState(""); // State for parcel instructions
  const [loading, setLoading] = useState(false);

  const handleInstructionsChange = (event) => {
    setParcelInstructions(event.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((currentImages) => {
        const updatedImages = [...currentImages, ...newImages];
        return updatedImages.slice(0, 3); // Limit to 3 images
      });
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((currentImages) =>
      currentImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const validateFields = () => {
    const validationErrors = {};
    if (!deviceType) validationErrors.deviceType = "Device Type is required";
    if (!brand) validationErrors.brand = "Brand is required";
    if (!model) validationErrors.model = "Model is required";
    if (!yearOfPurchase)
      validationErrors.yearOfPurchase = "Year of Purchase is required";
    if (!imei)
      validationErrors.imei =
        deviceType === "mobile"
          ? "IMEI is required"
          : "Serial Number is required";
    if (!condition) validationErrors.condition = "Condition is required";
    if (!storage) validationErrors.storage = "Storage is required";
    if (!images.length > 0) validationErrors.images = "Images are required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  const handleImageUpload = async (imageFiles) => {
    const uploadedImageUrls = [];
    for (let image of imageFiles) {
      const fileName = `${Date.now()}_${image.name}`; // Create unique file name
      const { data, error } = await supabase.storage
        .from("products") // Assuming "products" is your storage bucket
        .upload(fileName, image);
      if (error) {
        throw new Error(error.message);
      }
      const publicUrl = supabase.storage.from("products").getPublicUrl(fileName)
        .data.publicUrl;
      uploadedImageUrls.push(publicUrl);
    }
    return uploadedImageUrls;
  };

  const handleReset = () => {
    setDeviceType("");
    setBrand("");
    setModel("");
    setCondition("");
    setStorage("");
    setDefects({
      screenCrack: false,
      batteryIssue: false,
      buttonsMalfunction: false,
      speakerIssue: false,
      cameraDamage: false,
    });
    setYearOfPurchase("");
    setImei("");
    setImages([]);
    setEstimatedPrice(70); // Set to initial estimated price
    setErrors({});
    setParcelInstructions("");
    setServiceType("pickup"); // Reset to default service type
    setEstimatedPrice(0);
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setLoading(true); // Show loading spinner
    try {
      // Step 1: Upload images to Supabase storage
      const uploadedImageUrls = await handleImageUpload(images);

      // Step 2: Insert product data into the Products table
      const { data, error } = await supabase
        .from("products") // Replace "Products" with your actual table name
        .upsert([
          {
            device_type: deviceType,
            brand,
            model,
            condition,
            storage,
            defects,
            year_of_purchase: yearOfPurchase,
            imei,
            price: estimatedprice,
            images: uploadedImageUrls, // Store image URLs in the table
            approved_product: false, // Set approved_product to false initially
          },
        ]);

      if (error) {
        throw new Error(error.message);
      }

      // Show success message
      toast.success("Product submitted successfully!");
      handleReset();
    } catch (error) {
      console.error("Error submitting product:", error.message);
      toast.error("Failed to submit product. Please try again.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleCalculatePrice = () => {
    // Create a device object with all the relevant information
    const device = {
      deviceType,
      brand,
      model,
      condition,
      storage,
      defects,
      yearOfPurchase,
      imei,
    };
    console.log("hahaha", device);

    // Example base price (can be adjusted based on the model/brand)
    let basePrice = 500;

    // Adjust price based on condition
    switch (device.condition) {
      case "New":
        basePrice *= 1.0; // No reduction for new condition
        break;
      case "Like New":
        basePrice *= 0.9; // 10% reduction
        break;
      case "Good":
        basePrice *= 0.8; // 20% reduction
        break;
      case "Fair":
        basePrice *= 0.7; // 30% reduction
        break;
      case "Poor":
        basePrice *= 0.5; // 50% reduction
        break;
      default:
        basePrice *= 1.0;
    }

    // Adjust price based on defects
    if (device.defects.screenCrack) basePrice -= 50;
    if (device.defects.batteryIssue) basePrice -= 40;
    if (device.defects.buttonsMalfunction) basePrice -= 30;
    if (device.defects.speakerIssue) basePrice -= 20;
    if (device.defects.cameraDamage) basePrice -= 60;

    console.log("Estimated Price2:", basePrice);

    // Adjust price based on storage
    switch (device.storage) {
      case "64GB":
        basePrice *= 1.0; // No change
        break;
      case "128GB":
        basePrice *= 1.1; // 10% increase
        break;
      case "256GB":
        basePrice *= 1.2; // 20% increase
        break;
      case "512GB":
        basePrice *= 1.3; // 30% increase
        break;
      case "1TB":
        basePrice *= 1.4; // 40% increase
        break;
      default:
        basePrice *= 1.0;
    }

    setEstimatedPrice(Math.floor(basePrice));
    // Log the final calculated price
    console.log("Estimated Price:", basePrice);
  };

  return (
    <Box bg="white" borderRadius="lg" p={8}>
      <Text fontSize="3xl" fontWeight="semibold" mb={6}>
        Device Information
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Device Type Selection */}
        <FormControl isInvalid={!!errors.deviceType}>
          <FormLabel fontSize={("lg", "sm")} mb={1} color="gray.800">
            Device Type
          </FormLabel>
          <Select
            placeholder="Select device type"
            value={deviceType}
            onChange={(e) => {
              setDeviceType(e.target.value);
              setBrand("");
              setErrors((prev) => ({ ...prev, deviceType: null }));
            }}
            borderColor="gray.500"
          >
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="tablet">Tablet</option>
          </Select>
          {errors.deviceType && (
            <Text color="red.500">{errors.deviceType}</Text>
          )}
        </FormControl>

        {/* Brand Selection */}
        <FormControl isInvalid={!!errors.brand}>
          <FormLabel fontSize={("lg", "sm")} mb={1} color="gray.800">
            Brand
          </FormLabel>
          <Select
            placeholder="Select brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setErrors((prev) => ({ ...prev, brand: null })); // Clear error
            }}
            isDisabled={!deviceType}
            borderColor="gray.500"
          >
            {deviceType &&
              brands[deviceType].map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
          </Select>
          {errors.brand && <Text color="red.500">{errors.brand}</Text>}
        </FormControl>

        {/* Model Input */}
        <FormControl isInvalid={!!errors.model}>
          <FormLabel fontSize={("lg", "sm")} mb={1} color="gray.800">
            Model
          </FormLabel>
          <Input
            type="text"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              setErrors((prev) => ({ ...prev, model: null })); // Clear error
            }}
            borderColor="gray.500"
            placeholder="e.g., iPhone 13 Pro, Galaxy S21"
          />
          {errors.model && <Text color="red.500">{errors.model}</Text>}
        </FormControl>

        {/* Year of Purchase */}
        <FormControl isInvalid={!!errors.yearOfPurchase}>
          <FormLabel fontSize={("lg", "sm")} mb={1} color="gray.800">
            Year of Purchase
          </FormLabel>
          <Input
            type="number"
            value={yearOfPurchase}
            onChange={(e) => {
              setYearOfPurchase(e.target.value);
              setErrors((prev) => ({ ...prev, yearOfPurchase: null })); // Clear error
            }}
            placeholder="e.g., 2022"
            borderColor="gray.500"
          />
          {errors.yearOfPurchase && (
            <Text color="red.500">{errors.yearOfPurchase}</Text>
          )}
        </FormControl>

        {/* Serial Number / IMEI */}
        <FormControl isInvalid={!!errors.imei}>
          <FormLabel fontSize={("lg", "sm")} mb={1} color="gray.800">
            {deviceType === "mobile" ? "IMEI" : "Serial Number"}
          </FormLabel>
          <Input
            type="text"
            value={deviceType === "mobile" ? imei : ""}
            onChange={(e) => {
              setImei(e.target.value);
              setErrors((prev) => ({ ...prev, imei: null })); // Clear error
            }}
            placeholder={
              deviceType === "mobile" ? "Enter IMEI" : "Enter device identifier"
            }
            borderColor="gray.500"
          />
          {errors.imei && <Text color="red.500">{errors.imei}</Text>}
        </FormControl>

        {/* Condition */}
        <FormControl isInvalid={!!errors.condition}>
          <FormLabel fontSize={("lg", "sm")} mb={1} color="gray.800">
            Condition
          </FormLabel>
          <Select
            placeholder="Select condition"
            value={condition}
            onChange={(e) => {
              setCondition(e.target.value);
              setErrors((prev) => ({ ...prev, condition: null })); // Clear error
            }}
            borderColor="gray.500"
          >
            {conditionOptions.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </Select>
          {errors.condition && <Text color="red.500">{errors.condition}</Text>}
        </FormControl>

        {/* Storage Capacity */}
        <FormControl isInvalid={!!errors.storage}>
          <FormLabel fontSize={("lg", "sm")} mb={1} color="gray.800">
            Storage Capacity
          </FormLabel>
          <Select
            placeholder="Select storage"
            borderColor="gray.500"
            value={storage}
            onChange={(e) => {
              setStorage(e.target.value);
              setErrors((prev) => ({ ...prev, condition: null }));
            }}
          >
            {storageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          {errors.storage && <Text color="red.500">{errors.storage}</Text>}
        </FormControl>

        {/* Defects Section */}
        <Box gridColumn="span 2">
          <FormLabel fontSize={("lg", "sm")} mb={2} color="gray.800">
            Defects
          </FormLabel>
          <Flex flexDirection="column" gap={2}>
            {Object.entries(defects).map(([key, value]) => (
              <Checkbox
                key={key}
                isChecked={value}
                onChange={() =>
                  setDefects((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                colorScheme="indigo"
                color="gray.800"
              >
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Checkbox>
            ))}
          </Flex>
        </Box>

        {/* Image Upload Section */}
        <Box gridColumn="span 2">
          <FormLabel fontSize={("lg", "sm")} mb={1} color="gray.800">
            Device Images (Max 3)
          </FormLabel>
          <Flex
            justifyContent="center"
            px={6}
            pt={5}
            pb={6}
            border="2px dashed"
            borderColor="gray.400"
            borderRadius="lg"
          >
            <Flex direction="column" alignItems="center" textAlign="center">
              <IoCameraOutline
                className={`mx-auto h-12 w-12 ${
                  errors.images ? "text-red-500" : "text-gray-40"
                }`}
              />
              <Flex fontSize={("lg", "sm")} color="gray.600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload images</span>
                  <Input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    display="none"
                  />
                </label>
                <Text pl={1}>or drag and drop</Text>
              </Flex>
              <Text fontSize="sm" color="gray.500">
                PNG, JPG, up to 10MB
              </Text>
            </Flex>
          </Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={2}>
            {images.map((image, index) => (
              <Box key={index} position="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload preview ${index + 1}`}
                  className="w-full h-60 object-cover rounded-lg border"
                />
                <Button
                  onClick={() => removeImage(index)}
                  position="absolute"
                  top={1}
                  right={1}
                  bg="white"
                  p={1}
                  borderRadius="full"
                  boxShadow="md"
                  _hover={{ bg: "gray.200" }}
                >
                  <RxCross2 className="h-4 w-4 text-red-600" />
                </Button>
              </Box>
            ))}
          </Grid>
        </Box>
        <Text fontWeight="medium" className="text-lg text-gray-800">
          Select Service
        </Text>

        <Flex mt={2} className="col-span-2 flex gap-x-20">
          <Box
            as="button"
            onClick={() => setServiceType("pickup")}
            p={4}
            borderWidth={1}
            borderColor={serviceType === "pickup" ? "blue.500" : "gray.300"}
            borderRadius="md"
            bg={serviceType === "pickup" ? "white" : "gray.50"}
            boxShadow={serviceType === "pickup" ? "md" : "none"}
            transition="background 0.2s, box-shadow 0.2s"
            _hover={{ boxShadow: "md" }}
            flexDirection="column"
            alignItems="center"
          >
            <Icon as={FaTruck} boxSize={6} mb={2} /> {/* Pickup icon */}
            <Text fontWeight="medium">Pickup Service</Text>
          </Box>

          <Box
            as="button"
            onClick={() => setServiceType("parcel")}
            p={4}
            borderWidth={1}
            borderColor={serviceType === "parcel" ? "blue.500" : "gray.300"}
            borderRadius="md"
            bg={serviceType === "parcel" ? "white" : "gray.50"}
            boxShadow={serviceType === "parcel" ? "md" : "none"}
            transition="background 0.2s, box-shadow 0.2s"
            _hover={{ boxShadow: "md" }}
            flexDirection="column"
            alignItems="center"
          >
            <Icon as={FaEnvelope} boxSize={6} mb={2} /> {/* Parcel icon */}
            <Text fontWeight="medium">Parcel Service</Text>
          </Box>
        </Flex>

        {serviceType === "parcel" && (
          <Box mt={4} className="col-span-2">
            <Text fontSize="md" fontWeight="semibold">
              Mailing Instructions:
            </Text>
            <Textarea
              value={parcelInstructions}
              onChange={handleInstructionsChange}
              placeholder="Enter any additional instructions here..."
              mt={2}
              size="sm"
              rounded="sm"
            />
          </Box>
        )}

        <div className=" col-span-2 flex justify-center">
          <Button
            colorScheme="indigo"
            size="lg"
            mt={4}
            width="full"
            rounded="xl"
            onClick={handleCalculatePrice}
          >
            {estimatedprice ? estimatedprice : " Calculate Price"}
          </Button>
        </div>

        <div className=" col-span-2 flex md:gap-x-10 md:flex-row flex-col">
          <Button
            colorScheme="red"
            size="lg"
            width="full"
            mt={4}
            rounded="xl"
            onClick={handleReset}
          >
            Reject
          </Button>
          <Button
            colorScheme="indigo"
            size="lg"
            width="full"
            mt={4}
            rounded="xl"
            onClick={handleSubmit}
            isLoading={loading} // Show loading spinner
            loadingText="Submitting"
          >
            Submit
          </Button>
        </div>
      </Grid>
    </Box>
  );
}
