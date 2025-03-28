"use client";

import { useState } from "react";
import { CreditCard, Shield, Gift, Info, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function CardPage() {
    const [selectedCard, setSelectedCard] = useState("rewards");
    const [cardName, setCardName] = useState("");
    const [cardDesign, setCardDesign] = useState("standard");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleSubmitApplication = () => {
        setShowSuccessModal(true);
    };

    return (
        <div className="flex flex-1">
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="grid gap-6 max-w-6xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Apply for a Card
                        </h1>
                        <p className="text-gray-500">
                            Choose the perfect card that suits your needs
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Card Options */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Choose Your Card</CardTitle>
                                <CardDescription>
                                    Select the card type that best fits your lifestyle
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <RadioGroup
                                    value={selectedCard}
                                    onValueChange={setSelectedCard}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <RadioGroupItem value="rewards" id="rewards" />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="rewards"
                                                className="text-base font-medium"
                                            >
                                                Rewards Card
                                            </Label>
                                            <p className="text-sm text-gray-500">
                                                Earn points on every purchase
                                            </p>
                                        </div>
                                        <Gift className="h-5 w-5 text-green-500" />
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <RadioGroupItem value="cashback" id="cashback" />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="cashback"
                                                className="text-base font-medium"
                                            >
                                                Cashback Card
                                            </Label>
                                            <p className="text-sm text-gray-500">
                                                Get cash back on eligible purchases
                                            </p>
                                        </div>
                                        <CreditCard className="h-5 w-5 text-blue-500" />
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <RadioGroupItem value="secured" id="secured" />
                                        <div className="flex-1">
                                            <Label
                                                htmlFor="secured"
                                                className="text-base font-medium"
                                            >
                                                Secured Card
                                            </Label>
                                            <p className="text-sm text-gray-500">
                                                Build credit with a security deposit
                                            </p>
                                        </div>
                                        <Shield className="h-5 w-5 text-purple-500" />
                                    </div>
                                </RadioGroup>

                                <div className="space-y-4">
                                    <h3 className="font-medium">Card Features</h3>
                                    <ul className="space-y-2 text-sm text-gray-500">
                                        <li className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-green-500" />
                                            Zero annual fee
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-green-500" />
                                            Contactless payments
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-green-500" />
                                            Mobile app access
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-green-500" />
                                            Fraud protection
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card Application Form */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle>Card Application</CardTitle>
                                <CardDescription>
                                    Fill in your details to apply for your new card
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cardName">Name on Card</Label>
                                        <Input
                                            id="cardName"
                                            placeholder="Enter name as it should appear on card"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Card Design</Label>
                                        <RadioGroup
                                            value={cardDesign}
                                            onValueChange={setCardDesign}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <RadioGroupItem value="standard" id="standard" />
                                                <Label htmlFor="standard">Standard</Label>
                                            </div>
                                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <RadioGroupItem value="premium" id="premium" />
                                                <Label htmlFor="premium">Premium</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-medium">Card Benefits</h3>
                                    <div className="grid gap-4">
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-medium text-sm">Rewards Rate</h4>
                                            <p className="text-2xl font-bold text-green-600">
                                                1.5%
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Cash back on all purchases
                                            </p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-medium text-sm">Welcome Bonus</h4>
                                            <p className="text-2xl font-bold text-green-600">
                                                $200
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                After spending $500 in 3 months
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                                    disabled={!cardName}
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
                            Your card application has been successfully submitted. We will process
                            your application and your new card will arrive within 7-10 business
                            days.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Application Details:</p>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>Card Type: {selectedCard}</p>
                                <p>Name on Card: {cardName}</p>
                                <p>Card Design: {cardDesign}</p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => {
                                setShowSuccessModal(false);
                                setSelectedCard("");
                                setCardName("");
                                setCardDesign("");
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
