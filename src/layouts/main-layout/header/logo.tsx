import Link from "next/link"

import routes from "@/routes/routes"

export default function Logo() {
    return (
        <Link className="mr-6" href={routes.home}>
            <img alt="Logo" className="h-8 w-8 rounded-full" src="https://placehold.co/600x600" />
        </Link>
    )
}
