import type { Metadata } from "next"

type AppMetadata = {
    homePage: Metadata
    login: Metadata
    register: Metadata
    resetPassword: Metadata
    signOut: Metadata
    userProfile: Metadata
    verifyEmail: Metadata
}

const APP_NAME = "nextjs-app-router-mui-template"

// eslint-disable-next-line import/prefer-default-export
export const appMetadata: AppMetadata = {
    homePage: {
        description: "Home Page For The App",
        title: `${APP_NAME}`,
    },
    login: {
        description: "User Login Page For The App",
        title: `Login Form - ${APP_NAME}`,
    },
    register: {
        description: "User Account Registration Page For The App",
        title: `Register Form - ${APP_NAME}`,
    },
    resetPassword: {
        description: "User Reset Password Page For The App",
        title: `Reset Password Form - ${APP_NAME}`,
    },
    signOut: {
        description: "User Sign Out Page For The App",
        title: `Sign Out - ${APP_NAME}`,
    },
    userProfile: {
        description: "User Profile Page For The App",
        title: `User Profile - ${APP_NAME}`,
    },
    verifyEmail: {
        description: "User Verify Email Page For The App",
        title: `Verify Email Form - ${APP_NAME}`,
    },
}
