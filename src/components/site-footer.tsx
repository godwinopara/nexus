import Link from "next/link";
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi";

export function SiteFooter() {
    return (
        <footer className="bg-white border-t border-gray-200 py-12 md:py-16">
            <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-green-600">HSGB</h3>
                    <p className="text-sm text-gray-500">
                        Secure, simple, and smart banking at your fingertips. Experience the future
                        of banking with HSGB.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-gray-400 hover:text-gray-600">
                            <FiFacebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-600">
                            <FiTwitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-600">
                            <FiInstagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-600">
                            <FiLinkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900">Products</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/services" className="text-gray-500 hover:text-gray-900">
                                Personal Banking
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="text-gray-500 hover:text-gray-900">
                                Business Banking
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="text-gray-500 hover:text-gray-900">
                                Credit Cards
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="text-gray-500 hover:text-gray-900">
                                Loans
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="text-gray-500 hover:text-gray-900">
                                Investments
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/about" className="text-gray-500 hover:text-gray-900">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-500 hover:text-gray-900">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-500 hover:text-gray-900">
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-500 hover:text-gray-900">
                                Careers
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="text-gray-500 hover:text-gray-900">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-500 hover:text-gray-900">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-500 hover:text-gray-900">
                                Cookie Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-500 hover:text-gray-900">
                                Security
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto mt-8 border-t pt-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-gray-500 md:text-left">
                        &copy; {new Date().getFullYear()} HSGB. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500">
                        <Link href="#" className="hover:text-gray-900">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-gray-900">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-gray-900">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
