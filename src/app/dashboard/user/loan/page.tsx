"use client";

import { useState } from "react";
import { ArrowRight, Calculator, Info, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function LoanPage() {
    const [loanAmount, setLoanAmount] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [loanType, setLoanType] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const calculateLoan = () => {
        const amount = parseFloat(loanAmount);
        const term = parseInt(loanTerm);
        const annualRate = 0.12; // 12% annual interest rate
        const monthlyRate = annualRate / 12;

        if (amount && term) {
            const payment =
                (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
                (Math.pow(1 + monthlyRate, term) - 1);
            setMonthlyPayment(payment);
        }
    };

    const handleSubmitApplication = () => {
        setShowSuccessModal(true);
    };

    return (
        <div className="flex flex-1">
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="grid gap-6 max-w-6xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Apply for a Loan
                        </h1>
                        <p className="text-gray-500">
                            Get the financial support you need with our competitive loan options
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Loan Application Form */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Loan Application</CardTitle>
                                <CardDescription>
                                    Fill in your details to apply for a loan
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="loanType">Loan Type</Label>
                                    <Select value={loanType} onValueChange={setLoanType}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select loan type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="personal">Personal Loan</SelectItem>
                                            <SelectItem value="home">Home Loan</SelectItem>
                                            <SelectItem value="auto">Auto Loan</SelectItem>
                                            <SelectItem value="business">Business Loan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="loanAmount">Loan Amount</Label>
                                    <Input
                                        id="loanAmount"
                                        type="number"
                                        placeholder="Enter loan amount"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select loan term" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="12">12 months</SelectItem>
                                            <SelectItem value="24">24 months</SelectItem>
                                            <SelectItem value="36">36 months</SelectItem>
                                            <SelectItem value="48">48 months</SelectItem>
                                            <SelectItem value="60">60 months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                                    onClick={calculateLoan}
                                >
                                    Calculate Loan
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Loan Calculator Results */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Loan Calculator</CardTitle>
                                <CardDescription>
                                    See your estimated monthly payments
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-500">Monthly Payment</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                $
                                                {monthlyPayment.toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </p>
                                        </div>
                                        <Calculator className="h-8 w-8 text-green-500" />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Info className="h-4 w-4" />
                                            <p>Interest Rate: 12% APR</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Info className="h-4 w-4" />
                                            <p>Processing Time: 1-2 Business Days</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-medium">Loan Requirements</h3>
                                    <ul className="space-y-2 text-sm text-gray-500">
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="h-4 w-4 text-green-500" />
                                            Minimum credit score of 650
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="h-4 w-4 text-green-500" />
                                            Stable employment history
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="h-4 w-4 text-green-500" />
                                            Valid government ID
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="h-4 w-4 text-green-500" />
                                            Proof of income
                                        </li>
                                    </ul>
                                </div>

                                <Button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                                    disabled={!loanAmount || !loanTerm || !loanType}
                                    onClick={handleSubmitApplication}
                                >
                                    Submit Application
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                            <DialogTitle>Application Submitted</DialogTitle>
                        </div>
                        <DialogDescription>
                            Your loan application has been successfully submitted. We will review
                            your application and contact you within 1-2 business days.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Application Details:</p>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>Loan Type: {loanType}</p>
                                <p>Amount: ${loanAmount}</p>
                                <p>Term: {loanTerm} months</p>
                                <p>
                                    Monthly Payment: $
                                    {monthlyPayment.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => {
                                setShowSuccessModal(false);
                                setLoanAmount("");
                                setLoanTerm("");
                                setLoanType("");
                                setMonthlyPayment(0);
                            }}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
