"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, RefreshCw, Search } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { IAccountWithId } from "../../user/types/type";
import { toast } from "react-hot-toast";

interface IEditingBalance {
    checking: number;
    saving: number;
}

export default function AccountsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAccount, setSelectedAccount] = useState<IAccountWithId | null>(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingBalance, setEditingBalance] = useState<IEditingBalance>({
        checking: 0,
        saving: 0,
    });

    const { adminState, getAllBankData, updateAccount } = useAdmin();

    useEffect(() => {
        getAllBankData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditAccount = (account: IAccountWithId) => {
        setSelectedAccount(account);
        setEditingBalance({
            checking: account.accounts.find((acc) => acc.type === "Checking")?.balance || 0,
            saving: account.accounts.find((acc) => acc.type === "Savings")?.balance || 0,
        });
        setShowEditDialog(true);
    };

    const handleSaveAccount = async () => {
        if (!selectedAccount) return;
        setIsSaving(true);

        try {
            const updatedAccounts = selectedAccount.accounts.map((account) => {
                if (account.type === "Checking") {
                    return { ...account, balance: editingBalance.checking };
                }
                if (account.type === "Savings") {
                    return { ...account, balance: editingBalance.saving };
                }
                return account;
            });

            await updateAccount(selectedAccount.id, { accounts: updatedAccounts });
            await getAllBankData();
            setShowEditDialog(false);
            setSelectedAccount(null);
            toast.success("Account balances updated successfully", {
                position: "top-right",
                style: {
                    background: "#fff",
                    color: "#008000",
                    borderRadius: "10px",
                    fontSize: "14px",
                },
            });
        } catch (error) {
            toast.error("Failed to update account balances", {
                position: "top-right",
                style: {
                    background: "#fff",
                    color: "#bc1717",
                    borderRadius: "10px",
                    fontSize: "14px",
                },
            });
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const filteredAccounts = adminState.accounts.filter((account) => {
        const user = adminState.users.find((user) => user.uid === account.id);
        return searchTerm === "" || user?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="flex flex-1">
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="grid gap-6 max-w-6xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                Account Management
                            </h1>
                            <p className="text-gray-500">View and manage user accounts</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            onClick={getAllBankData}
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                    </div>

                    {/* Search */}
                    <Card className="border-0 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Search by user name..."
                                    className="pl-8 border-gray-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Accounts Table */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-3">
                            <div>
                                <CardTitle className="text-lg font-medium">User Accounts</CardTitle>
                                <CardDescription>
                                    Showing {filteredAccounts.length} accounts
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="text-gray-500">ID</TableHead>
                                        <TableHead className="text-gray-500">Full Name</TableHead>
                                        <TableHead className="text-gray-500">
                                            Checking Balance
                                        </TableHead>
                                        <TableHead className="text-gray-500">
                                            Saving Balance
                                        </TableHead>
                                        <TableHead className="text-gray-500">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAccounts.map((account) => {
                                        const user = adminState.users.find(
                                            (user) => user.uid === account.id
                                        );
                                        const checkingBalance =
                                            account.accounts.find((acc) => acc.type === "Checking")
                                                ?.balance || 0;
                                        const savingBalance =
                                            account.accounts.find((acc) => acc.type === "Savings")
                                                ?.balance || 0;

                                        return (
                                            <TableRow key={account.id}>
                                                <TableCell>{account.id}</TableCell>
                                                <TableCell>{user?.fullName || "N/A"}</TableCell>
                                                <TableCell>
                                                    $
                                                    {checkingBalance.toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    $
                                                    {savingBalance.toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleEditAccount(account)
                                                            }
                                                            className="h-8 w-8 cursor-pointer"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Edit Account Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Edit Account Balances</DialogTitle>
                        <DialogDescription>
                            Update the checking and saving account balances.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedAccount && (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="checking">Checking Balance</Label>
                                <Input
                                    id="checking"
                                    type="number"
                                    value={editingBalance.checking}
                                    onChange={(e) =>
                                        setEditingBalance({
                                            ...editingBalance,
                                            checking: parseFloat(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="saving">Saving Balance</Label>
                                <Input
                                    id="saving"
                                    type="number"
                                    value={editingBalance.saving}
                                    onChange={(e) =>
                                        setEditingBalance({
                                            ...editingBalance,
                                            saving: parseFloat(e.target.value),
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveAccount}
                            disabled={isSaving}
                            className="bg-green-500 hover:bg-green-600 text-white"
                        >
                            {isSaving ? (
                                <>
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
                                    Saving changes...
                                </>
                            ) : (
                                "Save changes"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
