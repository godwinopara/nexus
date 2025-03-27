import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid gap-6 max-w-6xl mx-auto">
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Filters */}
            <Skeleton className="h-40 w-full" />

            {/* Transactions Table */}
            <Skeleton className="h-96 w-full" />
        </div>
    );
}
