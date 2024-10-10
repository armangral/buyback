import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

const InputField = ({ variant, label, extra, id, type, value, onChange, placeholder }) => {
  return (
    <FormControl className={`${extra}`} variant={variant}>
      <FormLabel htmlFor={id} className="text-gray-600 dark:text-white">
        {label}
      </FormLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 dark:bg-navy-600 dark:text-white focus:ring-brand-500 focus:border-brand-500"
      />
    </FormControl>
  );
};

export default InputField;
