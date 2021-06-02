import React from 'react'
import {Form, Formik} from 'formik';
import Container from '../components/Container';
import InputField from '../components/InputField';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Container responsv='small'>
      <Formik
        initialValues={{username: '', password:''}}
        onSubmit={(values) => console.log(values)}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField
              name='Username'
              label='Username'
              placeholder='Username'
            />
            <Box mt={4}>
              <InputField
                name='Password'
                label='Password'
                placeholder='Password'
                type='Password'
              />
            </Box>
            <Button
              mt={4} 
              type='submit'
              colorScheme='teal'
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
export default Register