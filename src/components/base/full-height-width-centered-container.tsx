import Box, { BoxProps } from '@mui/material/Box'
import React from 'react'

type Props = {
  children: React.ReactNode
} & BoxProps

const FullScreenCenteredContainer = ({ children, ...rest }: Props): JSX.Element => (
  <Box
    display={'flex'}
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap={2}
    minWidth={'100dvw'}
    minHeight={'100dvh'}
    {...rest}
  >
    {children}
  </Box>
)

export default FullScreenCenteredContainer
