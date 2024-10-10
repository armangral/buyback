import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Laptop, DollarSign, Clock, ThumbsUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "src/services/supabase";

// Dummy data remains the same
const monthlyDeviceSales = [
  { month: "Jan", sales: 65 },
  { month: "Feb", sales: 59 },
  { month: "Mar", sales: 80 },
  { month: "Apr", sales: 81 },
  { month: "May", sales: 56 },
  { month: "Jun", sales: 55 },
];

const requestStatus = [
  { name: "Pending", value: 30 },
  { name: "Verified", value: 45 },
  { name: "Rejected", value: 25 },
];

const deviceConditions = [
  { condition: "New", count: 200 },
  { condition: "Used", count: 300 },
  { condition: "Damaged", count: 100 },
];

const revenue = [
  { month: "Jan", amount: 4000 },
  { month: "Feb", amount: 3000 },
  { month: "Mar", amount: 5000 },
  { month: "Apr", amount: 4500 },
  { month: "May", amount: 6000 },
  { month: "Jun", amount: 5500 },
];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Box
    p={6}
    bg="white"
    shadow="sm"
    rounded="lg"
    display="flex"
    alignItems="center"
    width={"80,60"}
  >
    <Box bg={color} p={3} rounded="full">
      <Icon size={24} color="white" />
    </Box>
    <Box ml={4}>
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>
      <Heading as="h3" size="lg">
        {value}
      </Heading>
    </Box>
  </Box>
);

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [productscount, setProductsCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [unapprovedCount, setUnapprovedCount] = useState(0); // State to store the count

  // Fetch products that are not approved
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("approved_product", false); // Fetch products where approved_product is false

      if (error) {
        setError(error.message);
      } else {
        setProducts(data);
        setProductsCount(data.length);
        const unapprovedProducts = products?.filter(
          (product) => !product.approved_product
        );
        setUnapprovedCount(unapprovedProducts?.length);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

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
  return (
    <Box p={6} className="bg-gray-100" minH="100vh">
      <Heading mb={8} as="h1" size="xl">
        Analytics Dashboard
      </Heading>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatCard
          title="Total Devices"
          value={productscount}
          icon={Laptop}
          color="blue.500"
        />
        <StatCard
          title="Total Users"
          value={users?.length}
          icon={Users}
          color="green.500"
        />
        <StatCard
          title="Pending Requests"
          value={unapprovedCount}
          icon={Clock}
          color="yellow.500"
        />
      </div>

      {/* Charts */}
      <Flex wrap="wrap" gap={6}>
        {/* Monthly Device Sales */}
        <Box bg="white" p={6} shadow="sm" rounded="lg" w="full" lg="49%">
          <Heading as="h2" size="md" mb={4}>
            Monthly Device Sales
          </Heading>
          <Box h="320px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyDeviceSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Request Status */}
        <Box bg="white" p={6} shadow="sm" rounded="lg" w="full" lg="49%">
          <Heading as="h2" size="md" mb={4}>
            Request Status
          </Heading>
          <Box h="320px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requestStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Device Conditions */}
        <Box bg="white" p={6} shadow="sm" rounded="lg" w="full" lg="49%">
          <Heading as="h2" size="md" mb={4}>
            Device Conditions
          </Heading>
          <Box h="320px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceConditions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="condition" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Revenue Trends */}
        <Box bg="white" p={6} shadow="sm" rounded="lg" w="full" lg="49%">
          <Heading as="h2" size="md" mb={4}>
            Revenue Trends
          </Heading>
          <Box h="320px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
