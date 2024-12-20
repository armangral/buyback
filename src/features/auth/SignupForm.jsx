import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useSignup } from "./useSignup";
import PasswordInput from "src/ui/PasswordInput";
import { useNavigate } from "react-router-dom";


const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending: isLoading } = useSignup();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = () => {
    const validationErrors = {};

    // Validate email field
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      email,
      password,
    };

    signup(data, {
      onSuccess: () => {
        setEmail("");
        setPassword("");
        setErrors({});
        navigate("/signin");
      },
    });
  };

  return (
    <>
      <FormControl id="email" isInvalid={errors.email}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          focusBorderColor="indigo.400"
          rounded="xl"
          h={["40px", "40px", "50px"]}
          placeholder="abc@example.com"
        />
        {errors.email && (
          <Text color="red.500" fontSize="sm">
            {errors.email}
          </Text>
        )}
      </FormControl>

      <PasswordInput
        value={password}
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        isInvalid={errors.password}
      />
      {errors.password && (
        <Text color="red.500" fontSize="sm">
          {errors.password}
        </Text>
      )}

      <Button
        colorScheme="indigo"
        size="lg"
        mt={4}
        rounded="xl"
        onClick={handleSignUp}
        isDisabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Sign Up"}
      </Button>
    </>
  );
};

export default SignupForm;
