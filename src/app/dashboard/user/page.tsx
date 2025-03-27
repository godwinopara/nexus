"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Shield, Users, DollarSign, Clock, Activity, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// import { getSession } from "@/lib/localStorage";
import { useApp } from "@/context/AppContext";
import { ITransaction } from "./types/type";

export default function UserDashboard() {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [balance, setBalance] = useState(0.0);
    const { state } = useApp();

    useEffect(() => {
        if (state.transactions) {
            setTransactions(state.transactions);
        }
        if (state.accounts) {
            const totalBalance = state.accounts?.reduce((acc, account) => acc + account.balance, 0);
            console.log(totalBalance, "totalBalance");
            setBalance(totalBalance);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.accounts]);

    // Get recent transactions
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <div className="flex flex-1">
            {/* Main content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="grid gap-6 max-w-6xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Welcome back, {state.user?.fullName.split(" ")[0]}
                        </h1>
                        <p className="text-gray-500">
                            Here&apos;s what&apos;s happening with your account
                        </p>
                    </div>

                    {/* Overview Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Balance
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    $
                                    {balance.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Transactions
                                </CardTitle>
                                <Activity className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{transactions.length}</div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    KYC Status
                                </CardTitle>
                                <Shield className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {state.user
                                        ? state.user.kycStatus.charAt(0).toUpperCase() +
                                          state.user.kycStatus.slice(1)
                                        : "Pending"}
                                </div>
                                <div className="flex items-center text-xs text-amber-500">
                                    <Clock className="mr-1 h-3 w-3" />
                                    <span>
                                        {state.user?.kycStatus === "pending"
                                            ? "Verification in progress"
                                            : "Verification completed"}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid gap-4">
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="border-b border-gray-100 pb-3">
                                <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                                    <Link
                                        href="/dashboard/user/transfers"
                                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <ArrowUpDown className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <span className="font-medium">Send Money</span>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/dashboard/user/accounts"
                                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                <Users className="h-4 w-4 text-green-600" />
                                            </div>
                                            <span className="font-medium">Manage Accounts</span>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/dashboard/user/settings"
                                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                                                <Pencil className="h-4 w-4 text-amber-600" />
                                            </div>
                                            <span className="font-medium">Settings</span>
                                        </div>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Transactions */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-3">
                            <div>
                                <CardTitle className="text-lg font-medium">
                                    Recent Transactions
                                </CardTitle>
                                <CardDescription>Your latest financial activities</CardDescription>
                            </div>
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            >
                                <Link href="/dashboard/user/transactions">View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="px-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction</TableHead>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map((transaction) => (
                                        <TableRow key={transaction.transactionId}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <ArrowUpDown className="h-4 w-4 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            {transaction.type
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                transaction.type.slice(1)}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {transaction.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>{transaction.transactionId}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={`font-medium ${
                                                        transaction.type === "deposit"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {transaction.type === "deposit" ? "+" : "-"}$
                                                    {transaction.amount.toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                    })}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className="bg-green-500 text-white"
                                                    variant={
                                                        transaction.status === "completed"
                                                            ? "default"
                                                            : transaction.status === "pending"
                                                            ? "secondary"
                                                            : "destructive"
                                                    }
                                                >
                                                    {transaction.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    transaction.createdAt
                                                ).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
