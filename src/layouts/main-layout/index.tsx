"use client"

import { type ReactNode } from "react"

import Footer from "./footer/footer"
// import Header from "./header/header"

type MainLayoutProps = {
    children?: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="mx-auto w-[95%]">
            {/* <Header /> */}
            <main className="my-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}
