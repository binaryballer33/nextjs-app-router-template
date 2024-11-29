"use client"

import { type ReactNode } from "react"

import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"

type PageHeadingProps = {
    actions?: ReactNode
    background?: string
    bottomText?: string
    className?: string
    description?: string
    iconBox?: ReactNode
    title: string
    topSection?: ReactNode
}

export default function PageHeading(props: PageHeadingProps) {
    const { actions, background, bottomText, className, description, iconBox, title, topSection } = props
    const { t } = useTranslation()

    return (
        <div className={cn("flex flex-col", background && `bg-[${background}]`, className)}>
            <div className="flex w-full flex-col items-center justify-between md:flex-row">
                <div className="PageTitleContent flex flex-col items-center overflow-hidden md:flex-row md:space-x-4">
                    {iconBox}
                    <div className="flex flex-col overflow-hidden space-y-1 text-center md:text-left">
                        {topSection}
                        <h3 className="truncate text-2xl font-semibold tracking-tight">
                            {t(title)}
                        </h3>
                        {description && (
                            <h5 className="truncate text-lg font-normal text-muted-foreground md:whitespace-normal">
                                {t(description)}
                            </h5>
                        )}
                    </div>
                </div>
                {actions}
            </div>

            {bottomText && (
                <div className="my-4">
                    <div className="mb-4 w-full border-b md:w-3/4" />
                    <p className="text-base text-muted-foreground text-center md:text-left">
                        {t(bottomText)}
                    </p>
                </div>
            )}
        </div>
    )
}
