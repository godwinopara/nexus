"use client";

import { useState } from "react";
import { ArrowUpDown, Download, Filter, Search, Eye, Check, XCircle, Clock } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Sample KYC data
const kycData = [
    {
        id: "KYC-001",
        userId: "USR-001",
        userName: "John Doe",
        email: "john.doe@example.com",
        status: "verified",
        submissionDate: "2023-04-10 11:05 AM",
        verificationDate: "2023-04-12 09:35 AM",
        documentType: "passport",
        documentId: "P12345678",
        riskScore: "low",
    },
    {
        id: "KYC-002",
        userId: "USR-002",
        userName: "Jane Smith",
        email: "jane.smith@example.com",
        status: "verified",
        submissionDate: "2023-04-09 15:30 PM",
        verificationDate: "2023-04-11 14:22 PM",
        documentType: "drivers_license",
        documentId: "DL987654321",
        riskScore: "low",
    },
    {
        id: "KYC-003",
        userId: "USR-003",
        userName: "Robert Johnson",
        email: "robert.j@example.com",
        status: "pending",
        submissionDate: "2023-04-10 11:05 AM",
        verificationDate: null,
        documentType: "national_id",
        documentId: "ID123456789",
        riskScore: "medium",
    },
    {
        id: "KYC-004",
        userId: "USR-004",
        userName: "Emily Davis",
        email: "emily.d@example.com",
        status: "verified",
        submissionDate: "2023-04-08 09:15 AM",
        verificationDate: "2023-04-09 15:30 PM",
        documentType: "passport",
        documentId: "P87654321",
        riskScore: "low",
    },
    {
        id: "KYC-005",
        userId: "USR-005",
        userName: "Michael Wilson",
        email: "michael.w@example.com",
        status: "rejected",
        submissionDate: "2023-04-07 13:45 PM",
        verificationDate: "2023-04-08 09:15 AM",
        documentType: "drivers_license",
        documentId: "DL123456789",
        riskScore: "high",
        rejectionReason: "Document appears to be altered",
    },
    {
        id: "KYC-006",
        userId: "USR-006",
        userName: "Sarah Brown",
        email: "sarah.b@example.com",
        status: "pending",
        submissionDate: "2023-04-12 10:45 AM",
        verificationDate: null,
        documentType: "passport",
        documentId: "P54321678",
        riskScore: "medium",
    },
];

