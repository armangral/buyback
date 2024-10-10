import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import SigninForm from "src/features/auth/SigninForm";

function SigninPage() {
  return (
    <Box className="min-h-screen flex flex-col items-center justify-center relative">
      <Box
        className="w-full h-1/2 absolute top-0 left-0"
        style={{
          background: "linear-gradient(135deg, #6B73FF 0%, #4169E1 70%)",
        }}
      ></Box>

      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        width={["90%", "80%", "60%", "40%"]}
        mt="5%"
        className="z-10 relative"
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" color="indigo.600" textAlign="center">
            Sign In
          </Heading>
          <Text textAlign="center" color="gray.600">
            Login to your account
          </Text>
          <SigninForm />
        </VStack>
      </Box>
    </Box>
  );
}

export default SigninPage;