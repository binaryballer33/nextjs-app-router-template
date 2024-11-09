/* eslint-disable jsx-a11y/label-has-associated-control */
import type { Theme } from "@mui/material"
import type { User } from "src/mocks/user-mocks"

import { useTranslation } from "react-i18next"

import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone"
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone"
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone"

import {
    Avatar,
    Box,
    Button,
    Card,
    CardMedia,
    Chip,
    Divider,
    IconButton,
    Stack,
    styled,
    Typography,
    useMediaQuery,
} from "@mui/material"

import ButtonIcon from "src/components/base/styles/button-icon"
import { VisuallyHiddenInputNative } from "src/components/base/styles/visually-hidden"

const AvatarWrapper = styled(Card)(
    ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`,
)

const ButtonUploadWrapper = styled(Box)(
    ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;

      &:hover {
        background: ${theme.palette.primary.dark};
      }
    }
`,
)

const CardCover = styled(Card)(
    ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`,
)

const CardCoverAction = styled(Box)(
    ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`,
)

type ProfileCoverProps = {
    user: User
}

export default function ProfileCover({ user }: ProfileCoverProps) {
    const { t } = useTranslation()
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"))

    return (
        <>
            <Box alignItems="center" display="flex" mb={{ sm: 3, xs: 2 }}>
                <Box>
                    <Typography component="h3" sx={{ pb: 0.5 }} variant="h3">
                        {`${user.name}'s ${t("profile")}`}
                    </Typography>
                    <Typography variant="subtitle1">
                        {t("This is a profile page. Easy to modify, always blazing fast")}
                    </Typography>
                </Box>
            </Box>
            <CardCover>
                <CardMedia image={user.coverImg} />
                <CardCoverAction sx={{ position: "absolute", right: { sm: 10, xs: 12 }, top: 10 }}>
                    <VisuallyHiddenInputNative accept="image/*" id="change-cover" multiple type="file" />
                    <label htmlFor="change-cover">
                        <Button color="primary" component="span" startIcon={<UploadTwoToneIcon />} variant="contained">
                            {t("Change cover")}
                        </Button>
                    </label>
                </CardCoverAction>
            </CardCover>
            <AvatarWrapper>
                <Avatar alt={user.name} src={user.avatar} variant="rounded" />
                <ButtonUploadWrapper>
                    <VisuallyHiddenInputNative
                        accept="image/*"
                        id="icon-button-file"
                        name="icon-button-file"
                        type="file"
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" component="span">
                            <UploadTwoToneIcon />
                        </IconButton>
                    </label>
                </ButtonUploadWrapper>
            </AvatarWrapper>
            <Box pl={2} pt={2}>
                <Typography variant="h4">
                    {user.name}
                    <Typography color="text.secondary" component="span" fontWeight={500} sx={{ pl: 0.5 }} variant="h6">
                        ({user.jobtitle})
                    </Typography>
                </Typography>
                <Typography color="text.secondary" variant="subtitle1">
                    {user.description}
                </Typography>
                <Stack
                    divider={<Divider flexItem orientation={smUp ? "vertical" : "horizontal"} />}
                    flexDirection={{ sm: "row", xs: "column" }}
                    gap={{ sm: 1.5, xs: 1 }}
                    mt={2}
                >
                    <Chip color="info" label={user.location} variant="outlined" />
                    <Chip
                        color="info"
                        label={
                            <>
                                {user.followers} {t("followers")}
                            </>
                        }
                        variant="outlined"
                    />
                    <Button endIcon={<ArrowForwardTwoToneIcon />} size="small">
                        {t("See all")}
                        {` ${user.followers} `}
                        {t("connections")}
                    </Button>
                </Stack>
                <Divider sx={{ ml: -2.5, my: 2 }} />
                <Box alignItems="center" display="flex" justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                        <Button size="small" variant="contained">
                            {t("Follow")}
                        </Button>
                        <Button size="small" variant="outlined">
                            {t("View website")}
                        </Button>
                    </Stack>
                    <ButtonIcon color="primary" size="small">
                        <MoreHorizTwoToneIcon />
                    </ButtonIcon>
                </Box>
            </Box>
        </>
    )
}
