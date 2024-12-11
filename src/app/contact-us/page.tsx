import { appMetadata } from "@/lib/config"

import ContactUsView from "@/views/contact-us/contact-us"

export const metadata = appMetadata.contactUs

export default async function ContactPage() {
    return <ContactUsView />
}
