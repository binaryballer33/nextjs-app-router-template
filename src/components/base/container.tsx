import Box from '@mui/material/Box'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Container = ({ children, ...rest }: Props): JSX.Element => (
  <Box
    maxWidth={{ sm: 720, md: 1236, lg: 1500 }}
    width={1}
    margin={'0 auto'}
    paddingX={2}
    paddingY={{ xs: 4, sm: 6, md: 8 }}
    {...rest}
  >
    {children}
  </Box>
)

export default Container
