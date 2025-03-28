import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="container  mx-auto flex h-16 items-center px-6 xl:px-10">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold text-xl text-green-600">HSGB</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm">
                    <div className="relative group py-5">
                        <button className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none">
                            Online Banking{" "}
                            <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute left-0 w-56 mt-4 pt-2 hidden group-hover:block">
                            <div className="bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                                <Link
                                    href="/how-it-works"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    How it works
                                </Link>
                                <Link
                                    href="/debit-card"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    HSGB Visa® Debit Card
                                </Link>
                                <Link
                                    href="/savings-account"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    High-Yield Savings Account
                                </Link>
                                <Link
                                    href="/mobile-banking"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Mobile Banking
                                </Link>
                                <Link
                                    href="/atms"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    ATMs
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/services" className="text-gray-600 py-4 hover:text-gray-900">
                        Manage Money
                    </Link>

                    <Link href="/about" className="text-gray-600 hover:text-gray-900">
                        Who We Are
                    </Link>

                    <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                        Contact
                    </Link>
                </nav>

                <div className="ml-auto flex items-center space-x-4">
                    {/* Mobile Navigation Button */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-10 w-10 cursor-pointer" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4">
                                <div className="px-3 py-5">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                        Online Banking
                                    </h2>
                                    <div className="space-y-1">
                                        <Link
                                            href="/how-it-works"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            How it works
                                        </Link>
                                        <Link
                                            href="/debit-card"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            HSGB Visa® Debit Card
                                        </Link>
                                        <Link
                                            href="/savings-account"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            High-Yield Savings Account
                                        </Link>
                                        <Link
                                            href="/mobile-banking"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            Mobile Banking
                                        </Link>
                                        <Link
                                            href="/atms"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            ATMs
                                        </Link>
                                    </div>
                                </div>
                                <div className="px-3 py-2">
                                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                        Services
                                    </h2>
                                    <div className="space-y-1">
                                        <Link
                                            href="/services"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            Manage Money
                                        </Link>
                                        <Link
                                            href="/about"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            Who We Are
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            Contact
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Auth Buttons */}
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <Link href="/auth">Log In</Link>
                    </Button>
                    <Button
                        asChild
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                    >
                        <Link href="/auth?tab=signup">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
