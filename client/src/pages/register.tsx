import React from 'react'
import {Form, Formik} from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import Container from '../components/Container';

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Container>
      <Formik
        initialValues={{username: '', password:''}}
        onSubmit={(values) => console.log(values)}
      >
        {(values, handleChange) => (
          <Form>
            <FormControl>
              <FormLabel htmlFor='username'>Username</FormLabel>
                <Input 
                  value={values.username} 
                  id='username' 
                  placeholder='Username' 
                  onChange={handleChange}
                />            
                {/* <FormErrorMessage>{Form.errors.username}</FormErrorMessage> */}
            </FormControl>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
export default Register