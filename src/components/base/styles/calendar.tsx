import { Card, styled } from "@mui/material"

const FullCalendarWrapper = styled(Card)(({ theme }) => {
    return {
        "& .fc": {
            "--fc-bg-event-opacity": 1,
            "--fc-border-color": theme.palette.divider,
            "--fc-daygrid-event-dot-width": "10px",
            "--fc-event-bg-color": theme.palette.primary.main,
            "--fc-event-border-color": theme.palette.primary.main,
            "--fc-event-text-color": theme.palette.primary.contrastText,
            "--fc-list-event-hover-bg-color": theme.palette.background.default,
            "--fc-neutral-bg-color": theme.palette.background.default,
            "--fc-page-bg-color": theme.palette.background.default,
            "--fc-today-bg-color":
                theme.palette.mode === "dark" ? theme.palette.neutral[900] : theme.palette.neutral[100],
        },
        "& .fc .fc-col-header-cell-cushion": {
            fontSize: theme.typography.overline.fontSize,
            fontWeight: theme.typography.overline.fontWeight,
            letterSpacing: theme.typography.overline.letterSpacing,
            lineHeight: theme.typography.overline.lineHeight,
            paddingBottom: "10px",
            paddingTop: "10px",
            textTransform: theme.typography.overline.textTransform,
        },
        "& .fc .fc-day-other .fc-daygrid-day-top": {
            color: "text.secondary",
        },
        "& .fc-daygrid-block-event .fc-event-time": {
            lineHeight: "21px",
            minWidth: 38,
        },
        "& .fc-daygrid-day-frame": {
            padding: "6px",
        },
        "& .fc-daygrid-event": {
            borderRadius: theme.shape.borderRadius,
            fontSize: theme.typography.body2.fontSize,
            lineHeight: "21px",
            padding: "0px 2px",
        },
        "& .fc-license-message": {
            display: "none",
        },
        "& .fc-list": {
            borderColor: "transparent",
        },
        "& .fc-scrollgrid": {
            borderColor: "transparent",
        },
        "& .fc-scrollgrid td:last-of-type": {
            borderRightColor: "transparent",
        },
        '& .fc-scrollgrid-section.fc-scrollgrid-section-body td[role="presentation"]': {
            borderBottomColor: "transparent",
        },
        '& [role="row"]:last-of-type td': {
            borderBottomColor: "transparent",
        },
        '& th[role="presentation"]': {
            borderRightColor: "transparent",
        },
    }
})

export default FullCalendarWrapper
