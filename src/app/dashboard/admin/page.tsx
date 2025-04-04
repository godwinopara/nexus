"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowUpDown,
    BarChart3,
    Filter,
    Shield,
    User,
    Users,
    ArrowUp,
    ArrowDown,
    Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useAdmin } from "@/context/AdminContext";
import { IUser, ITransaction } from "../user/types/type";

export default function AdminDashboard() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const { adminState, getAllBankData } = useAdmin();

    useEffect(() => {
        setUsers(adminState.users);
        setTransactions(adminState.transactions);
    }, [adminState.users, adminState.transactions]);
    // Get recent users

    useEffect(() => {
        async function fetchData() {
            await getAllBankData();
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-1">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6">
                <div className="grid gap-6 max-w-6xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500">Monitor and manage all banking operations</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Total Users
                                </CardTitle>
                                <Users className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{users.length}</div>
                                <div className="flex items-center text-xs text-green-500">
                                    <ArrowUp className="mr-1 h-3 w-3" />
                                    <span>+12.5% from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Total Transactions
                                </CardTitle>
                                <User className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{transactions.length}</div>
                                <div className="flex items-center text-xs text-green-500">
                                    <ArrowUp className="mr-1 h-3 w-3" />
                                    <span>+15.8% from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Transaction Activity */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-3">
                            <div>
                                <CardTitle className="text-lg font-medium">
                                    Transaction Activity
                                </CardTitle>
                                <CardDescription>
                                    Overview of recent transaction volume
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            {/* Placeholder for a chart - in a real app, you'd use a charting library */}
                            <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-500">Transaction Volume Chart</p>
                                    <p className="text-xs text-gray-400">
                                        Deposits, Withdrawals, and Transfers
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-600">
                                            Deposits
                                        </span>
                                        <ArrowUp className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="text-xl font-bold text-green-700">
                                        $
                                        {transactions
                                            .filter((t) => t.type === "deposit")
                                            .reduce((sum, t) => sum + t.amount, 0)
                                            .toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-xs text-green-600">
                                        +5.2% from previous period
                                    </div>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-600">
                                            Withdrawals
                                        </span>
                                        <ArrowDown className="h-4 w-4 text-red-600" />
                                    </div>
                                    <div className="text-xl font-bold text-red-700">
                                        $
                                        {transactions
                                            .filter((t) => t.type === "withdrawal")
                                            .reduce((sum, t) => sum + t.amount, 0)
                                            .toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-xs text-red-600">
                                        +3.8% from previous period
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-600">
                                            Transfers
                                        </span>
                                        <Activity className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="text-xl font-bold text-blue-700">
                                        $
                                        {transactions
                                            .filter((t) => t.type === "transfer")
                                            .reduce((sum, t) => sum + t.amount, 0)
                                            .toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-xs text-blue-600">
                                        +2.4% from previous period
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Links and Alerts */}
                    <div className="grid gap-4">
                        {/* Quick Links */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="border-b border-gray-100 pb-3">
                                <CardTitle className="text-lg font-medium">Quick Links</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-100">
                                    <Link
                                        href="/dashboard/admin/users"
                                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <Users className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <span className="font-medium">User Management</span>
                                        </div>
                                        <ArrowUpDown className="h-4 w-4 text-gray-400" />
                                    </Link>
                                    <Link
                                        href="/dashboard/admin/transactions"
                                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                <Activity className="h-4 w-4 text-green-600" />
                                            </div>
                                            <span className="font-medium">Transactions</span>
                                        </div>
                                        <ArrowUpDown className="h-4 w-4 text-gray-400" />
                                    </Link>
                                    <Link
                                        href="/dashboard/admin/compliance"
                                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                                                <Shield className="h-4 w-4 text-amber-600" />
                                            </div>
                                            <span className="font-medium">Compliance</span>
                                        </div>
                                        <ArrowUpDown className="h-4 w-4 text-gray-400" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Users */}
                    {/* <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-3">
                            <div>
                                <CardTitle className="text-lg font-medium">Recent Users</CardTitle>
                                <CardDescription>Latest registered users</CardDescription>
                            </div>
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            >
                                <Link href="/dashboard/admin/users">View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>KYC Status</TableHead>
                                        <TableHead>Registration Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.uid}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={`https://avatar.vercel.sh`}
                                                            alt={user.fullName}
                                                        />
                                                        <AvatarFallback>
                                                            {user.fullName
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">
                                                            {user.fullName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.status === "active"
                                                            ? "default"
                                                            : user.status === "pending"
                                                            ? "secondary"
                                                            : "destructive"
                                                    }
                                                >
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.kycStatus === "verified"
                                                            ? "default"
                                                            : user.kycStatus === "pending"
                                                            ? "secondary"
                                                            : "destructive"
                                                    }
                                                >
                                                    {user.kycStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEditUser(user)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card> */}
                </div>
            </main>

            {/* Edit User Dialog */}
            {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user status and KYC verification status.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="status">Account Status</Label>
                            <Select
                                value={editingUser?.status}
                                onValueChange={(value: "active" | "pending" | "suspended") =>
                                    setEditingUser((prev) =>
                                        prev ? { ...prev, status: value } : null
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="kycStatus">KYC Status</Label>
                            <Select
                                value={editingUser?.kycStatus}
                                onValueChange={(value: "verified" | "pending" | "rejected") =>
                                    setEditingUser((prev) =>
                                        prev ? { ...prev, kycStatus: value } : null
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select KYC status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="verified">Verified</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveUser}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
        </div>
    );
}
