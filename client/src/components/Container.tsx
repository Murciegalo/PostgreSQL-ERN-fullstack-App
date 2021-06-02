import { Box } from '@chakra-ui/layout'
import React from 'react'

interface ContainerProps {
  responsv?: 'small' | 'regular'
}

const Container: React.FC<ContainerProps> = ({children, responsv='regular'}) => {
    return <Box
      mt={8}
      mx='auto'
      maxW={responsv === 'regular' ? '800px' : '400px'}
      w='100%'
    >
      {children}
    </Box>
}
export default Container