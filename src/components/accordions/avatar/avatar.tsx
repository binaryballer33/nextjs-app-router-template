"use client"

import type { SyntheticEvent } from "react"

import { useState } from "react"

import { useTranslation } from "react-i18next"

import DownloadIcon from "@mui/icons-material/Download"
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone"

import {
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material"

import { AccordionAlternate } from "src/components/base/styles/accordion"

type AccordionItem = {
    avatarSrc: string
    email: string
    jobTitle: string
    name: string
    resumeFile: string
    salary: string
}

function AlternateTabs() {
    const { t } = useTranslation()
    const [expandedAccordion, setExpandedAccordion] = useState<null | number>(null)

    const accordionData: AccordionItem[] = [
        {
            avatarSrc: "/avatars/4.png",
            email: "binaryballer33@gmail.com",
            jobTitle: "Software Engineer",
            name: "Shaquille Mandy",
            resumeFile: "resume_full_stack_developer.pdf",
            salary: "$250,000",
        },
        {
            avatarSrc: "/avatars/5.png",
            email: "megan_nichole@gmail.com",
            jobTitle: "Pediatrician",
            name: "Megan Nicole",
            resumeFile: "resume_pediatrician.pdf",
            salary: "$333,333",
        },
    ]

    const handleAccordionToggle = (index: number) => (_event: SyntheticEvent, isExpanded: boolean) => {
        setExpandedAccordion(isExpanded ? index : null)
    }

    return (
        <>
            {accordionData.map((item, index) => (
                <AccordionAlternate
                    expanded={expandedAccordion === index}
                    key={item.email}
                    onChange={handleAccordionToggle(index)}
                >
                    <AccordionSummary
                        aria-controls={`panel${index + 1}a-content`}
                        expandIcon={<KeyboardArrowRightTwoToneIcon />}
                        id={`panel${index + 1}a-header`}
                    >
                        <Box alignItems="center" display="flex">
                            <Avatar
                                alt="..."
                                src={`/avatars/${index + 3}.png`}
                                sx={{ height: 52, width: 52 }}
                                variant="rounded"
                            />
                            <Box ml={1}>
                                <Typography component="div" variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography color="text.secondary" noWrap variant="subtitle2">
                                    {t(item.jobTitle)}
                                </Typography>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="row" mb={2} spacing={1}>
                            <Button color="primary" size="small" variant="outlined">
                                {t("View profile")}
                            </Button>
                            <Button color="secondary" size="small" variant="outlined">
                                {t("Edit details")}
                            </Button>
                        </Stack>
                        <Card elevation={0} variant="outlined">
                            <ListItem>
                                <ListItemText
                                    primary={t("Email address")}
                                    primaryTypographyProps={{ variant: "h6" }}
                                    secondary={item.email}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText
                                    primary={t("Salary expectation")}
                                    primaryTypographyProps={{ variant: "h6" }}
                                    secondary={item.salary}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <IconButton>
                                        <DownloadIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText primary={t(item.resumeFile)} primaryTypographyProps={{ noWrap: true }} />
                            </ListItem>
                        </Card>
                    </AccordionDetails>
                </AccordionAlternate>
            ))}
        </>
    )
}

export default AlternateTabs
