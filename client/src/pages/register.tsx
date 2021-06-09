import React from 'react'
import {Form, Formik} from 'formik';
import Container from '../components/Container';
import InputField from '../components/InputField';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useMutation } from 'urql';

interface registerProps {

}
const REGISTER_MUT = `
  mutation Register($username:String!, $password:String!){
    register(userInputs: {username: $username, password: $password}){
      errors {
        field
        msg
      }
      user {
        id
        username
      }
    }
  }
`

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT)
  return (
    <Container responsv='small'>
      <Formik
        initialValues={{username: '', password:''}}
        onSubmit={async values => {
          const res = await register(values)
        }}
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