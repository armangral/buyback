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

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending: isLoading } = useSignup();
  const [errors, setErrors] = useState({});

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //regex for 6 lenght passwrod
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleSignUp = () => {
    const validationErrors = {};

    // Validate email field
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    // Validate password field
    if (!password) validationErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      validationErrors.password =
        "Password must be at least 6 characters long and contain a letter and a number";
    

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
