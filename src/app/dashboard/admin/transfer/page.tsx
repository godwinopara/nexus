"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Check, Send, AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import toast from "react-hot-toast";
import { IAccount, ITransaction } from "../../user/types/type";

export default function TransfersPage() {
    const [transferAmount, setTransferAmount] = useState("");
    const [fromAccount, setFromAccount] = useState("");
    const [recipientBank, setRecipientBank] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [bankAddress, setBankAddress] = useState("");
    const [transferType, setTransferType] = useState("");
    const [memo, setMemo] = useState("");
    const [confirmationChecked, setConfirmationChecked] = useState(false);

    // States for the confirmation flow
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    const transactionId = `NBTRX-${Math.floor(Math.random() * 100000000)}`;

    const [generatedOTP, setGeneratedOTP] = useState("");

    const { state, createTransaction, sendOTP, generateOTP, verifyOTP, updateUserBalance } =
        useApp();

    useEffect(() => {
        if (state.accounts) {
            setAccounts(state.accounts);
        }
    }, [state.accounts]);

    useEffect(() => {
        setGeneratedOTP(generateOTP());
    }, [generateOTP]);

    // Form validation
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Check if all required fields are filled
        const isValid =
            fromAccount !== "" &&
            recipientBank !== "" &&
            recipientName !== "" &&
            accountNumber !== "" &&
            routingNumber !== "" &&
            bankAddress !== "" &&
            transferType !== "" &&
            transferAmount !== "" &&
            confirmationChecked;

        setIsFormValid(isValid);
    }, [
        fromAccount,
        recipientBank,
        recipientName,
        accountNumber,
        routingNumber,
        bankAddress,
        transferType,
        transferAmount,
        confirmationChecked,
    ]);

    const handleTransfer = (e: React.FormEvent) => {
        e.preventDefault();
        // Show confirmation modal
        if (state.accounts) {
            const account = state.accounts.find((account) => account.name === fromAccount);
            const balance = account?.balance;

            if (parseFloat(transferAmount) < 1) {
                toast.error("Transfer amount must be greater than $1", {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        background: "#fff",
                        color: "#bc1717",
                        borderRadius: "10px",
                        fontSize: "14px",
                    },
                });
                return;
            }

            if (!balance || balance < parseFloat(transferAmount)) {
                toast.error("Insufficient balance", {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        background: "#fff",
                        color: "#bc1717",
                        borderRadius: "10px",
                        fontSize: "14px",
                    },
                });
                return;
            }
        }
        setShowConfirmationModal(true);
    };

    const handleConfirmTransfer = () => {
        // Close confirmation modal and show OTP modal
        setShowConfirmationModal(false);
        setShowOtpModal(true);

        if (state.user?.email) {
            // sendOTP(state.user?.email, generatedOTP);
            console.log(generatedOTP, "generatedOTP");
            toast.success("OTP sent to your email", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "#fff",
                    color: "#008000",
                    borderRadius: "10px",
                    fontSize: "14px",
                },
            });
        }
    };

    const handleVerifyOtp = () => {
        // Close OTP modal and show loading modal
        setShowOtpModal(false);
        setShowLoadingModal(true);

        setTimeout(() => {
            setShowLoadingModal(false);

            if (verifyOTP(otp, generatedOTP)) {
                setShowSuccessModal(true);
                setGeneratedOTP(generateOTP());
            } else {
                toast.error("Invalid OTP", {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        background: "#fff",
                        color: "#bc1717",
                        borderRadius: "10px",
                        fontSize: "14px",
                    },
                });
                setShowLoadingModal(false);
                setOtp("");
                return;
            }
        }, 3000);
    };

    const handleFinish = async () => {
        // Close success modal and reset form

        const transferDetails: ITransaction = {
            date: new Date().toLocaleDateString(),
            type: "transfer",
            transactionId: transactionId,
            amount: parseFloat(transferAmount),
            account: fromAccount,
            description: memo,
            status: "completed",
            userId: state.user?.uid ?? "",
            createdAt: new Date().toLocaleDateString(),
        };

        await createTransaction(state.user?.uid ?? "", transferDetails);
        await updateUserBalance(
            state.user?.uid ?? "",
            fromAccount,
            "transfer",
            parseFloat(transferAmount)
        );

        setShowSuccessModal(false);
        setTransferAmount("");
        setFromAccount("");
        setRecipientBank("");
        setRecipientName("");
        setAccountNumber("");
        setRoutingNumber("");
        setBankAddress("");
        setTransferType("");
        setMemo("");
        setConfirmationChecked(false);
        setOtp("");
    };

    return (
        <div className="grid gap-6 max-w-6xl mx-auto p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Transfers & Payments
                </h1>
                <p className="text-gray-500">Move money between your accounts or deposit funds</p>
            </div>

            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-500 p-2 rounded-full">
                            <Send className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-medium">
                                Transfer to External Bank
                            </CardTitle>
                            <CardDescription>
                                Send money to your external bank accounts
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <form onSubmit={handleTransfer}>
                    <CardContent className="space-y-6 pt-6">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-amber-800">
                                    Important Information
                                </p>
                                <p className="text-sm text-amber-700">
                                    External transfers may take 1-3 business days to complete. Wire
                                    transfers typically process the same day if submitted before
                                    2:00 PM ET.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="from-account" className="text-sm font-medium">
                                    From Account
                                </Label>
                                <Select value={fromAccount} onValueChange={setFromAccount} required>
                                    <SelectTrigger
                                        id="from-account"
                                        className="border-gray-200 w-full py-5.5"
                                    >
                                        <SelectValue placeholder="Select source account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {accounts.map((account) => (
                                            <SelectItem key={account.id} value={account.name}>
                                                {account.name} ($
                                                {account.balance.toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                                )
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="amount" className="text-sm font-medium">
                                    Amount
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        $
                                    </span>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="0.00"
                                        className="pl-7 border-gray-200 h-11"
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-base font-medium mb-4">Recipient Information</h3>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="recipient-bank" className="text-sm font-medium">
                                        Bank Name
                                    </Label>
                                    <Input
                                        id="recipient-bank"
                                        placeholder="Enter bank name"
                                        className="border-gray-200 h-11"
                                        value={recipientBank}
                                        onChange={(e) => setRecipientBank(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="recipient-name" className="text-sm font-medium">
                                        Recipient Name
                                    </Label>
                                    <Input
                                        id="recipient-name"
                                        placeholder="Enter recipient name"
                                        className="border-gray-200 h-11"
                                        value={recipientName}
                                        onChange={(e) => setRecipientName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="account-number" className="text-sm font-medium">
                                        Account Number
                                    </Label>
                                    <Input
                                        id="account-number"
                                        placeholder="Enter account number"
                                        className="border-gray-200 h-11"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="routing-number" className="text-sm font-medium">
                                        Routing Number
                                    </Label>
                                    <Input
                                        id="routing-number"
                                        placeholder="Enter routing number"
                                        className="border-gray-200 h-11"
                                        value={routingNumber}
                                        onChange={(e) => setRoutingNumber(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bank-address" className="text-sm font-medium">
                                        Bank Address
                                    </Label>
                                    <Input
                                        id="bank-address"
                                        placeholder="Enter bank address"
                                        className="border-gray-200 h-11"
                                        value={bankAddress}
                                        onChange={(e) => setBankAddress(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="transfer-type" className="text-sm font-medium">
                                        Transfer Type
                                    </Label>
                                    <Select
                                        value={transferType}
                                        onValueChange={setTransferType}
                                        required
                                    >
                                        <SelectTrigger
                                            id="transfer-type"
                                            className="border-gray-200 py-5.5 w-full"
                                        >
                                            <SelectValue placeholder="Select transfer type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="wire">
                                                Wire Transfer (Same day)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-base font-medium mb-4">Transfer Details</h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="memo" className="text-sm font-medium">
                                        Memo
                                    </Label>
                                    <Input
                                        id="memo"
                                        placeholder="Add a note"
                                        className="border-gray-200 h-11"
                                        required
                                        value={memo}
                                        onChange={(e) => setMemo(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="confirmation"
                                    className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                    checked={confirmationChecked}
                                    onCheckedChange={(checked: boolean) =>
                                        setConfirmationChecked(checked as boolean)
                                    }
                                    required
                                />
                                <div className="space-y-1">
                                    <Label htmlFor="confirmation" className="font-medium">
                                        I confirm the account details are correct and understand
                                        this transfer is not reversible once processed.
                                    </Label>
                                    <p className="text-sm text-gray-500">
                                        I understand funds leaving this platform are no longer
                                        managed by NexusBank and may be subject to external bank
                                        policies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-100 px-6 py-4">
                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white h-11 font-medium"
                            disabled={!isFormValid}
                        >
                            <Send className="mr-2 h-4 w-4" />
                            Submit Transfer
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* Quick Links */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">
                            Set Up Direct Deposit
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">
                            Get your paycheck up to 2 days early with direct deposit.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        >
                            Get Started
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">
                            Link External Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">
                            Connect your external bank accounts for easy transfers.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        >
                            Link Account
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">Recurring Transfers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">
                            Set up automatic transfers on a schedule that works for you.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        >
                            Set Up
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Confirmation Modal */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
                        <h3 className="text-xl font-bold mb-4">Confirm Transfer</h3>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-500">Amount:</span>
                                    <span className="font-medium">
                                        ${Number.parseFloat(transferAmount).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-500">To:</span>
                                    <span className="font-medium">{recipientName}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-500">Account Number:</span>
                                    <span className="font-medium">{accountNumber}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-500">Bank:</span>
                                    <span className="font-medium">{recipientBank}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Transfer Type:</span>
                                    <span className="font-medium">Wire Transfer</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                Please review the details above. Once confirmed, this transfer
                                cannot be canceled.
                            </p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                className="flex-1 cursor-pointer"
                                onClick={() => setShowConfirmationModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                                onClick={handleConfirmTransfer}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* OTP Verification Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
                        <h3 className="text-xl font-bold mb-2">Verification Required</h3>
                        <p className="text-gray-600 mb-4">
                            We&apos;ve sent a one-time verification code to your email. Please enter
                            it below to complete your transfer.
                        </p>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp-code" className="text-sm font-medium">
                                    Verification Code
                                </Label>
                                <Input
                                    id="otp-code"
                                    placeholder="Enter 6-digit code"
                                    className="border-gray-200 h-11 text-center text-lg tracking-widest"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                />
                            </div>
                            <p className="text-sm text-gray-500">
                                Didn&apos;t receive a code?{" "}
                                <button
                                    onClick={() => {
                                        if (state.user?.email) {
                                            sendOTP(state.user?.email, generateOTP());
                                        }
                                    }}
                                    className="text-green-600 hover:underline cursor-pointer"
                                >
                                    Resend code
                                </button>
                            </p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                className="flex-1 cursor-pointer"
                                onClick={() => setShowOtpModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                                onClick={handleVerifyOtp}
                                disabled={otp.length !== 6}
                            >
                                Verify
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Modal */}
            {showLoadingModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                        <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
                        <h3 className="text-xl font-bold mb-2">Processing Transfer</h3>
                        <p className="text-gray-600 text-center">
                            Please wait while we process your transfer. This may take a few moments.
                        </p>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
                        <div className="flex flex-col items-center mb-4">
                            <div className="bg-green-100 p-3 rounded-full mb-4">
                                <Check className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold">Transfer Successful!</h3>
                            <p className="text-gray-600 text-center mt-2">
                                Your transfer of ${Number.parseFloat(transferAmount).toFixed(2)} to{" "}
                                {recipientName} has been initiated successfully.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Transaction ID:</span>
                                <span className="font-medium">{transactionId}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Date:</span>
                                <span className="font-medium">
                                    {new Date().toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Estimated Arrival:</span>
                                <span className="font-medium">
                                    {transferType === "ach"
                                        ? new Date(
                                              Date.now() + 2 * 24 * 60 * 60 * 1000
                                          ).toLocaleDateString()
                                        : "Today"}
                                </span>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                            onClick={handleFinish}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
