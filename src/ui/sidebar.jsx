/* eslint-disable react/prop-types */
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Collapse,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { FaShop } from "react-icons/fa6";
import { RiArrowDropDownLine, RiLogoutBoxRLine } from "react-icons/ri";

import { BsFillCartDashFill, BsFillCartPlusFill } from "react-icons/bs";

import { NavLink } from "react-router-dom";
// import { useLogout } from "src/features/auth/useLogout";
// import { useUser } from "src/features/auth/useUser";
import { useState } from "react";
import { LuBookKey } from "react-icons/lu";
import { HiOutlineDocumentReport, HiShoppingCart } from "react-icons/hi";
import { PiDevicesFill } from "react-icons/pi";
import { FaUserCog } from "react-icons/fa";
import { useLogout } from "src/features/auth/useLogout";

const AdminLinkItems = [
  {
    name: "Products",
    icon: HiShoppingCart,
    subItems: [
      {
        name: "List Product",
        icon: BsFillCartPlusFill,
        path: "/users/products/create",
      },
      {
        name: "My Products",
        icon: BsFillCartDashFill,
        path: "/users/products/all",
      },
    ],
  },
  {
    name: "MarketPlace",
    icon: FaShop,
    subItems: [
      {
        name: "Explore",
        icon: PiDevicesFill,
        path: "/users/marketplace",
      },
    ],
  },
];

const SidebarContent = ({ onClose, user, ...rest }) => {
  const [openSection, setOpenSection] = useState(null); // Change to a single value

  const toggleSection = (name) => {
    setOpenSection((prev) => (prev === name ? null : name)); // Close if the same section is clicked, else open the new one
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      className="overflow-y-auto"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Buy Back
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {AdminLinkItems.map((link) => (
        <Box key={link.name} mt={4}>
          <Flex
            p="4"
            mx="4"
            my="2"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => toggleSection(link.name)}
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
          >
            <Flex alignItems="center">
              <Icon as={link.icon} mr={2} />
              <Text fontWeight="medium">{link.name}</Text>
            </Flex>
            {link.subItems && (
              <Icon
                as={RiArrowDropDownLine}
                transform={
                  openSection === link.name ? "rotate(180deg)" : "rotate(0deg)"
                }
                transition="transform 0.2s"
              />
            )}
          </Flex>

          {link.subItems && (
            <Collapse in={openSection === link.name}>
              {link.subItems.map((subLink) => (
                <NavItem
                  key={subLink.name}
                  icon={subLink.icon}
                  to={subLink.path}
                  pl={8}
                >
                  {subLink.name}
                </NavItem>
              ))}
            </Collapse>
          )}
        </Box>
      ))}
      <NavItem icon={FaUserCog} to="/users/profile">
        Profile
      </NavItem>
    </Box>
  );
};

const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          mx="4"
          my="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          fontWeight={isActive ? "bold" : "normal"}
          bg={isActive ? "indigo.500" : "transparent"}
          color={isActive ? "white" : "inherit"}
          _hover={{
            bg: "indigo.600",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              color={isActive ? "white" : "inherit"}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </NavLink>
  );
};

const MobileNav = ({ onOpen, user, ...rest }) => {
  const { logout } = useLogout();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://img.icons8.com/ios-filled/50/user-male-circle.png"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.username || "-"}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role === "admin" && user?.is_super_admin
                      ? "Super Admin"
                      : user?.role === "admin" && "Admin"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuDivider />
              <MenuItem>
                <RiLogoutBoxRLine className="mr-2" onClick={() => logout()} />
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const { user } = useUser();

  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        // user={user}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
    </>
  );
};

export default Sidebar;
