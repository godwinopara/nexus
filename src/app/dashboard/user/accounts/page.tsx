"use client";

import Link from "next/link";
import { DollarSign, PiggyBank, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { IAccount } from "../types/type";

// Sample account data
// const accounts = [
//     {
//         id: "acc-1",
//         name: "Checking Account",
//         type: "Checking",
//         number: "**** **** **** 4582",
//         balance: 12546.8,
//         icon: DollarSign,
//         color: "bg-blue-100",
//         iconColor: "text-blue-600",
//     },
//     {
//         id: "acc-2",
//         name: "Savings Account",
//         type: "Savings",
//         number: "**** **** **** 7891",
//         balance: 48752.35,
//         icon: PiggyBank,
//         color: "bg-green-100",
//         iconColor: "text-green-600",
//     },
// ];

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    const { state } = useApp();

    useEffect(() => {
        if (state.accounts) {
            setAccounts(state.accounts);
        }
    }, [state.accounts]);

    return (
        <div className="grid gap-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Accounts</h1>
                    <p className="text-gray-500">Manage your accounts and view balances</p>
                </div>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Link Account
                </Button>
            </div>

            {/* Total Balance Card */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-green-500 to-green-600">
                <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg">Total Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-white">
                        $
                        {state.accounts
                            ?.reduce((acc, account) => acc + account.balance, 0)
                            .toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                    </div>
                    <p className="text-white/80 text-sm">Across all accounts</p>
                </CardContent>
            </Card>

            {/* Accounts List */}
            <div className="grid gap-4 md:grid-cols-2">
                {accounts.map((account) => (
                    <Card key={account.id} className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center">
                                <div
                                    className={`mr-3 flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center`}
                                >
                                    {account.type === "Savings" && (
                                        <PiggyBank className={`h-5 w-5 text-white`} />
                                    )}
                                    {account.type === "Checking" && (
                                        <DollarSign className={`h-5 w-5 text-white`} />
                                    )}
                                </div>
                                <div>
                                    <CardTitle className="text-base font-medium">
                                        {account.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {account.type} {account.number}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-500">Current Balance</span>
                                <span
                                    className={`text-lg font-bold ${
                                        account.balance < 0 ? "text-red-500" : ""
                                    }`}
                                >
                                    $
                                    {account.balance.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            >
                                <Link href={`/dashboard/user/transactions?account=${account.id}`}>
                                    View Transactions
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                <Link href="/dashboard/user/transfers">Transfer</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Account Details */}
            <Card className="border-0 shadow-sm">
                <CardHeader className="border-b border-gray-100 pb-3">
                    <CardTitle className="text-lg font-medium">Account Details</CardTitle>
                    <CardDescription>Information about your accounts</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                        {accounts.map((account) => (
                            <div key={account.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center">
                                    <div
                                        className={`mr-3 flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center`}
                                    >
                                        {account.type === "Savings" && (
                                            <PiggyBank className={`h-4 w-4 text-white`} />
                                        )}
                                        {account.type === "Checking" && (
                                            <DollarSign className={`h-4 w-4 text-white`} />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">{account.name}</p>
                                        <p className="text-sm text-gray-500">{account.number}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`font-medium ${
                                            account.balance < 0 ? "text-red-500" : ""
                                        }`}
                                    >
                                        $
                                        {Math.abs(account.balance).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-500">{account.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
