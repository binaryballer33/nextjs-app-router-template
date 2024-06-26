import { Box, Button, Input } from '@mui/material'
import React from 'react'
import { login } from 'src/actions/auth/login'
import { register } from 'src/actions/auth/register'
import { signOut } from 'src/actions/auth/sign-out'

export default function LoginPage() {
  return (
    <Box display={'flex'} p={2} gap={2} justifyContent={'center'}>
      <form>
        <Box display={'flex'} gap={2}>
          <label htmlFor="email">Email:</label>
          <Input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <Input id="password" name="password" type="password" required />
          <button formAction={login}>Log in</button>
          <button formAction={register}>Sign up</button>
          <button formAction={signOut}>Sign out</button>
        </Box>
      </form>
    </Box>
  )
}
