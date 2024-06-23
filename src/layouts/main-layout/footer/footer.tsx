import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Box, Button, Divider, Grid, IconButton, Link, TextField, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { neutral } from 'src/theme/theme'

export default function Footer() {
  const theme = useTheme()

  const navigation = {
    solutions: [
      { name: 'Marketing', href: '#' },
      { name: 'Analytics', href: '#' },
      { name: 'Commerce', href: '#' },
      { name: 'Insights', href: '#' },
    ],
    support: [
      { name: 'Pricing', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'API Status', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Jobs', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' },
    ],
    legal: [
      { name: 'Claim', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
    ],
    social: [
      { name: 'Facebook', href: '#', icon: FacebookIcon },
      { name: 'Instagram', href: '#', icon: InstagramIcon },
      { name: 'Twitter', href: '#', icon: TwitterIcon },
      { name: 'GitHub', href: '#', icon: GitHubIcon },
      { name: 'YouTube', href: '#', icon: YouTubeIcon },
    ],
  }

  return (
    <footer>
      <Box sx={{ pt: 8, pb: 6 }}>
        <Box width={'95%'} m={'auto'}>
          <Divider sx={{ mb: 6, border: '1' }} />
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: 10, pt: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Subscribe to our newsletter</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                The latest news, articles, and resources, sent to your inbox weekly.
              </Typography>
              <Box component="form" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                  variant="filled"
                  placeholder="Enter your email"
                  type="email"
                  required
                  sx={{
                    mr: 1,
                    flexGrow: 1,
                    '.MuiInputBase-input': {
                      paddingTop: 1,
                    },
                  }}
                />
                <Button type="submit" variant="contained" sx={{ flexShrink: 0 }}>
                  Subscribe
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Box>
                {navigation.social.map((item) => (
                  <IconButton
                    key={item.name}
                    href={item.href}
                    sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
                  >
                    <item.icon />
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} sm={3}>
              <Typography variant="h5" mb={1}>
                MANDYTEC LLC
              </Typography>
              <Image src="/placeholders/logo/react-logo.svg" alt="Company name" width={28} height={28} />
            </Grid>
            <Grid item container xs={12} sm={9} spacing={4}>
              <Grid item xs={6} sm={3} sx={{ paddingLeft: `${theme.spacing(7)} !important` }}>
                <Typography variant="subtitle1" gutterBottom>
                  Solutions
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        variant="body2"
                        color={theme.palette.mode === 'dark' ? neutral[400] : neutral[900]}
                        underline="hover"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={6} sm={3} sx={{ paddingLeft: `${theme.spacing(7)} !important` }}>
                <Typography variant="body2" gutterBottom>
                  Support
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        variant="body2"
                        color={theme.palette.mode === 'dark' ? neutral[400] : neutral[900]}
                        underline="hover"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={6} sm={3} sx={{ paddingLeft: `${theme.spacing(7)} !important` }}>
                <Typography variant="subtitle1" gutterBottom>
                  Company
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        variant="body2"
                        color={theme.palette.mode === 'dark' ? neutral[400] : neutral[900]}
                        underline="hover"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={6} sm={3} sx={{ paddingLeft: `${theme.spacing(7)} !important` }}>
                <Typography variant="subtitle1" gutterBottom>
                  Legal
                </Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        variant="body2"
                        color={theme.palette.mode === 'dark' ? neutral[400] : neutral[900]}
                        underline="hover"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="body2" align="center" sx={{ mt: 4 }}>
            &copy; 2023 MANDYTEC LLC, Inc. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </footer>
  )
}
