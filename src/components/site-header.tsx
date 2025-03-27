import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="container  mx-auto flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold text-xl text-green-600">HSGB</span>
                </Link>
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
