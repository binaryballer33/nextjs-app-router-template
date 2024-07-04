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
import { SyntheticEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { AccordionAlternate } from "src/components/base/styles/accordion"

type AccordionItem = {
  name: string
  jobTitle: string
  avatarSrc: string
  email: string
  salary: string
  resumeFile: string
}

function AlternateTabs() {
  const { t } = useTranslation()
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null)

  const accordionData: AccordionItem[] = [
    {
      name: "Shaquille Mandy",
      jobTitle: "Software Engineer",
      avatarSrc: "/avatars/4.png",
      email: "binaryballer33@gmail.com",
      salary: "$250,000",
      resumeFile: "resume_full_stack_developer.pdf",
    },
    {
      name: "Megan Nicole",
      jobTitle: "Pediatrician",
      avatarSrc: "/avatars/5.png",
      email: "megan_nichole@gmail.com",
      salary: "$333,333",
      resumeFile: "resume_pediatrician.pdf",
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
          onChange={handleAccordionToggle(index)}
          key={item.email}
        >
          <AccordionSummary
            expandIcon={<KeyboardArrowRightTwoToneIcon />}
            aria-controls={`panel${index + 1}a-content`}
            id={`panel${index + 1}a-header`}
          >
            <Box display="flex" alignItems="center">
              <Avatar variant="rounded" alt="..." sx={{ width: 52, height: 52 }} src={`/avatars/${index + 3}.png`} />
              <Box ml={1}>
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" noWrap>
                  {t(item.jobTitle)}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack mb={2} spacing={1} direction="row">
              <Button size="small" variant="outlined" color="primary">
                {t("View profile")}
              </Button>
              <Button size="small" variant="outlined" color="secondary">
                {t("Edit details")}
              </Button>
            </Stack>
            <Card elevation={0} variant="outlined">
              <ListItem>
                <ListItemText
                  primaryTypographyProps={{ variant: "h6" }}
                  primary={t("Email address")}
                  secondary={item.email}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primaryTypographyProps={{ variant: "h6" }}
                  primary={t("Salary expectation")}
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
                <ListItemText primaryTypographyProps={{ noWrap: true }} primary={t(item.resumeFile)} />
              </ListItem>
            </Card>
          </AccordionDetails>
        </AccordionAlternate>
      ))}
    </>
  )
}

export default AlternateTabs
