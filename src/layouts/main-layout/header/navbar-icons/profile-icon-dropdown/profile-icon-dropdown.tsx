import { Avatar, IconButton, Stack, useTheme } from '@mui/material'
import { usePopover } from 'src/hooks/use-popover'
import { ProfileIconDropdown } from './profile-icon-dropdown-content'

const Profile = () => {
  const popover = usePopover<HTMLButtonElement>()
  const theme = useTheme()

  return (
    <Stack
      justifyContent="space-around"
      spacing={{ xs: 2, sm: 3 }}
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
    >
      <IconButton
        id="profile-button"
        sx={{
          p: 0,
          '&:hover': {
            boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
          },
        }}
        color="primary"
        aria-controls={popover.open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={popover.open ? 'true' : undefined}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
      >
        <Avatar
          alt={'Shaquille Mandy'}
          src={''}
          sx={{
            borderRadius: 'inherit',
            height: 36,
            width: 36,
          }}
        />
      </IconButton>
      <ProfileIconDropdown
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </Stack>
  )
}

export default Profile
