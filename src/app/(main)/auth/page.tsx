"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { useApp } from "@/context/AppContext";
import { Session } from "@/lib/localStorage";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useAdmin } from "@/context/AdminContext";

interface FirebaseError {
    message: string;
    code?: string;
}

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { login } = useApp();
    const { getAllBankData } = useAdmin();

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const user = await login(accountNumber, password);
            if (user) {
                const session: Session = {
                    id: user.uid,
                    role: user.role,
                    email: user.email,
                    name: user.fullName,
                };
                localStorage.setItem("session", JSON.stringify(session));

                toast.success("Login Successful", {
                    description: `Welcome back, ${user.fullName}!`,
                    position: "top-right",
                    style: {
                        background: "#fff",
                        color: "#008000",
                        borderRadius: "10px",
                        fontSize: "14px",
                    },
                });

                // Redirect based on role
                if (user.role === "user") {
                    router.push("/dashboard/user");
                } else {
                    await getAllBankData();
                    router.push("/dashboard/admin");
                }
            } else {
                throw new Error("Invalid Account ID or Password. Please try again.");
            }
        } catch (error) {
            const firebaseError = error as FirebaseError;
            toast.error("Login Failed", {
                description:
                    firebaseError.message || "Invalid Account ID or Password. Please try again.",
                position: "top-right",
                style: {
                    background: "#fff",
                    color: "#bc1717",
                    borderRadius: "10px",
                    fontSize: "14px",
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords Don't Match", {
                description: "Please make sure your passwords match.",
            });
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setCountry("");

            toast.error("Registration Failed", {
                description: "Failed to create account. Please try again.",
            });
        }, 5000);

        // try {
        //     const user = await register(email, password, firstName, lastName, country);

        //     if (user?.accountNumber) {
        //         await sendAccountNumber(firstName, email, user.accountNumber);
        //         setIsModalVisible(true);
        //     }

        //     // Reset form and switch to login
        //     setFirstName("");
        //     setLastName("");
        //     setEmail("");
        //     setPassword("");
        //     setConfirmPassword("");
        //     setCountry("");
        //     setActiveTab("login");
        // } catch (error) {
        //     const firebaseError = error as FirebaseError;
        //     toast.error("Registration Failed", {
        //         description: firebaseError.message || "Failed to create account. Please try again.",
        //     });
        // } finally {
        //     setIsLoading(false);
        // }
    };

    // Replace the Tabs component with a simple state-based implementation
    const [activeTab, setActiveTab] = useState("login");

    const countries = [
        "United States",
        "Canada",
        "Mexico", // North America
        "Brazil",
        "Argentina",
        "Colombia", // South America
        "United Kingdom",
        "Germany",
        "France",
        "Italy",
        "Spain",
        "Netherlands", // Europe
        "Belgium",
        "Sweden",
        "Norway",
        "Denmark",
        "Finland",
        "Ireland",
        "Switzerland",
        "Austria",
        "Portugal",
        "Greece",
        "Poland",
        "Czech Republic",
        "Hungary",
        "Romania",
        "Bulgaria",
        "Croatia",
        "Slovakia",
        "Slovenia",
        "Estonia",
        "Latvia",
        "Lithuania",
        "Luxembourg",
        "Malta",
        "Cyprus",
        "Iceland",
        "Liechtenstein",
        "Monaco",
        "San Marino",
        "Andorra",
        "Vatican City", // More Europe
        "Australia",
        "Japan",
        "China",
        "India", // Asia
        // Add more countries as needed
    ];

    const AccountCreatedModal = ({
        isVisible,
        onClose,
    }: {
        isVisible: boolean;
        onClose: () => void;
    }) => {
        return (
            <Dialog open={isVisible} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl p-6 shadow-xl">
                    <DialogHeader className="space-y-4">
                        <div className="mx-auto bg-emerald-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <DialogTitle className="text-2xl font-semibold text-center text-gray-800">
                            Account Created Successfully!
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-600 leading-relaxed">
                            <span className="mb-2 block">
                                Congratulations! Your Account ID has been created successfully.
                            </span>
                            <span className="text-sm block bg-gray-50 p-4 rounded-lg border border-gray-100">
                                We&apos;ve sent your account number to{" "}
                                <span className="font-medium text-emerald-600">
                                    your email address
                                </span>{" "}
                                <br />
                                Please check your inbox and use it to log in.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 sm:mt-8">
                        <Button
                            onClick={onClose}
                            className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors duration-200 font-medium"
                        >
                            Got it, thanks!
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Toaster />
            <AccountCreatedModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
            <div className="flex flex-col items-center justify-center w-full p-8">
                <div className="mx-auto w-full max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h2 className="text-gray-500">
                            Secure, simple, and financial solutions at your fingertips
                        </h2>
                    </div>

                    <div className="w-full">
                        <div className="grid w-full grid-cols-2 bg-gray-100 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setActiveTab("login")}
                                className={`py-2 cursor-pointer ${
                                    activeTab === "login" ? "bg-white" : ""
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab("signup")}
                                className={`py-2 cursor-pointer ${
                                    activeTab === "signup" ? "bg-white" : ""
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {activeTab === "login" && (
                            <div className="mt-4">
                                <Card className="border-0 shadow-sm">
                                    <CardHeader>
                                        <CardTitle>Welcome back</CardTitle>
                                        <CardDescription>
                                            Enter your credentials to access your account
                                        </CardDescription>
                                    </CardHeader>
                                    <form onSubmit={handleLogin}>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Account ID</Label>
                                                <Input
                                                    id="accountNumber"
                                                    type="text"
                                                    placeholder="0293095839"
                                                    required
                                                    className="border-gray-200"
                                                    value={accountNumber}
                                                    onChange={(e) =>
                                                        setAccountNumber(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="password">Password</Label>
                                                    <Link
                                                        href="#"
                                                        className="text-sm text-emerald-600 hover:text-emerald-800"
                                                    >
                                                        Forgot password?
                                                    </Link>
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        className="border-gray-200 pr-10"
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(e.target.value)
                                                        }
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute cursor-pointer right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                        <span className="sr-only">
                                                            Toggle password visibility
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                type="submit"
                                                className="w-full h-[40px] cursor-pointer my-5 bg-emerald-500 hover:bg-emerald-600"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span className="flex items-center">
                                                        <svg
                                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                        Logging in...
                                                    </span>
                                                ) : (
                                                    "Sign in"
                                                )}
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </Card>
                            </div>
                        )}

                        {activeTab === "signup" && (
                            <div className="mt-4">
                                <Card className="border-0 shadow-sm">
                                    <CardHeader>
                                        <CardTitle>Create an account</CardTitle>
                                        <CardDescription>
                                            Enter your details to create your account
                                        </CardDescription>
                                    </CardHeader>
                                    <form onSubmit={handleSignup}>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName">First Name</Label>
                                                    <Input
                                                        id="firstName"
                                                        type="text"
                                                        required
                                                        className="border-gray-200"
                                                        value={firstName}
                                                        onChange={(e) =>
                                                            setFirstName(e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName">Last Name</Label>
                                                    <Input
                                                        id="lastName"
                                                        type="text"
                                                        required
                                                        className="border-gray-200"
                                                        value={lastName}
                                                        onChange={(e) =>
                                                            setLastName(e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="signup-email">Email</Label>
                                                <Input
                                                    id="signup-email"
                                                    type="email"
                                                    required
                                                    className="border-gray-200"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country</Label>
                                                <Select value={country} onValueChange={setCountry}>
                                                    <SelectTrigger className="border-gray-200 w-full h-11">
                                                        <SelectValue placeholder="Select your country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {countries.map((country) => (
                                                            <SelectItem
                                                                key={country}
                                                                value={country}
                                                            >
                                                                {country}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="signup-password">Password</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="signup-password"
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        className="border-gray-200 pr-10"
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(e.target.value)
                                                        }
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute cursor-pointer right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                        <span className="sr-only">
                                                            Toggle password visibility
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirm-password">
                                                    Confirm Password
                                                </Label>
                                                <Input
                                                    id="confirm-password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    className="border-gray-200"
                                                    value={confirmPassword}
                                                    onChange={(e) =>
                                                        setConfirmPassword(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                type="submit"
                                                className="w-full h-[40px] cursor-pointer my-5 bg-emerald-500 hover:bg-emerald-600"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span className="flex items-center">
                                                        <svg
                                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                        Creating account...
                                                    </span>
                                                ) : (
                                                    "Create account"
                                                )}
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
