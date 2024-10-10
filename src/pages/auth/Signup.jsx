import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import SignupForm from "src/features/auth/SignupForm";

function SignUpPage() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" position="relative">
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="50%"
        background="linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)"
      ></Box>

      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        width={["90%", "80%", "60%", "40%"]}
        mt="5%"
        zIndex={10}
        position="relative"
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" color="indigo.600" textAlign="center">
            Sign Up
          </Heading>
          <Text textAlign="center" color="gray.600">
            Create a new account
          </Text>
          <SignupForm />
        </VStack>
      </Box>
    </Box>
  );
}

export default SignUpPage;
