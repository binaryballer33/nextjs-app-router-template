"use client"

import Link from "next/link"

import {
    NavigationMenu as Nav,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Logo from "./logo"

const products = [
    {
        href: "/products/1",
        title: "Product 1",
    },
    {
        href: "/products/2",
        title: "Product 2",
    },
    {
        children: [
            { href: "/products/3/1", title: "Product 3.1" },
            { href: "/products/3/2", title: "Product 3.2" },
            { href: "/products/3/3", title: "Product 3.3" },
        ],
        href: "/products/3",
        title: "Product 3",
    },
]

const links = [
    { href: "/about", title: "About" },
    { href: "/services", title: "Services" },
    { href: "/contact", title: "Contact" },
]

export default function NavigationMenu() {
    return (
        <Nav className="hidden md:flex">
            <Logo />
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4">
                            {products.map((product) =>
                                !product.children ? (
                                    <NavigationMenuLink asChild key={product.title}>
                                        <Link
                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            href={product.href}
                                        >
                                            {product.title}
                                        </Link>
                                    </NavigationMenuLink>
                                ) : (
                                    <div className="relative" key={product.title}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                href={product.href}
                                            >
                                                {product.title}
                                            </Link>
                                        </NavigationMenuLink>
                                        <div className="absolute left-full top-0 ml-2">
                                            <div className="grid w-[200px] gap-3 rounded-md border bg-popover p-4 shadow-md">
                                                {product.children.map((child) => (
                                                    <NavigationMenuLink asChild key={child.title}>
                                                        <Link
                                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                            href={child.href}
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {links.map((link) => (
                    <NavigationMenuItem key={link.title}>
                        <Link href={link.href} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {link.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </Nav>
    )
}
