import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutUsPage() {
    const teamMembers = [
        { image: "https://placehold.co/600x600", name: "Alice Johnson", role: "CEO" },
        { image: "https://placehold.co/600x600", name: "Bob Smith", role: "CTO" },
        { image: "https://placehold.co/600x600", name: "Carol Williams", role: "COO" },
    ]

    return (
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                About Acme Inc
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                                We're a passionate team dedicated to creating innovative solutions for our customers.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                        <img
                            alt="Team meeting"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            height="310"
                            src="https://placehold.co/600x600"
                            width="550"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <ul className="grid gap-6">
                                <li>
                                    <div className="grid gap-1">
                                        <h3 className="text-xl font-bold">Our Mission</h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            To empower businesses with cutting-edge technology solutions that drive
                                            growth and success.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="grid gap-1">
                                        <h3 className="text-xl font-bold">Our Vision</h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            To be the leading innovator in our industry, setting new standards for
                                            excellence and customer satisfaction.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="grid gap-1">
                                        <h3 className="text-xl font-bold">Our Values</h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Innovation, Integrity, Collaboration, and Customer-Centricity guide
                                            everything we do.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="w-full bg-accent py-12 dark:bg-accent md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Our Team
                    </h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {teamMembers.map((member) => (
                            <Card key={member.name}>
                                <CardHeader>
                                    <Avatar className="mx-auto h-24 w-24">
                                        <AvatarImage alt={member.name} src={member.image} />
                                        <AvatarFallback>
                                            {member.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardTitle>{member.name}</CardTitle>
                                    <CardDescription>{member.role}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
