import React from 'react';
import { Box } from '@chakra-ui/react';

const Card = ({ extra, children }) => {
  return (
    <Box
      className={`bg-white dark:bg-navy-700 shadow-md rounded-lg p-6 ${extra}`}
      boxShadow="lg"
      borderRadius="lg"
    >
      {children}
    </Box>
  );
};

export default Card;
