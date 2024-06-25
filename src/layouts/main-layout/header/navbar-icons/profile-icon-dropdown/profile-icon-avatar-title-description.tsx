import { Avatar, Badge, Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const user = {
  name: 'Shaquille Mandy',
  role: 'Software Engineer',
}

const ProfileIconDropdownAvatar = () => {
  const { t } = useTranslation()
  return (
    <Box display="flex" alignItems="center">
      <Badge
        color="secondary"
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        badgeContent="12"
        overlap="circular"
      >
        <Avatar
          sx={{
            backgroundColor: 'primary.main',
            color: 'text.primary',
            width: 48,
            height: 48,
          }}
        >
          SM
        </Avatar>
      </Badge>
      <Box mx={1} overflow="hidden">
        <Typography variant="h5" component="div">
          Shaquille Mandy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" noWrap>
          {t(user.role)}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProfileIconDropdownAvatar
