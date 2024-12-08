"use client"

import Link from "next/link"

import { Menu } from "lucide-react"

import routes from "@/routes/routes"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import Logo from "./logo"

export default function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="md:hidden" size="icon" variant="ghost">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for mobile devices</SheetDescription>
                <nav className="flex flex-col space-y-4">
                    <Logo />
                    <Accordion collapsible type="single">
                        <AccordionItem value="products">
                            <AccordionTrigger>Products</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col space-y-2">
                                    <Link className="px-4 py-2 hover:bg-accent" href="/products/1">
                                        Product 1
                                    </Link>
                                    <Link className="px-4 py-2 hover:bg-accent" href="/products/2">
                                        Product 2
                                    </Link>
                                    <Accordion collapsible type="single">
                                        <AccordionItem value="product-3">
                                            <AccordionTrigger className="px-4">Product 3</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col space-y-2">
                                                    <Link className="px-6 py-2 hover:bg-accent" href="/products/3/1">
                                                        Product 3.1
                                                    </Link>
                                                    <Link className="px-6 py-2 hover:bg-accent" href="/products/3/2">
                                                        Product 3.2
                                                    </Link>
                                                    <Link className="px-6 py-2 hover:bg-accent" href="/products/3/3">
                                                        Product 3.3
                                                    </Link>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Link className="px-4 py-2 hover:bg-accent" href={routes.about}>
                        About
                    </Link>
                    <Link className="px-4 py-2 hover:bg-accent" href={routes.services}>
                        Services
                    </Link>
                    <Link className="px-4 py-2 hover:bg-accent" href={routes.contact}>
                        Contact
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