export default function CompliancePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [riskFilter, setRiskFilter] = useState("all");
    const [selectedKyc, setSelectedKyc] = useState<string | null>(null);
    const [showKycDetails, setShowKycDetails] = useState(false);

    // Filter KYC data based on search and filters
    const filteredKyc = kycData.filter((kyc) => {
        // Search filter
        const matchesSearch =
            searchTerm === "" ||
            kyc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kyc.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kyc.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kyc.email.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus = statusFilter === "all" || kyc.status === statusFilter;

        // Risk filter
        const matchesRisk = riskFilter === "all" || kyc.riskScore === riskFilter;

        return matchesSearch && matchesStatus && matchesRisk;
    });

    const selectedKycData = kycData.find((kyc) => kyc.id === selectedKyc);

    return (
        <div className="flex flex-1">
            {/* Main content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="grid gap-6 max-w-6xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                                Compliance & Risk Management
                            </h1>
                            <p className="text-gray-500">
                                Ensure regulatory adherence and mitigate risks
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export Report
                        </Button>
                    </div>

                    {/* Compliance Overview */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Pending KYC
                                </CardTitle>
                                <Clock className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2</div>
                                <p className="text-xs text-amber-500">Requires review</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Verified Users
                                </CardTitle>
                                <Check className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">3</div>
                                <p className="text-xs text-green-500">+1 today</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Rejected KYC
                                </CardTitle>
                                <XCircle className="h-4 w-4 text-gray-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1</div>
                                <p className="text-xs text-gray-500">Requires follow-up</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* KYC Verification */}
                    <div className="mt-6">
                        {/* Filters */}
                        <Card className="border-0 shadow-sm mb-6">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-medium">Filters</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <label htmlFor="search" className="text-sm font-medium">
                                            Search
                                        </label>
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="search"
                                                type="search"
                                                placeholder="Search by ID, user, or email..."
                                                className="pl-8 border-gray-200"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="status" className="text-sm font-medium">
                                            Status
                                        </label>
                                        <Select
                                            value={statusFilter}
                                            onValueChange={setStatusFilter}
                                        >
                                            <SelectTrigger
                                                id="status"
                                                className="border-gray-200 w-full"
                                            >
                                                <SelectValue placeholder="All Statuses" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Statuses</SelectItem>
                                                <SelectItem value="verified">Verified</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="risk" className="text-sm font-medium">
                                            Risk Level
                                        </label>
                                        <Select value={riskFilter} onValueChange={setRiskFilter}>
                                            <SelectTrigger
                                                id="risk"
                                                className="border-gray-200 w-full"
                                            >
                                                <SelectValue placeholder="All Risk Levels" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Risk Levels</SelectItem>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* KYC Table */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-3">
                                <div>
                                    <CardTitle className="text-lg font-medium">
                                        KYC Verifications
                                    </CardTitle>
                                    <CardDescription>
                                        Showing {filteredKyc.length} verifications
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
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="w-[100px] text-gray-500">
                                                ID
                                            </TableHead>
                                            <TableHead className="text-gray-500">User</TableHead>
                                            <TableHead className="text-gray-500">
                                                Document Type
                                            </TableHead>
                                            <TableHead className="text-gray-500">Status</TableHead>
                                            <TableHead className="text-gray-500">
                                                Risk Score
                                            </TableHead>
                                            <TableHead className="text-gray-500">
                                                <div className="flex items-center">
                                                    Submission Date
                                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-right text-gray-500">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredKyc.map((kyc) => (
                                            <TableRow
                                                key={kyc.id}
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setSelectedKyc(kyc.id);
                                                    setShowKycDetails(true);
                                                }}
                                            >
                                                <TableCell className="font-medium">
                                                    {kyc.id}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage
                                                                src="/placeholder.svg?height=32&width=32"
                                                                alt={kyc.userName}
                                                            />
                                                            <AvatarFallback>
                                                                {kyc.userName
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">
                                                                {kyc.userName}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {kyc.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {kyc.documentType === "passport"
                                                        ? "Passport"
                                                        : kyc.documentType === "drivers_license"
                                                        ? "Driver's License"
                                                        : kyc.documentType === "national_id"
                                                        ? "National ID"
                                                        : kyc.documentType}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={`
                            ${kyc.status === "verified" ? "bg-green-100 text-green-800" : ""}
                            ${kyc.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${kyc.status === "rejected" ? "bg-red-100 text-red-800" : ""}
                          `}
                                                    >
                                                        {kyc.status.charAt(0).toUpperCase() +
                                                            kyc.status.slice(1)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={`
                            ${kyc.riskScore === "low" ? "bg-green-100 text-green-800" : ""}
                            ${kyc.riskScore === "medium" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${kyc.riskScore === "high" ? "bg-red-100 text-red-800" : ""}
                          `}
                                                    >
                                                        {kyc.riskScore.charAt(0).toUpperCase() +
                                                            kyc.riskScore.slice(1)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{kyc.submissionDate}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedKyc(kyc.id);
                                                            setShowKycDetails(true);
                                                        }}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span className="sr-only">View</span>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {filteredKyc.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={7} className="h-24 text-center">
                                                    No KYC verifications found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t border-gray-100 p-4">
                                <div className="text-sm text-gray-500">
                                    Showing {filteredKyc.length} of {kycData.length} verifications
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                        className="border-gray-200"
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>

            {/* KYC Details Dialog */}
            {selectedKycData && (
                <Dialog open={showKycDetails} onOpenChange={setShowKycDetails}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>KYC Verification Details</DialogTitle>
                            <DialogDescription>
                                Detailed information about {selectedKycData.userName}&apos;s
                                verification
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage
                                        src="/placeholder.svg?height=64&width=64"
                                        alt={selectedKycData.userName}
                                    />
                                    <AvatarFallback className="text-lg">
                                        {selectedKycData.userName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {selectedKycData.userName}
                                    </h3>
                                    <p className="text-gray-500">{selectedKycData.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4">
                                <div>
                                    <p className="text-sm text-gray-500">KYC ID</p>
                                    <p className="font-medium">{selectedKycData.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <Badge
                                        className={`
                    ${selectedKycData.status === "verified" ? "bg-green-100 text-green-800" : ""}
                    ${selectedKycData.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${selectedKycData.status === "rejected" ? "bg-red-100 text-red-800" : ""}
                  `}
                                    >
                                        {selectedKycData.status.charAt(0).toUpperCase() +
                                            selectedKycData.status.slice(1)}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Document Type</p>
                                    <p className="font-medium">
                                        {selectedKycData.documentType === "passport"
                                            ? "Passport"
                                            : selectedKycData.documentType === "drivers_license"
                                            ? "Driver's License"
                                            : selectedKycData.documentType === "national_id"
                                            ? "National ID"
                                            : selectedKycData.documentType}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Document ID</p>
                                    <p className="font-medium">{selectedKycData.documentId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Submission Date</p>
                                    <p className="font-medium">{selectedKycData.submissionDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Verification Date</p>
                                    <p className="font-medium">
                                        {selectedKycData.verificationDate || "Pending"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Risk Score</p>
                                    <Badge
                                        className={`
                    ${selectedKycData.riskScore === "low" ? "bg-green-100 text-green-800" : ""}
                    ${selectedKycData.riskScore === "medium" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${selectedKycData.riskScore === "high" ? "bg-red-100 text-red-800" : ""}
                  `}
                                    >
                                        {selectedKycData.riskScore.charAt(0).toUpperCase() +
                                            selectedKycData.riskScore.slice(1)}
                                    </Badge>
                                </div>
                                {selectedKycData.rejectionReason && (
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Rejection Reason</p>
                                        <p className="font-medium text-red-600">
                                            {selectedKycData.rejectionReason}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium">Document Images</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                                        <p className="text-sm text-gray-500">Front of Document</p>
                                        <div className="h-40 flex items-center justify-center">
                                            <p className="text-gray-400">Document image preview</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                                        <p className="text-sm text-gray-500">Back of Document</p>
                                        <div className="h-40 flex items-center justify-center">
                                            <p className="text-gray-400">Document image preview</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="flex justify-between">
                            <div className="flex gap-2">
                                {selectedKycData.status === "pending" && (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                        >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject
                                        </Button>
                                        <Button className="bg-green-500 hover:bg-green-600 text-white">
                                            <Check className="mr-2 h-4 w-4" />
                                            Approve
                                        </Button>
                                    </>
                                )}
                            </div>
                            <Button variant="outline" onClick={() => setShowKycDetails(false)}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
