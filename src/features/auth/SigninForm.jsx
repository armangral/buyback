import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useSignin } from "./useSignin";
import PasswordInput from "src/ui/PasswordInput";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, isPending: isLoading } = useSignin();
  const [errors, setErrors] = useState({});

  const handleSignIn = () => {
    const validationErrors = {};

    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const data = {
      email,
      password,
    };

    signin(data, {
      onSuccess: () => {
        setEmail("");
        setPassword("");
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
        onClick={handleSignIn}
      >
        {isLoading ? <Spinner /> : "Sign In"}
      </Button>
    </>
  );
};

export default SigninForm;
