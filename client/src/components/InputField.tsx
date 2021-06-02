import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { FormErrorMessage, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  placeholder?: string
  name: string,
  type?: string
}

const InputField: React.FC<InputFieldProps> = ({size:_ ,...props}) => {
  const [ field, {error}] = useField(props)
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <Input
          {...field}
          {...props}  
          id={field.name}  
        />            
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
}
export default InputField