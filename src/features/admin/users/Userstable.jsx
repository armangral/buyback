import React, { useEffect, useState } from "react";
import { supabase } from "src/services/supabase";
import {
  Box,
  Flex,
  Text,
  Spinner,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Thead,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Minimalist icons for verified/not verified

const Userstable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      // Fetch users data
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("email, id");

      if (usersError) throw usersError;

      // Since we don't have name and cnic yet, we'll just display email and uid for now
      const combinedData = usersData.map((user) => ({
        email: user.email,
        uid: user.id.slice(0, 4), // Show first 4 characters of the UID
        name: "N/A",
        cnic: "N/A",
        isVerified: user.email && user.id ? "No" : "N/A", // Default verification logic
      }));

      setUsers(combinedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" mt="5">
        <Spinner size="lg" color="gray.500" />
        <Text mt="3" color="gray.600">
          Loading users...
        </Text>
      </Flex>
    );
  }

  return (
    <Box bg="gray.50" borderRadius="xl" p={8} boxShadow="sm" mt={8}>
      <VStack spacing={4} align="start">
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
          User Information
        </Text>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th color="gray.600" fontSize="sm">
                Email
              </Th>
              <Th color="gray.600" fontSize="sm">
                UID
              </Th>
              <Th color="gray.600" fontSize="sm">
                Name
              </Th>
              <Th color="gray.600" fontSize="sm">
                CNIC
              </Th>
              <Th color="gray.600" fontSize="sm">
                Verified
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={index}>
                <Td fontSize="sm" color="gray.700">
                  {user.email}
                </Td>
                <Td fontSize="sm" color="gray.700">
                  {user.uid}
                </Td>
                <Td fontSize="sm" color="gray.700">
                  {user.name}
                </Td>
                <Td fontSize="sm" color="gray.700">
                  {user.cnic}
                </Td>
                <Td>
                  {user.isVerified === "Yes" ? (
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                  ) : (
                    <Icon as={FaTimesCircle} color="red.500" boxSize={4} />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default Userstable;
