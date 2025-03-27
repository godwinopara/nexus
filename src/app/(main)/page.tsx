import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Notification Banner */}
            <div className="w-full bg-indigo-900 text-white py-3 px-4 text-center relative">
                <p className="text-sm">
                    Get up to $500 before payday with MyPay™.{" "}
                    <Link href="/services" className="underline">
                        Learn more
                    </Link>
                </p>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white">
                    ✕
                </button>
            </div>

            {/* Hero Section */}
            <section className="w-full py-20 md:py-32 bg-gradient-to-br from-green-400 to-green-500">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="flex flex-col justify-center space-y-8">
                            <div className="space-y-6">
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                                    Get up to $500 of your pay with MyPay
                                </h1>
                                <p className="max-w-[600px] text-white/80 md:text-xl">
                                    Fee-free banking that helps you get ahead. No credit check, no
                                    minimum deposit.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Enter your email"
                                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                                    />
                                </div>
                                <Button className="h-12 px-8 bg-indigo-900 hover:bg-indigo-800 text-white">
                                    Sign Up
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-white/70">
                                Already have an account?{" "}
                                <Link href="/auth" className="underline text-white">
                                    Log in
                                </Link>
                            </p>
                        </div>
                        <div className="lg:order-last">
                            <div className="relative">
                                <Image
                                    src="/images/hero.png"
                                    width={550}
                                    height={550}
                                    alt="HSGB Mobile App and Card"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured In Section */}
            <section className="w-full py-12 md:py-16 bg-gray-50">
                <div className="container px-4 mx-auto md:px-6">
                    <div className="text-center mb-8">
                        <p className="text-gray-500 text-sm uppercase tracking-wide">Featured in</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        <Image
                            src="/images/forbes.svg"
                            width={200}
                            height={100}
                            alt="Forbes logo"
                            className="h-8 object-contain opacity-70"
                        />
                        <Image
                            src="/images/NYT.svg"
                            width={200}
                            height={100}
                            alt="New York Times logo"
                            className="h-8 object-contain opacity-70"
                        />
                        <Image
                            src="/images/fastco.svg"
                            width={200}
                            height={100}
                            alt="Fast Company logo"
                            className="h-8 object-contain opacity-70"
                        />
                        <Image
                            src="/images/TC.svg"
                            width={200}
                            height={100}
                            alt="TechCrunch logo"
                            className="h-8 object-contain opacity-70"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-20 bg-white">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                            Banking that has your back
                        </h2>
                        <p className="mt-4 text-gray-500 md:text-xl max-w-3xl mx-auto">
                            No hidden fees. No minimum balance requirements. Just financial peace of
                            mind.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fee-free Checking</h3>
                            <p className="text-gray-500">
                                No monthly fees, no minimum balance requirements, and no overdraft
                                fees. Ever.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Get Paid Early</h3>
                            <p className="text-gray-500">
                                Set up direct deposit and get your paycheck up to 2 days early. No
                                strings attached.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">SpotMe&reg; Overdraft</h3>
                            <p className="text-gray-500">
                                We&apos;ll spot you up to $200 on debit card purchases with no
                                overdraft fees.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credit Builder Section */}
            <section className="w-full py-20 bg-gray-50">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="relative rounded-xl overflow-hidden">
                            <Image
                                src="/images/direct.jpg"
                                width={550}
                                height={550}
                                alt="Credit Builder Card"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="flex flex-col justify-center space-y-6">
                            <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                                Credit Builder
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                                Build credit, with no fees or interest
                            </h2>
                            <p className="text-gray-600 md:text-lg">
                                Our secured Credit Builder card helps you build credit with no
                                annual fees, no interest, and no credit check to apply.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <div className="mr-3 flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">No credit check to apply</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-3 flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">
                                        No annual fees or interest
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-3 flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">
                                        Reports to all 3 major credit bureaus
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-3 flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">
                                        Secured with your own money
                                    </span>
                                </li>
                            </ul>
                            <div className="pt-4">
                                <Button
                                    asChild
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <Link href="/services">
                                        Learn More
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Early Pay Section */}
            <section className="w-full py-20 bg-white">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
                            <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                                MyPay™
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                                Get paid up to 2 days early
                            </h2>
                            <p className="text-gray-600 md:text-lg">
                                Set up direct deposit and get your paycheck up to two days early. No
                                strings attached, no credit check, no waiting.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <div className="mr-3 flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">
                                        Get paid up to 2 days early with direct deposit
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-3 flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">
                                        Access up to $500 of your paycheck early with MyPay
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-3 flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <Check className="h-4 w-4 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">
                                        No interest, no credit check, no hidden fees
                                    </span>
                                </li>
                            </ul>
                            <div className="pt-4">
                                <Button
                                    asChild
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <Link href="/services">
                                        Learn More
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative order-1 lg:order-2">
                            <Image
                                src="/images/hero.png"
                                width={550}
                                height={550}
                                alt="Early Pay Mobile App"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-20 bg-green-600">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white mb-6">
                        Banking that has your back
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Join over 15 million members who are getting ahead with fee-free banking.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-green-600 border-none hover:bg-green-600 hover:text-white"
                        >
                            <Link href="/auth">Sign Up</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-none bg-white text-green-600 hover:bg-green-600 hover:text-white"
                        >
                            <Link href="/contact">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
