import type { SvgIconComponent } from "@mui/icons-material"

import AccessTimeTwoTone from "@mui/icons-material/AccessTimeTwoTone"
import ArticleTwoTone from "@mui/icons-material/ArticleTwoTone"
import AssignmentTwoTone from "@mui/icons-material/AssignmentTwoTone"
import BookTwoTone from "@mui/icons-material/BookTwoTone"
import BrushTwoTone from "@mui/icons-material/BrushTwoTone"
import CategoryTwoTone from "@mui/icons-material/CategoryTwoTone"
import DashboardTwoTone from "@mui/icons-material/DashboardTwoTone"
import EmojiEventsTwoTone from "@mui/icons-material/EmojiEventsTwoTone"
import EventTwoTone from "@mui/icons-material/EventTwoTone"
import FeedbackTwoTone from "@mui/icons-material/FeedbackTwoTone"
import FolderTwoTone from "@mui/icons-material/FolderTwoTone"
import PeopleTwoTone from "@mui/icons-material/PeopleTwoTone"
import ReceiptTwoTone from "@mui/icons-material/ReceiptTwoTone"
import SlideshowTwoTone from "@mui/icons-material/SlideshowTwoTone"
import TableChartTwoTone from "@mui/icons-material/TableChartTwoTone"

export const iconMapping: { [key: string]: SvgIconComponent } = {
    AccessTimeTwoTone,
    ArticleTwoTone,
    AssignmentTwoTone,
    BookTwoTone,
    BrushTwoTone,
    CategoryTwoTone,
    DashboardTwoTone,
    EmojiEventsTwoTone,
    EventTwoTone,
    FeedbackTwoTone,
    FolderTwoTone,
    PeopleTwoTone,
    ReceiptTwoTone,
    SlideshowTwoTone,
    TableChartTwoTone,
}

export type Category = "applications" | "files" | "folders" | "images" | "users"

export type Item = {
    avatar: string
    category: Category
    description: string
    id: number
    title: string
}

