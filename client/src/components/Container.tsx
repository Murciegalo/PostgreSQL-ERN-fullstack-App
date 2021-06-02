import { Box } from '@chakra-ui/layout'
import React from 'react'

interface ContainerProps {

}

const Container: React.FC<ContainerProps> = ({children}) => {
    return <Box
      mt={8}
      mx='auto'
      maxW='800px'
      w='100%'
    >
      {children}
    </Box>
}
export default Container