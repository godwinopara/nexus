"use client";

import { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useApp } from "@/context/AppContext";
import { ITransaction } from "../types/type";

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedTimeRange, setSelectedTimeRange] = useState("30days");
    const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const { state } = useApp();

    useEffect(() => {
        if (state.transactions) {
            setTransactions(state.transactions);
        }
    }, [state.transactions]);

    // Filter transactions based on search and filters
    const filteredTransactions = transactions.filter((transaction) => {
        // Search filter
        const matchesSearch =
            searchTerm === "" ||
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.amount.toString().includes(searchTerm);

        // Account filter
        const matchesAccount = selectedAccount === "all" || transaction.account === selectedAccount;

        // Category filter
        const matchesCategory = selectedCategory === "all" || transaction.type === selectedCategory;

        // Time range filter (simplified for demo)
        const matchesTimeRange = true;

        return matchesSearch && matchesAccount && matchesCategory && matchesTimeRange;
    });

    return (
        <div className="grid gap-6 max-w-6xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Transactions</h1>
                <p className="text-gray-500">View and manage your transaction history</p>
            </div>

            {/* Filters */}
            <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Filters</CardTitle>
                    <CardDescription>Narrow down your transaction history</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-2">
                            <label htmlFor="search" className="text-sm font-medium">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    id="search"
                                    type="search"
                                    placeholder="Search transactions..."
                                    className="pl-8 border-gray-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="account" className="text-sm font-medium">
                                Account
                            </label>
                            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                                <SelectTrigger id="account" className="border-gray-200 w-full">
                                    <SelectValue placeholder="All Accounts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Accounts</SelectItem>
                                    <SelectItem value="Checking Account">
                                        Checking Account
                                    </SelectItem>
                                    <SelectItem value="Savings Account">Savings Account</SelectItem>
                                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium">
                                Transaction Type
                            </label>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger id="category" className="border-gray-200 w-full">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="deposit">Deposit</SelectItem>
                                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                                    <SelectItem value="transfer">Transfer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="timeRange" className="text-sm font-medium">
                                Time Range
                            </label>
                            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                                <SelectTrigger id="timeRange" className="border-gray-200 w-full">
                                    <SelectValue placeholder="Last 30 Days" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7days">Last 7 Days</SelectItem>
                                    <SelectItem value="30days">Last 30 Days</SelectItem>
                                    <SelectItem value="90days">Last 90 Days</SelectItem>
                                    <SelectItem value="year">This Year</SelectItem>
                                    <SelectItem value="custom">Custom Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-3">
                    <div>
                        <CardTitle className="text-lg font-medium">Transaction History</CardTitle>
                        <CardDescription>
                            Showing {filteredTransactions.length} transactions
                        </CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-b border-gray-100">
                                    <TableHead className="text-gray-500 font-medium">S/N</TableHead>
                                    <TableHead className="text-gray-500 font-medium hidden sm:table-cell">
                                        Transaction ID
                                    </TableHead>
                                    <TableHead className="text-gray-500 font-medium">
                                        Description
                                    </TableHead>
                                    <TableHead className="text-gray-500 font-medium hidden sm:table-cell">
                                        Transaction Type
                                    </TableHead>
                                    <TableHead className="text-gray-500 font-medium hidden sm:table-cell">
                                        Account
                                    </TableHead>
                                    <TableHead className="text-gray-500 font-medium text-right">
                                        Amount
                                    </TableHead>
                                    <TableHead className="text-gray-500 font-medium">
                                        Status
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTransactions.map((transaction, index) => (
                                    <TableRow
                                        key={transaction.transactionId}
                                        className="cursor-pointer hover:bg-gray-50/50 transition-colors"
                                        onClick={() =>
                                            setSelectedTransaction(
                                                transaction.transactionId === selectedTransaction
                                                    ? null
                                                    : transaction.transactionId
                                            )
                                        }
                                    >
                                        <TableCell className="font-medium text-gray-900">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="text-gray-900 hidden sm:table-cell">
                                            {transaction.transactionId.slice(0, 8)}...
                                        </TableCell>
                                        <TableCell className="text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    {transaction.type === "deposit" ? (
                                                        <svg
                                                            className="w-4 h-4 text-green-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="w-4 h-4 text-gray-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="block">
                                                        {transaction.description}
                                                    </span>
                                                    <span className="text-sm text-gray-500 sm:hidden">
                                                        {transaction.type} • {transaction.account}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                {transaction.type}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-gray-600 hidden sm:table-cell">
                                            {transaction.account}
                                        </TableCell>
                                        <TableCell className="text-right">
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
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {transaction.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredTransactions.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="h-24 text-center text-gray-500"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <svg
                                                    className="w-8 h-8 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                    />
                                                </svg>
                                                <p>No transactions found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Transaction Details */}
            {selectedTransaction && (
                <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-medium">Transaction Details</CardTitle>
                        <CardDescription>
                            {
                                transactions.find((t) => t.transactionId === selectedTransaction)
                                    ?.description
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">
                                    Transaction ID
                                </h3>
                                <p className="break-all">{selectedTransaction}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">
                                    Date & Time
                                </h3>
                                <p>
                                    {
                                        transactions.find(
                                            (t) => t.transactionId === selectedTransaction
                                        )?.date
                                    }
                                    , 10:23 AM
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Amount</h3>
                                <p
                                    className={
                                        (transactions.find(
                                            (t) => t.transactionId === selectedTransaction
                                        )?.amount ?? 0) > 0
                                            ? "text-green-600 font-medium"
                                            : "font-medium"
                                    }
                                >
                                    {(transactions.find(
                                        (t) => t.transactionId === selectedTransaction
                                    )?.amount ?? 0) > 0
                                        ? "+"
                                        : ""}
                                    $
                                    {Math.abs(
                                        transactions.find(
                                            (t) => t.transactionId === selectedTransaction
                                        )?.amount ?? 0
                                    ).toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                                <p>
                                    {
                                        transactions.find(
                                            (t) => t.transactionId === selectedTransaction
                                        )?.status
                                    }
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                                <p>
                                    {
                                        transactions.find(
                                            (t) => t.transactionId === selectedTransaction
                                        )?.type
                                    }
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Account</h3>
                                <p>
                                    {
                                        transactions.find(
                                            (t) => t.transactionId === selectedTransaction
                                        )?.account
                                    }
                                </p>
                            </div>
                            <div className="sm:col-span-2">
                                <h3 className="text-sm font-medium text-gray-500 mb-1">
                                    Description
                                </h3>
                                <p>
                                    {
                                        transactions.find(
                                            (t) => t.transactionId === selectedTransaction
                                        )?.description
                                    }
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
