import { appMetadata } from "@/lib/config"

import AboutUsView from "@/views/about-us/about-us-view"

export const metadata = appMetadata.aboutUs

export default async function AboutUsPage() {
    return <AboutUsView />
}
