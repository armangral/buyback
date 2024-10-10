import React from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';

const Checkbox = ({ label, isChecked, onChange }) => {
  return (
    <ChakraCheckbox
      isChecked={isChecked}
      onChange={onChange}
      colorScheme="brand"
      className="text-navy-700 dark:text-white"
    >
      {label}
    </ChakraCheckbox>
  );
};

export default Checkbox;
