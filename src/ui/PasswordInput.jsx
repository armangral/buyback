/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const PasswordInput = (props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <FormControl id={props.label}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup>
        <InputRightElement
          width="3rem"
          mr={2}
          className="flex md:items-center items-start md:mt-1 mt-0"
        >
          <Button variant="link" onClick={onToggle} colorScheme="indigo">
            {isOpen ? <VscEyeClosed /> : <VscEye />}
          </Button>
        </InputRightElement>
        <Input
          type={isOpen ? "text" : "password"}
          focusBorderColor="indigo.400"
          rounded="xl"
          h={["40px", "40px", "50px"]}
          placeholder="Password"
          borderColor={props.formplace && "gray.400"}
          {...props}
        />
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
