"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Camera, Lock, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { AppState } from "../types/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [user, setUser] = useState<AppState["user"] | null>(null);
  const { state, updateUserData } = useApp();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (state.user) {
      setUser(state.user);
      const [first = "", ...rest] = state.user.fullName.split(" ");
      setFirstName(first);
      setLastName(rest.join(" "));
      setPhoneNumber(state.user.phoneNumber || "");
      setAddress(state.user.address || "");
      setSortCode(state.user.sortcode || "");
      setCountry(state.user.country || "");
      setOccupation(state.user.occupation || "");
      setDateOfBirth(state.user.dateOfBirth || "");
      setGender(state.user.gender || "");
      setProfileImage(state.user.profileImage || "");
      // Initialize other fields if available in user data
    }
  }, [state.user]);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .filter(Boolean)
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Profile picture must be 2MB or smaller");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfileImage(reader.result);
      }
    };

    reader.onerror = () => {
      toast.error("Unable to read the selected image");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleSaveChanges = async () => {
    if (user) {
      const updatedData = {
        fullName: `${firstName} ${lastName}`.trim(),
        phoneNumber,
        address,
        accountNumber: state.user?.accountNumber,
        email: state.user?.email,
        sortcode: sortCode,
        country,
        occupation,
        dateOfBirth,
        gender,
        profileImage,
      };
      toast.promise(
        updateUserData(user.uid, updatedData),
        {
          loading: "Updating your details...",
          success: "Details updated successfully",
          error: "Failed to update details",
        },
        {
          style: {
            minWidth: "250px",
            fontSize: "14px",
          },
          success: {
            duration: 4000,
          },
          position: "top-center",
        }
      );
    }
  };

  const handleUpdatePassword = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const currentPassword = formData.get("current-password") as string;
    const newPassword = formData.get("new-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      console.log(currentPassword);
      return;
    }

    if (user) {
      toast.promise(
        updateUserData(user.uid, { password: newPassword }),
        {
          loading: "Updating your password...",
          success: "Password updated successfully",
          error: "Failed to update password",
        },
        {
          style: {
            minWidth: "250px",
            fontSize: "14px",
          },
          success: {
            duration: 4000,
          },
          position: "top-center",
        }
      );
    }
  };

  return (
    <div className="grid gap-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white">
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
                      <AvatarImage src={profileImage} alt={state.user?.fullName || "User"} />
                      <AvatarFallback className="bg-green-100 text-lg font-semibold text-green-700">
                        {getInitials(state.user?.fullName || "") || <User className="h-8 w-8" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-2 text-white shadow-md">
                      <Camera className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">Profile Picture</p>
                    <p className="text-sm text-gray-500">
                      Upload a JPG, PNG, or WebP image up to 2MB.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Avatar
                  </Button>
                  {profileImage ? (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-gray-600 hover:bg-gray-100"
                      onClick={() => setProfileImage("")}
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Country</Label>
                  <Input defaultValue={state.user?.country} readOnly className="border-gray-200" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort-code">Sort Code</Label>
                  <Input
                    id="sort-code"
                    value={sortCode}
                    onChange={(e) => setSortCode(e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="account-no">Account No</Label>
                  <Input
                    id="account-no"
                    defaultValue={state.user?.accountNumber}
                    readOnly
                    className="border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={state.user?.email}
                    readOnly
                    className="border-gray-200"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date-of-birth">Date of Birth</Label>
                  <Input
                    id="date-of-birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={(value) => setGender(value)}>
                    <SelectTrigger className="border-gray-200 w-full">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Fields */}
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleUpdatePassword}>
                <div className="space-y-4">
                  <h3 className="text-base font-medium flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-gray-500" />
                    Password
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      name="current-password"
                      required
                      className="border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      name="new-password"
                      required
                      className="border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      name="confirm-password"
                      required
                      className="border-gray-200"
                    />
                  </div>
                  <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