export const dummyData: Item[] = [
    // Folders
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Notes from various team meetings",
        id: 1,
        title: "Meeting Notes",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Files related to Project Delta initiative",
        id: 2,
        title: "Project Delta",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Human resources policies and guidelines",
        id: 3,
        title: "HR Policies",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Monthly expense reports and receipts",
        id: 4,
        title: "Expense Reports",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Presentations for clients and stakeholders",
        id: 5,
        title: "Client Presentations",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Quarterly marketing plans and strategies",
        id: 6,
        title: "Marketing Plans",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Research files on competitor analysis",
        id: 7,
        title: "Competitor Analysis",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Technical review documents and feedback",
        id: 8,
        title: "Tech Reviews",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Onboarding and training resources for new hires",
        id: 9,
        title: "Training Material",
    },
    {
        avatar: "FolderTwoTone",
        category: "folders",
        description: "Yearly business performance reports",
        id: 10,
        title: "Annual Reports",
    },
    // Files
    {
        avatar: "SlideshowTwoTone",
        category: "files",
        description: "Company overview presentation Q1",
        id: 12,
        title: "Company_Overview.pptx",
    },
    {
        avatar: "AssignmentTwoTone",
        category: "files",
        description: "Signed contract with John Doe",
        id: 13,
        title: "Contract_John_Doe.docx",
    },
    {
        avatar: "BookTwoTone",
        category: "files",
        description: "The complete guide for new employees",
        id: 14,
        title: "Employee_Handbook.pdf",
    },
    {
        avatar: "TableChartTwoTone",
        category: "files",
        description: "CSV file with Q4 sales forecast data",
        id: 15,
        title: "Sales_Forecast.q4.csv",
    },
    {
        avatar: "BrushTwoTone",
        category: "files",
        description: "Mockup designs for the website redesign project",
        id: 16,
        title: "Website_Redesign_Mockup.sketch",
    },
    {
        avatar: "ArticleTwoTone",
        category: "files",
        description: "Summary of the latest research findings",
        id: 17,
        title: "Research_Summary.pdf",
    },
    {
        avatar: "CategoryTwoTone",
        category: "files",
        description: "The 2023 product catalog with all listings",
        id: 18,
        title: "Product_Catalog_2023.pdf",
    },
    {
        avatar: "FeedbackTwoTone",
        category: "files",
        description: "Compiled customer feedback from 2022",
        id: 19,
        title: "Customer_Feedback_2022.json",
    },
    {
        avatar: "EmojiEventsTwoTone",
        category: "files",
        description: "Checklist for upcoming corporate event planning",
        id: 20,
        title: "Event_Planning_Checklist.docx",
    },
    {
        avatar: "AccessTimeTwoTone",
        category: "applications",
        description: "Application for logging work hours",
        id: 21,
        title: "Time Tracker",
    },
    {
        avatar: "EventTwoTone",
        category: "applications",
        description: "Tool for scheduling and managing meetings",
        id: 22,
        title: "Meeting Scheduler",
    },
    {
        avatar: "ReceiptTwoTone",
        category: "applications",
        description: "App for submitting expense reports",
        id: 23,
        title: "Expense Reimbursement",
    },
    {
        avatar: "DashboardTwoTone",
        category: "applications",
        description: "Project management and collaboration software",
        id: 24,
        title: "Project Central",
    },
    {
        avatar: "PeopleTwoTone",
        category: "applications",
        description: "Human resources management system",
        id: 25,
        title: "HR Portal",
    },
    // Users
    {
        avatar: "/avatars/1.png",
        category: "users",
        description: "Lead Graphic Designer",
        id: 26,
        title: "Alex Johnson",
    },
    {
        avatar: "/avatars/2.png",
        category: "users",
        description: "IT Support Specialist",
        id: 27,
        title: "Samira Iqbal",
    },
    {
        avatar: "/avatars/3.png",
        category: "users",
        description: "Senior Accountant",
        id: 28,
        title: "Daniel Smith",
    },
    {
        avatar: "/avatars/4.png",
        category: "users",
        description: "Marketing Director",
        id: 29,
        title: "Liu Wei",
    },
    {
        avatar: "/avatars/5.png",
        category: "users",
        description: "Human Resources Manager",
        id: 30,
        title: "Olivia Martinez",
    },
    {
        avatar: "/avatars/1.png",
        category: "users",
        description: "Product Manager",
        id: 31,
        title: "Raj Patel",
    },
    {
        avatar: "/avatars/2.png",
        category: "users",
        description: "Front-end Developer",
        id: 32,
        title: "Emma Dubois",
    },
    {
        avatar: "/avatars/3.png",
        category: "users",
        description: "Sales Executive",
        id: 33,
        title: "Michael Brown",
    },
    {
        avatar: "/avatars/4.png",
        category: "users",
        description: "Customer Success Advocate",
        id: 34,
        title: "Sophia Lee",
    },
    {
        avatar: "/avatars/5.png",
        category: "users",
        description: "Data Scientist",
        id: 35,
        title: "Omar Al Khayyam",
    },
    {
        avatar: "/placeholders/spotlight-search/annual-report-cover.png",
        category: "images",
        description: "The cover image for our 2023 annual report",
        id: 36,
        title: "Annual Report Cover",
    },
    {
        avatar: "/placeholders/spotlight-search/spring-campaign.png",
        category: "images",
        description: "Image used for spring marketing campaign",
        id: 37,
        title: "Marketing Campaign",
    },
    {
        avatar: "/placeholders/spotlight-search/product-launch.png",
        category: "images",
        description: "Banner image for the new product launch",
        id: 38,
        title: "Product Launch",
    },
    {
        avatar: "/placeholders/spotlight-search/team-offsite.png",
        category: "images",
        description: "Photo from the annual team offsite meeting",
        id: 39,
        title: "Team Offsite",
    },
    {
        avatar: "/placeholders/spotlight-search/leadership-retreat.png",
        category: "images",
        description: "Group picture of the leadership retreat event",
        id: 40,
        title: "Leadership Retreat",
    },
    {
        avatar: "/placeholders/spotlight-search/holiday-party.png",
        category: "images",
        description: "Snapshot of the team during the holiday celebration",
        id: 41,
        title: "Holiday Party",
    },
    {
        avatar: "/placeholders/spotlight-search/customer-workshop.png",
        category: "images",
        description: "A moment captured during a customer workshop session",
        id: 42,
        title: "Customer Workshop",
    },
    {
        avatar: "/placeholders/spotlight-search/volunteer-day.png",
        category: "images",
        description: "Employees taking part in the corporate volunteer day",
        id: 43,
        title: "Corporate Volunteer Day",
    },
]
