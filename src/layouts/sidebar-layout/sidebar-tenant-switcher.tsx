import type { Theme } from "@mui/material"
import type { MouseEvent } from "react"

import { useState } from "react"

import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone"
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone"

import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material"

type Tenant = {
    description: string
    id: number
    logo: string
    name: string
}

type Props = {
    currentTenant: Tenant
    isHovered: boolean
    onSwitch: (tenant: Tenant) => void
    sidebarCollapsed: boolean
    tenants: Tenant[]
}

function TenantSwitcher(props: Props) {
    const { currentTenant, isHovered, onSwitch, sidebarCollapsed, tenants } = props
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"))
    const theme = useTheme()

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    const handleTenantSelect = (tenant: Tenant) => {
        onSwitch(tenant)
        handleClose()
    }

    const tenantDescription = (
        <Box ml={1} overflow="hidden">
            <Typography
                fontWeight={600}
                lineHeight={1.2}
                sx={{
                    color: (colorTheme) => colorTheme.palette.text.secondary,
                    pb: 0.2,
                }}
                variant="subtitle2"
            >
                {currentTenant.name}
            </Typography>
            <Typography
                lineHeight={1.2}
                noWrap
                sx={{
                    color: (colorTheme) => colorTheme.palette.text.secondary,
                }}
                variant="body1"
            >
                {currentTenant.description}
            </Typography>
        </Box>
    )

    return (
        <Box pr={2} py={1.5}>
            <Badge
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}
                color="secondary"
                sx={{
                    ".MuiBadge-badge": {
                        animation: "pulse 1s infinite",
                        transition: (transitionTheme) => transitionTheme.transitions.create(["all"]),
                    },
                    display: "flex",
                }}
                variant="dot"
            >
                <Button
                    color="primary"
                    endIcon={
                        mdUp && sidebarCollapsed ? (
                            isHovered && <KeyboardArrowDownTwoToneIcon />
                        ) : (
                            <KeyboardArrowDownTwoToneIcon />
                        )
                    }
                    fullWidth
                    onClick={handleClick}
                    sx={{
                        "&:hover": {
                            background: theme.palette.background.paper,
                            borderColor: theme.palette.background.paper,
                            color: "primary.dark",
                        },
                        background: theme.palette.background.paper,
                        borderColor: theme.palette.background.paper,
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "primary",
                        minWidth: 40,
                        px: 1.2,
                        textAlign: "left",
                    }}
                >
                    <Avatar alt={currentTenant.name} src={currentTenant.logo} variant="rounded" />
                    {mdUp && sidebarCollapsed ? isHovered && tenantDescription : tenantDescription}
                </Button>
            </Badge>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                onClose={handleClose}
                open={Boolean(anchorEl)}
                slotProps={{
                    paper: {
                        sx: {
                            ".MuiList-root": {
                                p: 0,
                            },
                            width: 380,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
            >
                <Box
                    p={2}
                    sx={{
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Typography variant="h6">Select tenant</Typography>
                </Box>
                <Stack divider={<Divider />} p={1}>
                    {tenants.map((tenant) => (
                        <MenuItem
                            key={tenant.id}
                            onClick={() => handleTenantSelect(tenant)}
                            selected={currentTenant.id === tenant.id}
                            sx={{
                                borderRadius: (borderRadiusTheme) => `${borderRadiusTheme.shape.borderRadius}px`,
                                pl: 1,
                            }}
                        >
                            <ListItemIcon sx={{ mr: 1 }}>
                                <Avatar alt={tenant.name} src={tenant.logo} variant="rounded" />
                            </ListItemIcon>

                            <ListItemText
                                primary={tenant.name}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                }}
                                secondary={tenant.description}
                                secondaryTypographyProps={{
                                    noWrap: true,
                                }}
                            />
                            {currentTenant.id === tenant.id && (
                                <Box alignItems="center" display="flex" justifyContent="flex-end" minWidth={38}>
                                    <CheckTwoToneIcon color="primary" />
                                </Box>
                            )}
                        </MenuItem>
                    ))}
                </Stack>
            </Menu>
        </Box>
    )
}

export default TenantSwitcher
