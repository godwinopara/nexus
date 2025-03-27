import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid gap-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Total Balance Card */}
            <Skeleton className="h-40 w-full" />

            {/* Accounts List */}
            <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>

            {/* Account Details */}
            <Skeleton className="h-64 w-full" />
        </div>
    );
}
